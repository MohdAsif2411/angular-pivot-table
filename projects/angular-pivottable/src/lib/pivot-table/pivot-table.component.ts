// projects/angular-pivottable/src/lib/pivot-table/pivot-table.component.ts
import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  NgZone,
  ViewChild,
  effect,
  input,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// @ts-ignore
import PivotTable from 'react-pivottable/PivotTable';

import { PivotTableConfig } from '../types';

@Component({
  selector: 'ng-pivot-table',
  template: `<div #container class="ng-pivottable-root"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: [`
    :host {
      display: block;
    }
    .ng-pivottable-root {
      width: 100%;
    }
  `]
})
export class NgPivotTableComponent implements AfterViewInit, OnDestroy, OnChanges {
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

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private isInitialized = false;
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.containerRef?.nativeElement) {
      this.isInitialized = true;
      this.renderReact();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only re-render if component is initialized and we're in browser
    if (this.isInitialized && this.isBrowser) {
      this.renderReact();
    }
  }

  private renderReact(): void {
    if (!this.containerRef?.nativeElement) {
      return;
    }

    // Run React rendering outside Angular's zone to prevent unnecessary change detection
    this.ngZone.runOutsideAngular(() => {
      try {
        const props: PivotTableConfig = {
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
        Object.keys(props).forEach(key => {
          if (props[key] === undefined) {
            delete props[key];
          }
        });

        ReactDOM.render(
          React.createElement(PivotTable, props),
          this.containerRef.nativeElement
        );
      } catch (error) {
        console.error('Error rendering PivotTable:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.containerRef?.nativeElement) {
      try {
        ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
      } catch (error) {
        console.error('Error unmounting PivotTable:', error);
      }
    }
  }
}
