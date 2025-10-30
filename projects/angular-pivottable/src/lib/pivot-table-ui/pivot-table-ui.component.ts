// projects/angular-pivottable/src/lib/pivot-table-ui/pivot-table-ui.component.ts
import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  ViewChild,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// @ts-ignore
import PivotTableUI from 'react-pivottable/PivotTableUI';

import { PivotTableUIConfig } from '../types';

@Component({
  selector: 'ng-pivot-table-ui',
  template: `<div #container class="ng-pivottable-ui-root"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: [`
    :host {
      display: block;
    }
    .ng-pivottable-ui-root {
      width: 100%;
    }
  `]
})
export class NgPivotTableUiComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: any[] = [];
  @Input() rows: string[] = [];
  @Input() cols: string[] = [];
  @Input() vals: string[] = [];
  @Input() aggregatorName: string = 'Count';
  @Input() rendererName?: string;
  @Input() valueFilter?: { [key: string]: any };
  @Input() sorters?: { [key: string]: (a: any, b: any) => number };
  @Input() derivedAttributes?: { [key: string]: (record: any) => any };
  @Input() hiddenAttributes?: string[];
  @Input() hiddenFromAggregators?: string[];
  @Input() hiddenFromDragDrop?: string[];
  @Input() menuLimit?: number;
  @Input() unusedOrientationCutoff?: number;

  @Output() configChange = new EventEmitter<PivotTableUIConfig>();
  @Output() stateChange = new EventEmitter<PivotTableUIConfig>();

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  private isInitialized = false;
  private isBrowser: boolean;
  private internalState: PivotTableUIConfig = {};
  private shouldUpdateFromInputs = true;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.containerRef?.nativeElement) {
      this.isInitialized = true;
      this.initializeInternalState();
      this.renderReact();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialized && this.isBrowser && this.shouldUpdateFromInputs) {
      // Only update internal state from inputs if we're not in the middle of a React onChange
      const hasRelevantChanges = Object.keys(changes).some(key =>
        key !== 'data' || changes[key].currentValue !== changes[key].previousValue
      );

      if (hasRelevantChanges) {
        this.initializeInternalState();
        this.renderReact();
      }
    }
  }

  private initializeInternalState(): void {
    // Initialize internal state from inputs
    this.internalState = {
      data: this.data || [],
      rows: this.rows || [],
      cols: this.cols || [],
      vals: this.vals || [],
      aggregatorName: this.aggregatorName || 'Count',
      rendererName: this.rendererName,
      valueFilter: this.valueFilter,
      sorters: this.sorters,
      derivedAttributes: this.derivedAttributes,
      hiddenAttributes: this.hiddenAttributes,
      hiddenFromAggregators: this.hiddenFromAggregators,
      hiddenFromDragDrop: this.hiddenFromDragDrop,
      menuLimit: this.menuLimit,
      unusedOrientationCutoff: this.unusedOrientationCutoff
    };

    // Remove undefined properties
    Object.keys(this.internalState).forEach(key => {
      if (this.internalState[key] === undefined) {
        delete this.internalState[key];
      }
    });
  }

  private renderReact(): void {
    if (!this.containerRef?.nativeElement) {
      return;
    }

    // Run React rendering outside Angular's zone
    this.ngZone.runOutsideAngular(() => {
      try {
        const props: PivotTableUIConfig = {
          ...this.internalState,
          onChange: (newState: PivotTableUIConfig) => {
            // Prevent input changes from overriding React's state during onChange
            this.shouldUpdateFromInputs = false;

            // Update internal state
            this.internalState = { ...newState };

            // Run emissions inside Angular zone to trigger change detection if needed
            this.ngZone.run(() => {
              this.configChange.emit({ ...newState });
              this.stateChange.emit({ ...newState });

              // Mark for check in case parent component needs to update
              this.cdr.markForCheck();
            });

            // Re-render with new state
            this.renderReact();

            // Re-enable input updates after a microtask
            Promise.resolve().then(() => {
              this.shouldUpdateFromInputs = true;
            });
          }
        };

        ReactDOM.render(
          React.createElement(PivotTableUI, props),
          this.containerRef.nativeElement
        );
      } catch (error) {
        console.error('Error rendering PivotTableUI:', error);
      }
    });
  }

  /**
   * Programmatically update the pivot table state
   * @param state - Partial state to merge with current state
   */
  updateState(state: Partial<PivotTableUIConfig>): void {
    this.internalState = { ...this.internalState, ...state };
    if (this.isInitialized) {
      this.renderReact();
    }
  }

  /**
   * Get the current pivot table state
   */
  getState(): PivotTableUIConfig {
    return { ...this.internalState };
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.containerRef?.nativeElement) {
      try {
        ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
      } catch (error) {
        console.error('Error unmounting PivotTableUI:', error);
      }
    }
  }
}
