// projects/angular-pivottable/src/lib/pivot-table-ui/pivot-table-ui.component.ts
import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the React components (React 17)
const PivotTableUI = require('react-pivottable/PivotTableUI').default || require('react-pivottable/PivotTableUI');

@Component({
  selector: 'ng-pivot-table-ui',
  template: `<div class="ng-pivottable-root" #container></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class NgPivotTableUiComponent implements AfterViewInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() rows: string[] = [];
  @Input() cols: string[] = [];
  @Input() vals: string[] = [];
  @Input() aggregatorName: string = 'Count';
  @Input() rendererName: string | undefined;

  @Output() configChange = new EventEmitter<any>();

  private container!: HTMLElement;
  private state: any = {};

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // container is the host element
    this.container = this.el.nativeElement.querySelector('.ng-pivottable-root');

    // initial render
    this.renderReact(this.state);
  }

  private renderReact(state: any) {
    const props = {
      ...state,
      data: this.data,
      rows: this.rows,
      cols: this.cols,
      vals: this.vals,
      aggregatorName: this.aggregatorName,
      rendererName: this.rendererName,
      onChange: (s: any) => {
        // react-pivottable's PivotTableUI expects to call onChange with updated state
        this.state = s;
        this.configChange.emit(s);
        // re-render to keep UI in sync
        this.renderReact(s);
      }
    };

    // Use React 17 render API
    ReactDOM.render(React.createElement(PivotTableUI, props), this.container);
  }

  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
