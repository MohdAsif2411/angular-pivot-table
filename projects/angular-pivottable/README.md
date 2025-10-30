# Angular PivotTable

Angular 18+ wrapper components for [react-pivottable](https://github.com/plotly/react-pivottable), providing both interactive and read-only pivot table functionality in Angular applications.

## Features

- ✅ **Angular 18+ Compatible** - Built with latest Angular features
- ✅ **Standalone Components** - Ready for modern Angular apps
- ✅ **SSR Compatible** - Works with server-side rendering
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Change Detection Optimized** - OnPush strategy with zone optimization
- ✅ **Two Components** - Interactive UI and read-only table
- ✅ **React 17 Support** - Uses react-pivottable 0.11.0

## Installation

```bash
npm install angular-pivottable react@^17.0.0 react-dom@^17.0.0 react-pivottable plotly.js-basic-dist
```

### Peer Dependencies

- `@angular/core`: ^18.0.0
- `@angular/common`: ^18.0.0
- `react`: ^17.0.0
- `react-dom`: ^17.0.0
- `react-pivottable`: ^0.11.0
- `plotly.js-basic-dist`: ^2.0.0

## Usage

### 1. Import Styles

Add to your `styles.scss` or `angular.json`:

```scss
@import "react-pivottable/pivottable.css";
```

Or in `angular.json`:

```json
{
  "styles": [
    "node_modules/react-pivottable/pivottable.css",
    "src/styles.scss"
  ]
}
```

### 2. Import Components

```typescript
import { Component } from '@angular/core';
import { 
  NgPivotTableComponent, 
  NgPivotTableUiComponent,
  PivotTableConfig,
  PivotTableUIConfig
} from 'angular-pivottable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgPivotTableComponent, NgPivotTableUiComponent],
  template: `
    <!-- Interactive Pivot Table with drag-and-drop -->
    <ng-pivot-table-ui 
      [data]="data"
      [rows]="['City']"
      [cols]="['Gender']"
      [aggregatorName]="'Sum'"
      (configChange)="onConfigChange($event)">
    </ng-pivot-table-ui>

    <!-- Read-only Pivot Table -->
    <ng-pivot-table
      [data]="data"
      [rows]="['City']"
      [cols]="['Gender']"
      [vals]="['Sales']"
      [aggregatorName]="'Sum'">
    </ng-pivot-table>
  `
})
export class AppComponent {
  data = [
    { Name: 'John', Gender: 'Male', City: 'New York', Sales: 1200 },
    { Name: 'Jane', Gender: 'Female', City: 'Boston', Sales: 1500 },
    // ... more data
  ];

  onConfigChange(config: any) {
    console.log('Configuration changed:', config);
  }
}
```

## Components

### NgPivotTableComponent (Read-Only)

A read-only pivot table for displaying pre-configured data.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `any[]` | `[]` | Array of objects to pivot |
| `rows` | `string[]` | `[]` | Attributes to use as rows |
| `cols` | `string[]` | `[]` | Attributes to use as columns |
| `vals` | `string[]` | `[]` | Attributes to aggregate |
| `aggregatorName` | `string` | `'Count'` | Aggregator function name |
| `rendererName` | `string` | - | Renderer name (e.g., 'Table', 'Table Heatmap', 'Bar Chart') |
| `valueFilter` | `object` | - | Filter configuration |
| `sorters` | `object` | - | Custom sorting functions |
| `derivedAttributes` | `object` | - | Computed attributes |
| `hiddenAttributes` | `string[]` | - | Attributes to hide |
| `hiddenFromAggregators` | `string[]` | - | Attributes hidden from aggregators |
| `hiddenFromDragDrop` | `string[]` | - | Attributes hidden from drag/drop |
| `menuLimit` | `number` | - | Max items in dropdown menus |
| `unusedOrientationCutoff` | `number` | - | Cutoff for unused attributes |

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

An interactive pivot table with drag-and-drop configuration.

#### Inputs

Same as `NgPivotTableComponent`, plus:

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `configChange` | `EventEmitter<PivotTableUIConfig>` | Emits when user changes configuration |
| `stateChange` | `EventEmitter<PivotTableUIConfig>` | Alias for configChange |

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `updateState` | `state: Partial<PivotTableUIConfig>` | `void` | Programmatically update state |
| `getState` | - | `PivotTableUIConfig` | Get current configuration |

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

The components are SSR-compatible and will only render in browser environments:

```typescript
// No special configuration needed - works automatically with Angular Universal
```

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

1. **Large Datasets**: The components use OnPush change detection and run React outside Angular zone for optimal performance.

2. **Data Immutability**: For best performance, use immutable data updates:
   ```typescript
   this.data = [...this.data, newItem]; // Good
   this.data.push(newItem); // May not trigger change detection
   ```

3. **Memory Management**: Components automatically clean up React instances on destroy.

## Build

```bash
ng build angular-pivottable
```

## Development

```bash
# Build the library
ng build angular-pivottable --watch

# Run demo app
ng serve
```

## Troubleshooting

### Styles not loading

Make sure to import the CSS:
```scss
@import "react-pivottable/pivottable.css";
```

### TypeScript errors with React imports

Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true
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

## License

MIT

## Credits

- Built with [react-pivottable](https://github.com/plotly/react-pivottable)
- Inspired by the React community's excellent pivot table implementations
