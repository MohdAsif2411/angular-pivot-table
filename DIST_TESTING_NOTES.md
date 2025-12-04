# Testing Dist Files in Demo App

## Setup Complete ✅

### What was done:

1. **Built the library**: `ng build angular-pivottable`
   - Output: `dist/angular-pivottable/`
   - Generated proper ES modules, type definitions, and package.json

2. **Path Mapping Configuration** (already in place):
   - `tsconfig.json` contains:
     ```json
     "paths": {
       "angular-pivottable": ["./dist/angular-pivottable"]
     }
     ```
   - This means ANY import from `'angular-pivottable'` will resolve to the dist folder

3. **Updated demo-app imports**:
   - Added comments to clarify that imports are from dist
   - Added console.log statements to verify component imports

4. **Started dev server**: Running on `http://localhost:4201`

## Current State:

The demo app is now importing from **dist files** instead of source files.

### Import path in app.component.ts:
```typescript
import {
  NgPivotTableComponent,
  NgPivotTableUiComponent,
  PivotTableUIConfig,
  AggregatorName
} from 'angular-pivottable';
```

This resolves to: `./dist/angular-pivottable` (via tsconfig path mapping)

## How to Debug Issues:

### 1. Check Browser Console
- Open DevTools (F12) on http://localhost:4201
- Look for the console logs: "🔍 Testing imports from DIST files"
- Check for any runtime errors

### 2. Verify Dist Files Are Being Used
You can verify by:
- Checking the network tab to see which files are loaded
- Looking at source maps to see if they point to dist folder
- Temporarily modify source files and rebuild - changes should appear after `ng build`

### 3. Compare Source vs Dist
To test with source files instead:
- Update `tsconfig.json` paths to:
  ```json
  "angular-pivottable": ["./projects/angular-pivottable/src/public-api.ts"]
  ```
- Restart the dev server

### 4. Common Issues When Using Dist Files

**Possible issues external projects might face:**

1. **Missing peer dependencies**: 
   - react, react-dom, react-pivottable, plotly.js-basic-dist
   
2. **CSS not loaded**: 
   - Need to import styles from the package
   - Check if `angular.json` includes the styles

3. **Type definitions not found**: 
   - Ensure `types` field in package.json is correct
   - Check if .d.ts files are generated properly

4. **Module resolution issues**:
   - External projects may need to configure their bundler
   - Check exports in package.json

5. **React context not available**:
   - The wrapper components need React 17 to be available
   - Check if React is properly bundled

## Next Steps for Debugging:

1. Check browser console for errors
2. Verify the pivot table renders correctly
3. Test all features (drag & drop, aggregations, renderers)
4. If issues are found, compare with source imports
5. Check the built files in `dist/angular-pivottable/` for any anomalies

## Files to Review:

- `dist/angular-pivottable/package.json` - Entry points and exports
- `dist/angular-pivottable/fesm2022/*.mjs` - Compiled modules
- `dist/angular-pivottable/index.d.ts` - Type definitions
- Browser DevTools console - Runtime errors
