import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgPivotTableComponent,
  NgPivotTableUiComponent,
  PivotTableUIConfig,
  AggregatorName
} from 'angular-pivottable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NgPivotTableComponent, NgPivotTableUiComponent]
})
export class AppComponent {
  title = 'Angular Pivot Table Demo';

  // Sample data - more comprehensive example
  data = [
    { Name: 'John', Age: 28, Gender: 'Male', City: 'New York', Sales: 1200 },
    { Name: 'Jane', Age: 32, Gender: 'Female', City: 'Boston', Sales: 1500 },
    { Name: 'Bob', Age: 45, Gender: 'Male', City: 'Chicago', Sales: 900 },
    { Name: 'Alice', Age: 29, Gender: 'Female', City: 'New York', Sales: 1800 },
    { Name: 'Charlie', Age: 35, Gender: 'Male', City: 'Boston', Sales: 1100 },
    { Name: 'Diana', Age: 41, Gender: 'Female', City: 'Chicago', Sales: 1600 },
    { Name: 'Eve', Age: 27, Gender: 'Female', City: 'New York', Sales: 1300 },
    { Name: 'Frank', Age: 38, Gender: 'Male', City: 'Boston', Sales: 1400 },
    { Name: 'Grace', Age: 33, Gender: 'Female', City: 'Chicago', Sales: 1700 },
    { Name: 'Henry', Age: 42, Gender: 'Male', City: 'New York', Sales: 1000 }
  ];

  // Configuration for PivotTable (read-only)
  rows: string[] = ['City'];
  cols: string[] = ['Gender'];
  vals: string[] = ['Sales'];
  aggregatorName: AggregatorName = 'Sum';
  rendererName: string = 'Table';

  // For PivotTableUI (interactive)
  interactiveRows: string[] = ['City'];
  interactiveCols: string[] = [];
  currentConfig: PivotTableUIConfig | null = null;

  onConfigChange(config: PivotTableUIConfig): void {
    console.log('Pivot config changed:', config);
    this.currentConfig = config;
  }

  onStateChange(state: PivotTableUIConfig): void {
    console.log('Pivot state changed:', state);
  }

  getConfigSummary(): string {
    if (!this.currentConfig) {
      return 'No configuration yet';
    }
    return JSON.stringify({
      rows: this.currentConfig.rows,
      cols: this.currentConfig.cols,
      aggregatorName: this.currentConfig.aggregatorName,
      rendererName: this.currentConfig.rendererName
    }, null, 2);
  }
}
