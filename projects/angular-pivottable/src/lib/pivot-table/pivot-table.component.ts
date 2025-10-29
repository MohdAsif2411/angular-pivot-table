// projects/angular-pivottable/src/lib/pivot-table/pivot-table.component.ts
import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// the "PivotTable" renderer import pattern depends how you use it.
// react-pivottable exports PivotTable (basic) and several renderers via renderers module.
// We'll import default pivot table usage:
// const PivotTable = require('react-pivottable').PivotTable || require('react-pivottable').default?.PivotTable;
// @ts-ignore
import PivotTable from 'react-pivottable/PivotTable';

@Component({
  selector: 'ng-pivot-table',
  template: `<div class="ng-pivottable-root" #container></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class NgPivotTableComponent implements AfterViewInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() rows: string[] = [];
  @Input() cols: string[] = [];
  @Input() vals: string[] = [];
  @Input() aggregatorName: string = 'Count';
  @Input() rendererName: string | undefined;

  private container!: HTMLElement;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.container = this.el.nativeElement.querySelector('.ng-pivottable-root');
    this.renderReact();
  }

  private renderReact() {
    const props: any = {
      data: this.data,
      rows: this.rows,
      cols: this.cols,
      vals: this.vals,
      aggregatorName: this.aggregatorName,
      rendererName: this.rendererName
    };

    ReactDOM.render(React.createElement(PivotTable, props), this.container);
  }

  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
