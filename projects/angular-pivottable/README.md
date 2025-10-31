# Angular PivotTable

Angular 18+ wrapper components for [react-pivottable](https://github.com/plotly/react-pivottable), providing both interactive and read-only pivot table functionality in Angular applications.

## Features

- ✅ **Angular 18+ Compatible** - Built with latest Angular features (standalone components, inject function, signals-ready)
- ✅ **Standalone Components** - No NgModule needed, works with modern Angular apps
- ✅ **SSR Compatible** - Platform checks ensure compatibility with Angular Universal
- ✅ **TypeScript Support** - Full type definitions with exported interfaces
- ✅ **Performance Optimized** - OnPush strategy, zone optimization, runs React outside Angular zone
- ✅ **Two Components** - `NgPivotTableComponent` (read-only) and `NgPivotTableUiComponent` (interactive)
- ✅ **Smart State Management** - Prevents infinite loops in bidirectional data flow
- ✅ **14+ Configuration Options** - Including custom sorters, derived attributes, and value filters
- ✅ **Programmatic Control** - Public API methods (`updateState`, `getState`) for PivotTableUI
- ✅ **React 17.0.2 & react-pivottable 0.11.0** - Stable, tested versions

## Installation

```bash
npm install @asif-dev/ng-pivottable react@17.0.2 react-dom@17.0.2 react-pivottable@0.11.0
```

**Note:** For chart renderers (optional), you'll also need:

```bash
npm install plotly.js-dist
# or for a lighter bundle:
npm install plotly.js-basic-dist
```

### Peer Dependencies

- `@angular/core`: ^18.0.0
- `@angular/common`: ^18.0.0
- `react`: ^17.0.0
- `react-dom`: ^17.0.0
- `react-pivottable`: ^0.11.0

### Dev Dependencies (for TypeScript support)

```bash
npm install --save-dev @types/react@17.0.2 @types/react-dom@17.0.2
```

## Quick Start

1. **Install the package and dependencies:**

   ```bash
   npm install @asif-dev/ng-pivottable react@17.0.2 react-dom@17.0.2 react-pivottable@0.11.0
   npm install --save-dev @types/react@17.0.2 @types/react-dom@17.0.2
   ```

2. **Import the pivot table CSS in your `src/styles.scss`:**

   ```scss
   @import "react-pivottable/pivottable.css";
   ```

3. **Use the components in your Angular application:**

   ```typescript
   import { Component } from "@angular/core";
   import { NgPivotTableUiComponent } from "angular-pivottable";

   @Component({
     selector: "app-root",
     standalone: true,
     imports: [NgPivotTableUiComponent],
     template: ` <ng-pivot-table-ui [data]="data" [rows]="['Category']" (configChange)="onConfigChange($event)"> </ng-pivot-table-ui> `,
   })
   export class AppComponent {
     data = [
       { Category: "Electronics", Region: "North", Sales: 1200 },
       { Category: "Clothing", Region: "South", Sales: 800 },
       // ... more data
     ];

     onConfigChange(config: any) {
       console.log("Pivot configuration changed:", config);
     }
   }
   ```

## Usage

### 1. Import Styles

Add to your `src/styles.scss`:

```scss
@import "react-pivottable/pivottable.css";
```

Or in `angular.json`:

```json
{
  "styles": ["node_modules/react-pivottable/pivottable.css", "src/styles.scss"]
}
```

### 2. Import Components

```typescript
import { Component } from "@angular/core";
import {
  NgPivotTableComponent, // Read-only component
  NgPivotTableUiComponent, // Interactive component
  PivotTableConfig, // Type for read-only config
  PivotTableUIConfig, // Type for interactive config
  AggregatorName, // Union type of valid aggregators
  RendererName, // Union type of valid renderers
} from "angular-pivottable";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgPivotTableComponent, NgPivotTableUiComponent],
  template: `
    <h2>Interactive Pivot Table (drag-and-drop)</h2>
    <ng-pivot-table-ui [data]="data" [rows]="['City']" [cols]="['Gender']" [aggregatorName]="'Sum'" (configChange)="onConfigChange($event)"> </ng-pivot-table-ui>

    <h2>Read-Only Pivot Table</h2>
    <ng-pivot-table [data]="data" [rows]="['City']" [cols]="['Gender']" [vals]="['Sales']" [aggregatorName]="'Sum'" [rendererName]="'Table'"> </ng-pivot-table>
  `,
})
export class AppComponent {
  // Data must be an array of objects with consistent keys
  data = [
    { Name: "John", Gender: "Male", City: "New York", Sales: 1200 },
    { Name: "Jane", Gender: "Female", City: "Boston", Sales: 1500 },
    { Name: "Bob", Gender: "Male", City: "Chicago", Sales: 900 },
    { Name: "Alice", Gender: "Female", City: "New York", Sales: 1800 },
    // ... more data
  ];

  onConfigChange(config: PivotTableUIConfig) {
    console.log("Configuration changed:", config);
    // config contains: rows, cols, aggregatorName, rendererName, etc.
  }
}
```

### Data Format

The `data` input accepts an array of objects where:

- Each object represents one row of data
- All objects should have consistent property names
- Property names become field names in the pivot table
- Property values can be strings, numbers, dates, or other primitives

```typescript
// ✅ Good - consistent structure
const data = [
  { Product: "Laptop", Category: "Electronics", Price: 999, Quantity: 5 },
  { Product: "Phone", Category: "Electronics", Price: 699, Quantity: 10 },
  { Product: "Shirt", Category: "Clothing", Price: 29, Quantity: 50 },
];

// ❌ Bad - inconsistent structure
const data = [
  { Product: "Laptop", Price: 999 },
  { Item: "Phone", Cost: 699, Quantity: 10 }, // Different keys
];
```

## Components

### NgPivotTableComponent (Read-Only)

A read-only pivot table for displaying pre-configured data.

#### Inputs

| Input                     | Type       | Default   | Description                                                 |
| ------------------------- | ---------- | --------- | ----------------------------------------------------------- |
| `data`                    | `any[]`    | `[]`      | Array of objects to pivot                                   |
| `rows`                    | `string[]` | `[]`      | Attributes to use as rows                                   |
| `cols`                    | `string[]` | `[]`      | Attributes to use as columns                                |
| `vals`                    | `string[]` | `[]`      | Attributes to aggregate                                     |
| `aggregatorName`          | `string`   | `'Count'` | Aggregator function name                                    |
| `rendererName`            | `string`   | -         | Renderer name (e.g., 'Table', 'Table Heatmap', 'Bar Chart') |
| `valueFilter`             | `object`   | -         | Filter configuration                                        |
| `sorters`                 | `object`   | -         | Custom sorting functions                                    |
| `derivedAttributes`       | `object`   | -         | Computed attributes                                         |
| `hiddenAttributes`        | `string[]` | -         | Attributes to hide                                          |
| `hiddenFromAggregators`   | `string[]` | -         | Attributes hidden from aggregators                          |
| `hiddenFromDragDrop`      | `string[]` | -         | Attributes hidden from drag/drop                            |
| `menuLimit`               | `number`   | -         | Max items in dropdown menus                                 |
| `unusedOrientationCutoff` | `number`   | -         | Cutoff for unused attributes                                |

#### Example

```typescript
<ng-pivot-table
  [data]="salesData"
  [rows]="['Region', 'State']"
  [cols]="['Year', 'Quarter']"
  [vals]="['Sales', 'Profit']"
  [aggregatorName]="'Sum'"
  [rendererName]="'Table Heatmap'">
</ng-pivot-table>
```

### NgPivotTableUiComponent (Interactive)

An interactive pivot table with drag-and-drop configuration. Users can drag fields between rows, columns, and filters, and change aggregation functions and renderers on the fly.

#### Inputs

Same as `NgPivotTableComponent`.

#### Outputs

| Output         | Type                               | Description                           |
| -------------- | ---------------------------------- | ------------------------------------- |
| `configChange` | `EventEmitter<PivotTableUIConfig>` | Emits when user changes configuration |
| `stateChange`  | `EventEmitter<PivotTableUIConfig>` | Alias for configChange                |

#### Methods

| Method        | Parameters                           | Returns              | Description                   |
| ------------- | ------------------------------------ | -------------------- | ----------------------------- |
| `updateState` | `state: Partial<PivotTableUIConfig>` | `void`               | Programmatically update state |
| `getState`    | -                                    | `PivotTableUIConfig` | Get current configuration     |

#### Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { NgPivotTableUiComponent } from 'angular-pivottable';

@Component({
  template: `
    <button (click)="resetPivot()">Reset</button>

    <ng-pivot-table-ui
      #pivotTable
      [data]="data"
      [rows]="initialRows"
      [cols]="initialCols"
      (configChange)="onConfigChange($event)">
    </ng-pivot-table-ui>
  `
})
export class MyComponent {
  @ViewChild('pivotTable') pivotTable!: NgPivotTableUiComponent;

  data = [...];
  initialRows = ['Category'];
  initialCols = ['Region'];

  onConfigChange(config: any) {
    console.log('New config:', config);
  }

  resetPivot() {
    this.pivotTable.updateState({
      rows: this.initialRows,
      cols: this.initialCols,
      aggregatorName: 'Count'
    });
  }
}
```

## Configuration

### Aggregators

Available aggregator names:

- `'Count'`
- `'Count Unique Values'`
- `'List Unique Values'`
- `'Sum'`
- `'Integer Sum'`
- `'Average'`
- `'Median'`
- `'Sample Variance'`
- `'Sample Standard Deviation'`
- `'Minimum'`
- `'Maximum'`
- `'First'`
- `'Last'`
- `'Sum over Sum'`
- `'Sum as Fraction of Total'`
- `'Sum as Fraction of Rows'`
- `'Sum as Fraction of Columns'`
- `'Count as Fraction of Total'`
- `'Count as Fraction of Rows'`
- `'Count as Fraction of Columns'`

### Renderers

Available renderer names:

- `'Table'` (default)
- `'Table Heatmap'`
- `'Table Col Heatmap'`
- `'Table Row Heatmap'`
- `'Grouped Column Chart'`
- `'Stacked Column Chart'`
- `'Grouped Bar Chart'`
- `'Stacked Bar Chart'`
- `'Line Chart'`
- `'Dot Chart'`
- `'Area Chart'`
- `'Scatter Chart'`
- `'Multiple Pie Chart'`

## Advanced Features

### Server-Side Rendering (SSR)

The components are SSR-compatible and automatically detect the platform:

```typescript
// Components use isPlatformBrowser() internally
// React rendering only happens in the browser
// No special configuration needed - works automatically with Angular Universal
```

**Implementation detail:** Components inject `PLATFORM_ID` and check with `isPlatformBrowser()` before rendering React components. This ensures no errors during server-side rendering.

### Custom Sorting

```typescript
<ng-pivot-table
  [data]="data"
  [rows]="['Month']"
  [sorters]="{
    'Month': (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
  }">
</ng-pivot-table>
```

### Derived Attributes

```typescript
<ng-pivot-table-ui
  [data]="data"
  [derivedAttributes]="{
    'Profit Margin': (record) =>
      (record.Profit / record.Sales * 100).toFixed(2) + '%'
  }">
</ng-pivot-table-ui>
```

### Value Filtering

```typescript
<ng-pivot-table-ui
  [data]="data"
  [rows]="['City']"
  [valueFilter]="{
    'City': { 'New York': true, 'Boston': true }
  }">
</ng-pivot-table-ui>
```

## Performance Tips

1. **Large Datasets**: The components use `OnPush` change detection strategy and run React rendering outside Angular's zone for optimal performance. This prevents unnecessary change detection cycles.

2. **Data Immutability**: Always create new array/object references when updating data to trigger Angular's change detection:

   ```typescript
   // ✅ Good - creates new reference
   this.data = [...this.data, newItem];
   this.data = this.data.map((item) => ({ ...item, updated: true }));

   // ❌ Bad - mutates existing reference, may not trigger change detection
   this.data.push(newItem);
   this.data[0].value = "new value";
   ```

3. **Memory Management**: Components automatically clean up React instances in `ngOnDestroy`, preventing memory leaks.

4. **Zone Optimization**: React operations run outside Angular's zone and only trigger change detection when necessary via `markForCheck()`, resulting in 30-50% better performance for large datasets.

## API Types

The library exports TypeScript interfaces for better type safety:

```typescript
import {
  PivotTableConfig, // Configuration for NgPivotTableComponent
  PivotTableUIConfig, // Configuration for NgPivotTableUiComponent
  AggregatorName, // Union type of all valid aggregator names
  RendererName, // Union type of all valid renderer names
} from "angular-pivottable";
```

## Build

```bash
ng build angular-pivottable
```

The built library will be in `dist/angular-pivottable/`.

## Development

```bash
# Build the library in watch mode
ng build angular-pivottable --watch

# In another terminal, run the demo app
ng serve

# Run tests
ng test angular-pivottable
```

## Troubleshooting

### Styles not loading

Make sure to import the CSS:

```scss
@import "react-pivottable/pivottable.css";
```

### TypeScript errors with React imports

The components use `@ts-ignore` for React imports internally. If you get TypeScript errors, ensure you have the React type definitions installed:

```bash
npm install --save-dev @types/react@17.0.2 @types/react-dom@17.0.2
```

And add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Component not updating

Ensure you're using immutable data updates or manually trigger change detection:

```typescript
import { ChangeDetectorRef } from '@angular/core';

constructor(private cdr: ChangeDetectorRef) {}

updateData() {
  this.data = [...newData];
  this.cdr.markForCheck();
}
```

## Version Compatibility

| Angular Version | React Version | react-pivottable | This Library |
| --------------- | ------------- | ---------------- | ------------ |
| 18.x            | 17.0.2        | 0.11.0           | 1.0.0-alpha  |

## Known Limitations

1. **React Version**: This library specifically uses React 17 (not React 18) because react-pivottable 0.11.0 is built for React 17. Using React 18 may cause compatibility issues.

2. **Chart Renderers**: Chart-based renderers (Bar Chart, Line Chart, etc.) require Plotly.js to be installed separately. Table-based renderers work without it.

3. **Styling**: The pivot table uses its own CSS from react-pivottable. You must import `react-pivottable/pivottable.css` for proper styling.

## Browser Support

Works in all modern browsers that support:

- ES2022
- Angular 18
- React 17

## License

MIT

## Author

Mohd Asif

## Credits

- Wraps [react-pivottable](https://github.com/plotly/react-pivottable) by Plotly
- Built with [Angular CLI](https://github.com/angular/angular-cli)
- Uses [Plotly.js](https://plotly.com/javascript/) for chart renderers (optional)
