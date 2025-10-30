# Angular PivotTable Workspace

This workspace contains an Angular 18 library that wraps the React [react-pivottable](https://github.com/plotly/react-pivottable) library, making it easy to use pivot tables in Angular applications.

## 📦 Projects

- **angular-pivottable** - The library that provides Angular components
- **demo-app** - Demo application showcasing the library usage

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Build the Library

```bash
ng build angular-pivottable
```

### Run the Demo

```bash
ng serve
```

Navigate to `http://localhost:4200/` to see the demo application.

## 📚 Documentation

- **[Library README](./projects/angular-pivottable/README.md)** - Complete API documentation
- **[Implementation Guide](./IMPLEMENTATION_GUIDE.md)** - Detailed usage examples and best practices

## 🏗️ Project Structure

```
my-workspace/
├── projects/
│   ├── angular-pivottable/          # The library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── pivot-table/              # Read-only component
│   │   │   │   ├── pivot-table-ui/           # Interactive component
│   │   │   │   ├── types.ts                  # TypeScript definitions
│   │   │   │   └── styles/
│   │   │   └── public-api.ts                 # Public API exports
│   │   └── README.md
│   └── demo-app/                    # Demo application
│       └── src/
│           └── app/
└── dist/                            # Build output
```

## 🔨 Development

### Watch Mode

Build the library in watch mode:

```bash
ng build angular-pivottable --watch
```

In another terminal, run the demo app:

```bash
ng serve
```

### Testing

Run tests for the library:

```bash
ng test angular-pivottable
```

Run tests for the demo app:

```bash
ng test demo-app
```

## 📖 Usage Example

```typescript
import { Component } from '@angular/core';
import { NgPivotTableUiComponent } from 'angular-pivottable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgPivotTableUiComponent],
  template: `
    <ng-pivot-table-ui 
      [data]="salesData"
      [rows]="['Region']"
      [cols]="['Year']"
      (configChange)="onConfigChange($event)">
    </ng-pivot-table-ui>
  `
})
export class AppComponent {
  salesData = [
    { Region: 'North', Year: 2023, Sales: 50000 },
    { Region: 'South', Year: 2023, Sales: 45000 },
    // ... more data
  ];

  onConfigChange(config: any) {
    console.log('Pivot configuration changed:', config);
  }
}
```

## ✨ Features

- ✅ **Angular 18+ Compatible** - Uses latest Angular features
- ✅ **Standalone Components** - No NgModule required
- ✅ **TypeScript Support** - Full type definitions
- ✅ **SSR Compatible** - Works with Angular Universal
- ✅ **Two Components**:
  - `NgPivotTableComponent` - Read-only pivot table
  - `NgPivotTableUiComponent` - Interactive with drag-and-drop
- ✅ **Performance Optimized** - OnPush change detection & zone optimization
- ✅ **Production Ready** - Proper error handling and lifecycle management

## 🔧 Technologies

- **Angular**: 18.0.0
- **Node.js**: 20.x
- **React**: 17.0.2
- **react-dom**: 17.0.2
- **react-pivottable**: 0.11.0
- **TypeScript**: 5.4.2

## 📝 Publishing

To publish the library:

1. Build the library:
   ```bash
   ng build angular-pivottable
   ```

2. Navigate to the dist folder:
   ```bash
   cd dist/angular-pivottable
   ```

3. Publish to npm:
   ```bash
   npm publish
   ```

## 🤝 Contributing

1. Make your changes to the library in `projects/angular-pivottable`
2. Build the library: `ng build angular-pivottable`
3. Test in the demo app: `ng serve`
4. Run tests: `ng test angular-pivottable`
5. Submit a pull request

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Angular CLI](https://github.com/angular/angular-cli)
- Wraps [react-pivottable](https://github.com/plotly/react-pivottable) by Plotly
- Uses [Plotly.js](https://plotly.com/javascript/) for charts
