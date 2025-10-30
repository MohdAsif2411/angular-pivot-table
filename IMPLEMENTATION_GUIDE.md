# Angular PivotTable Implementation Guide

## Summary of Refactoring

This guide explains the refactoring done to make the Angular wrapper for react-pivottable more Angular-friendly and production-ready.

## What Was Improved

### 1. **Proper Change Detection**
- ✅ Added `OnChanges` lifecycle hook to handle input changes
- ✅ Implemented `OnPush` change detection strategy
- ✅ React rendering runs outside Angular zone for better performance
- ✅ Manual change detection triggering when needed

### 2. **Better Lifecycle Management**
- ✅ Proper initialization check before rendering
- ✅ Safe cleanup in `ngOnDestroy`
- ✅ Prevents rendering before view initialization
- ✅ Handles component state properly

### 3. **Server-Side Rendering (SSR) Support**
- ✅ Platform checks using `isPlatformBrowser`
- ✅ Prevents React rendering on server
- ✅ No runtime errors in Universal apps

### 4. **Type Safety**
- ✅ Created comprehensive TypeScript interfaces
- ✅ Exported all configuration types
- ✅ Added type hints for aggregators and renderers
- ✅ Better IDE autocomplete support

### 5. **Enhanced PivotTableUI Component**
- ✅ Proper state management between Angular and React
- ✅ Two-way communication via outputs
- ✅ Prevents infinite loops during state updates
- ✅ Added helper methods: `updateState()` and `getState()`
- ✅ Debounced input changes to avoid conflicts with React's onChange

### 6. **Better Error Handling**
- ✅ Try-catch blocks around React operations
- ✅ Console errors for debugging
- ✅ Graceful degradation on failures

### 7. **More Input Options**
- ✅ All react-pivottable options now available
- ✅ Support for custom sorters
- ✅ Derived attributes support
- ✅ Value filtering
- ✅ Attribute visibility controls

### 8. **Better Component Structure**
- ✅ ViewChild for container reference
- ✅ Proper template structure
- ✅ Host styling support
- ✅ Clean component styles

## Key Changes Explained

### Change Detection Flow

**Before:**
```typescript
ngAfterViewInit(): void {
  this.container = this.el.nativeElement.querySelector('.ng-pivottable-root');
  this.renderReact();
}
```

**After:**
```typescript
ngAfterViewInit(): void {
  if (this.isBrowser && this.containerRef?.nativeElement) {
    this.isInitialized = true;
    this.renderReact();
  }
}

ngOnChanges(changes: SimpleChanges): void {
  if (this.isInitialized && this.isBrowser) {
    this.renderReact();
  }
}
```

**Why:** Now the component re-renders when inputs change, making it reactive to Angular's data flow.

### Zone Optimization

**Before:**
```typescript
ReactDOM.render(React.createElement(PivotTable, props), this.container);
```

**After:**
```typescript
this.ngZone.runOutsideAngular(() => {
  ReactDOM.render(
    React.createElement(PivotTable, props),
    this.containerRef.nativeElement
  );
});
```

**Why:** React's internal operations don't trigger unnecessary Angular change detection cycles, improving performance.

### State Management in PivotTableUI

**Before:**
```typescript
onChange: (s: any) => {
  this.state = s;
  this.configChange.emit(s);
  this.renderReact(s);
}
```

**After:**
```typescript
onChange: (newState: PivotTableUIConfig) => {
  this.shouldUpdateFromInputs = false;
  this.internalState = { ...newState };
  
  this.ngZone.run(() => {
    this.configChange.emit({ ...newState });
    this.cdr.markForCheck();
  });
  
  this.renderReact();
  
  Promise.resolve().then(() => {
    this.shouldUpdateFromInputs = true;
  });
}
```

**Why:** Prevents race conditions between Angular input changes and React's internal state updates. Ensures proper change detection timing.

## Usage Examples

### Basic Read-Only Pivot Table

```typescript
import { Component } from '@angular/core';
import { NgPivotTableComponent } from 'angular-pivottable';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [NgPivotTableComponent],
  template: `
    <ng-pivot-table
      [data]="salesData"
      [rows]="['Region', 'City']"
      [cols]="['Year']"
      [vals]="['Revenue']"
      [aggregatorName]="'Sum'"
      [rendererName]="'Table Heatmap'">
    </ng-pivot-table>
  `
})
export class SalesReportComponent {
  salesData = [
    { Region: 'North', City: 'NYC', Year: 2023, Revenue: 50000 },
    { Region: 'North', City: 'Boston', Year: 2023, Revenue: 35000 },
    // ... more data
  ];
}
```

### Interactive Pivot with State Management

```typescript
import { Component, ViewChild } from '@angular/core';
import { NgPivotTableUiComponent, PivotTableUIConfig } from 'angular-pivottable';

@Component({
  selector: 'app-data-explorer',
  standalone: true,
  imports: [NgPivotTableUiComponent],
  template: `
    <div class="controls">
      <button (click)="saveConfiguration()">Save Config</button>
      <button (click)="loadConfiguration()">Load Config</button>
      <button (click)="resetToDefaults()">Reset</button>
    </div>
    
    <ng-pivot-table-ui
      #pivotTable
      [data]="data"
      [rows]="defaultRows"
      [cols]="defaultCols"
      (configChange)="onConfigChange($event)">
    </ng-pivot-table-ui>
  `
})
export class DataExplorerComponent {
  @ViewChild('pivotTable') pivotTable!: NgPivotTableUiComponent;
  
  data = [...]; // your data
  defaultRows = ['Category'];
  defaultCols = ['Region'];
  savedConfig: PivotTableUIConfig | null = null;
  
  onConfigChange(config: PivotTableUIConfig): void {
    // Auto-save to localStorage
    localStorage.setItem('pivotConfig', JSON.stringify(config));
  }
  
  saveConfiguration(): void {
    this.savedConfig = this.pivotTable.getState();
    console.log('Saved:', this.savedConfig);
  }
  
  loadConfiguration(): void {
    if (this.savedConfig) {
      this.pivotTable.updateState(this.savedConfig);
    }
  }
  
  resetToDefaults(): void {
    this.pivotTable.updateState({
      rows: this.defaultRows,
      cols: this.defaultCols,
      aggregatorName: 'Count'
    });
  }
}
```

### Advanced Features

```typescript
import { Component } from '@angular/core';
import { NgPivotTableUiComponent } from 'angular-pivottable';

@Component({
  selector: 'app-advanced-pivot',
  standalone: true,
  imports: [NgPivotTableUiComponent],
  template: `
    <ng-pivot-table-ui
      [data]="salesData"
      [rows]="['Region']"
      [cols]="['Quarter']"
      [derivedAttributes]="derivedAttrs"
      [sorters]="customSorters"
      [valueFilter]="filters"
      [hiddenAttributes]="['InternalId']"
      (configChange)="onConfigChange($event)">
    </ng-pivot-table-ui>
  `
})
export class AdvancedPivotComponent {
  salesData = [
    { Region: 'North', Quarter: 'Q1', Sales: 1000, Profit: 200 },
    // ... more data
  ];
  
  // Computed columns
  derivedAttrs = {
    'Profit Margin': (record: any) => 
      ((record.Profit / record.Sales) * 100).toFixed(1) + '%',
    'Performance': (record: any) => 
      record.Sales > 5000 ? 'High' : 'Low'
  };
  
  // Custom sorting
  customSorters = {
    'Quarter': (a: string, b: string) => {
      const order = ['Q1', 'Q2', 'Q3', 'Q4'];
      return order.indexOf(a) - order.indexOf(b);
    },
    'Region': (a: string, b: string) => a.localeCompare(b)
  };
  
  // Filter visible values
  filters = {
    'Region': { 'North': true, 'South': true }
  };
  
  onConfigChange(config: any): void {
    console.log('Config updated:', config);
  }
}
```

### Working with Dynamic Data

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgPivotTableUiComponent } from 'angular-pivottable';

@Component({
  selector: 'app-dynamic-data',
  standalone: true,
  imports: [NgPivotTableUiComponent],
  template: `
    <button (click)="refreshData()">Refresh Data</button>
    
    @if (loading) {
      <div>Loading...</div>
    } @else {
      <ng-pivot-table-ui
        [data]="pivotData"
        [rows]="['category']"
        [cols]="['month']"
        (configChange)="onConfigChange($event)">
      </ng-pivot-table-ui>
    }
  `
})
export class DynamicDataComponent implements OnInit {
  pivotData: any[] = [];
  loading = false;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.loading = true;
    this.http.get<any[]>('/api/sales-data').subscribe(data => {
      // Important: Create new array reference for change detection
      this.pivotData = [...data];
      this.loading = false;
    });
  }
  
  refreshData(): void {
    this.loadData();
  }
  
  onConfigChange(config: any): void {
    console.log('User changed config:', config);
  }
}
```

## Performance Optimization Tips

### 1. Use Immutable Updates

```typescript
// ✅ Good - triggers change detection
this.data = [...this.data, newItem];
this.data = this.data.map(item => ({ ...item }));

// ❌ Bad - may not trigger change detection
this.data.push(newItem);
this.data[0].value = 'new';
```

### 2. Memoize Large Datasets

```typescript
import { Component, computed, signal } from '@angular/core';

@Component({...})
export class OptimizedComponent {
  private rawData = signal<any[]>([]);
  
  // Only recompute when rawData changes
  pivotData = computed(() => this.rawData());
  
  updateData(newData: any[]): void {
    this.rawData.set(newData);
  }
}
```

### 3. Lazy Load Data

```typescript
@Component({
  template: `
    @defer (on viewport) {
      <ng-pivot-table-ui [data]="largeDataset">
      </ng-pivot-table-ui>
    } @placeholder {
      <div>Scroll down to load pivot table...</div>
    }
  `
})
export class LazyPivotComponent {
  largeDataset = [...]; // thousands of rows
}
```

## Testing

### Unit Test Example

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgPivotTableComponent } from 'angular-pivottable';

describe('NgPivotTableComponent', () => {
  let component: NgPivotTableComponent;
  let fixture: ComponentFixture<NgPivotTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPivotTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPivotTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with data', () => {
    component.data = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ];
    component.rows = ['name'];
    component.cols = ['age'];
    
    fixture.detectChanges();
    
    expect(fixture.nativeElement.querySelector('.pvtTable')).toBeTruthy();
  });

  it('should clean up on destroy', () => {
    component.data = [{ test: 1 }];
    fixture.detectChanges();
    
    const spy = spyOn(console, 'error');
    fixture.destroy();
    
    expect(spy).not.toHaveBeenCalled();
  });
});
```

## Troubleshooting

### Issue: Component doesn't update when data changes

**Solution:** Ensure you're creating a new array reference:
```typescript
// Instead of:
this.data.push(newItem);

// Do:
this.data = [...this.data, newItem];
```

### Issue: PivotTableUI onChange causes infinite loop

**Solution:** This is handled internally now, but if you're manually updating inputs from the onChange event, avoid it:
```typescript
// ❌ Bad - creates infinite loop
onConfigChange(config: any) {
  this.rows = config.rows; // Don't do this!
}

// ✅ Good - just observe the changes
onConfigChange(config: any) {
  console.log('Config changed:', config);
  // Store for later use but don't feed back to component
  this.savedConfig = config;
}
```

### Issue: Styles not loading

**Solution:** Import the CSS in your `styles.scss`:
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

## Migration from Old Implementation

If you're upgrading from the old implementation:

1. **Update imports:**
   ```typescript
   // Add new type imports
   import { 
     NgPivotTableComponent,
     NgPivotTableUiComponent,
     PivotTableUIConfig 
   } from 'angular-pivottable';
   ```

2. **Update event handlers:**
   ```typescript
   // Old
   onConfigChange(cfg: any) { }
   
   // New (with types)
   onConfigChange(cfg: PivotTableUIConfig) { }
   ```

3. **Update data bindings:**
   ```typescript
   // Old - no change detection on updates
   this.data.push(newItem);
   
   // New - proper change detection
   this.data = [...this.data, newItem];
   ```

4. **No other changes needed!** The components are backward compatible.

## Conclusion

The refactored implementation is now:
- ✅ More Angular-friendly
- ✅ Better performance
- ✅ Type-safe
- ✅ SSR-compatible
- ✅ Production-ready
- ✅ Easier to maintain
- ✅ Better developer experience

The components now follow Angular best practices while providing a seamless wrapper around the React pivot table library.
