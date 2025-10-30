/**
 * Common types for Angular PivotTable components
 */

export interface PivotTableConfig {
  data?: any[];
  rows?: string[];
  cols?: string[];
  vals?: string[];
  aggregatorName?: string;
  rendererName?: string;
  valueFilter?: { [key: string]: any };
  sorters?: { [key: string]: (a: any, b: any) => number };
  derivedAttributes?: { [key: string]: (record: any) => any };
  hiddenAttributes?: string[];
  hiddenFromAggregators?: string[];
  hiddenFromDragDrop?: string[];
  menuLimit?: number;
  unusedOrientationCutoff?: number;
  [key: string]: any;
}

export interface PivotTableUIConfig extends PivotTableConfig {
  // Additional properties specific to PivotTableUI can be added here
}

export type AggregatorName =
  | 'Count'
  | 'Count Unique Values'
  | 'List Unique Values'
  | 'Sum'
  | 'Integer Sum'
  | 'Average'
  | 'Median'
  | 'Sample Variance'
  | 'Sample Standard Deviation'
  | 'Minimum'
  | 'Maximum'
  | 'First'
  | 'Last'
  | 'Sum over Sum'
  | 'Sum as Fraction of Total'
  | 'Sum as Fraction of Rows'
  | 'Sum as Fraction of Columns'
  | 'Count as Fraction of Total'
  | 'Count as Fraction of Rows'
  | 'Count as Fraction of Columns';

export type RendererName =
  | 'Table'
  | 'Table Heatmap'
  | 'Table Col Heatmap'
  | 'Table Row Heatmap'
  | 'Grouped Column Chart'
  | 'Stacked Column Chart'
  | 'Grouped Bar Chart'
  | 'Stacked Bar Chart'
  | 'Line Chart'
  | 'Dot Chart'
  | 'Area Chart'
  | 'Scatter Chart'
  | 'Multiple Pie Chart';
