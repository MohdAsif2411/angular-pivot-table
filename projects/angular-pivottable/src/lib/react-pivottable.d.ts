/**
 * Type declarations for react-pivottable
 * These allow TypeScript to understand the module structure
 */

declare module 'react-pivottable/PivotTable' {
  import * as React from 'react';

  interface PivotTableProps {
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

  const PivotTable: React.ComponentType<PivotTableProps>;
  export default PivotTable;
  export = PivotTable;
}

declare module 'react-pivottable/PivotTableUI' {
  import * as React from 'react';

  interface PivotTableUIProps {
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
    onChange?: (state: any) => void;
    [key: string]: any;
  }

  const PivotTableUI: React.ComponentType<PivotTableUIProps>;
  export default PivotTableUI;
  export = PivotTableUI;
}

declare module 'react-pivottable' {
  export { default as PivotTable } from 'react-pivottable/PivotTable';
  export { default as PivotTableUI } from 'react-pivottable/PivotTableUI';
}
