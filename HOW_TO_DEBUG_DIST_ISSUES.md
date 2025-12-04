# How to Debug Dist Import Issues

## Current Setup ✅

Your demo app is now configured to import from the **dist folder** instead of the library source.

### Configuration:
- **tsconfig.json** path mapping: `"angular-pivottable": ["./dist/angular-pivottable"]`
- **Import statement**: `import { ... } from 'angular-pivottable'`
- **Resolves to**: `./dist/angular-pivottable`

### Dev Server Running:
- URL: http://localhost:4201
- Status: ✅ Compiling successfully
- No TypeScript errors

## Step-by-Step Debugging Guide

### 1. Check Browser Console (IMPORTANT!)

Open the app in your browser and check DevTools:

```
http://localhost:4201
Press F12 to open DevTools
Go to Console tab
```

**Look for:**
- ✅ "🔍 Testing imports from DIST files" message
- ✅ Component constructors being logged
- ❌ Any runtime errors (red text)
- ❌ Module loading errors
- ❌ React context errors

### 2. Verify Components Render

**Expected behavior:**
- Interactive Pivot Table UI should be visible at the top
- Read-only Pivot Table should be visible below
- You should be able to drag and drop fields
- Data should be displayed in a table format

**If components don't render:**
- Check console for React errors
- Check if `react`, `react-dom`, `react-pivottable` are available
- Verify styles are loaded

### 3. Check Network Tab

In DevTools Network tab:
- Look for `.mjs` or `.js` files being loaded
- Check if files are loaded from `dist/angular-pivottable`
- Look for 404 errors

### 4. Verify Dist Files Are Built Correctly

Check the dist folder structure:
```
dist/angular-pivottable/
├── index.d.ts                    (main type definitions entry)
├── public-api.d.ts               (exports all public APIs)
├── package.json                  (package metadata & exports)
├── fesm2022/                     (ES modules)
│   └── asif-dev-ng-pivottable.mjs
├── esm2022/                      (ES modules)
└── lib/                          (component type definitions)
    ├── pivot-table/
    └── pivot-table-ui/
```

**Run this to verify:**
```powershell
Get-ChildItem -Path ".\dist\angular-pivottable" -Recurse -File | Select-Object FullName
```

### 5. Compare with Source Import

To test if the issue is specific to dist files:

**A. Switch to source imports:**

Edit `tsconfig.json`:
```json
"paths": {
  "angular-pivottable": ["./projects/angular-pivottable/src/public-api.ts"]
}
```

Restart dev server:
```powershell
# Stop current server (Ctrl+C in terminal)
ng serve --port 4201
```

**B. Test both configurations:**
1. Test with dist (current setup)
2. Note any differences in behavior
3. Test with source
4. Compare results

### 6. Common Dist Import Issues & Solutions

#### Issue 1: Components are undefined
**Symptoms:** Console shows components as `undefined`
**Causes:**
- Export statements in public-api.d.ts are incorrect
- TypeScript compilation issue
- Module resolution problem

**Debug:**
```powershell
# Check exports
Get-Content ".\dist\angular-pivottable\public-api.d.ts"
```

#### Issue 2: React not found
**Symptoms:** "React is not defined" or "Cannot find module 'react'"
**Causes:**
- Peer dependencies not installed
- React not bundled correctly

**Solution:**
```powershell
npm list react react-dom react-pivottable
```

#### Issue 3: Styles not applied
**Symptoms:** Pivot table appears but looks broken
**Causes:**
- CSS not imported
- Style path incorrect in package.json

**Check:**
- Browser DevTools > Elements tab
- Check if pivot table classes have styles applied
- Verify `styles.scss` imports are working

#### Issue 4: Type errors
**Symptoms:** TypeScript errors in IDE or during build
**Causes:**
- Type definitions missing or incorrect
- Path mapping not resolving correctly

**Debug:**
```powershell
# Check if types are generated
Test-Path ".\dist\angular-pivottable\index.d.ts"
Test-Path ".\dist\angular-pivottable\public-api.d.ts"
```

### 7. Rebuild and Test Cycle

When making changes to the library:

```powershell
# 1. Build the library
ng build angular-pivottable

# 2. Check for build errors in output

# 3. Dev server will auto-reload (if running)
# Or restart it:
ng serve --port 4201

# 4. Check browser console
# 5. Test all features
```

### 8. Testing External Project Scenario

To simulate how an external project would use your library:

**Option A: Create a new test project:**
```powershell
# In a different folder
ng new test-external-app --standalone
cd test-external-app

# Copy dist folder
Copy-Item -Path "..\angular-pivot-table\dist\angular-pivottable" -Destination ".\node_modules\angular-pivottable" -Recurse

# Or install from local
npm install ..\angular-pivot-table\dist\angular-pivottable
```

**Option B: Use npm link (recommended):**
```powershell
# In library dist folder
cd dist\angular-pivottable
npm link

# In external project
npm link angular-pivottable
```

### 9. Check Package.json Exports

The `package.json` in dist should have:
```json
{
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "esm2022": "./esm2022/asif-dev-ng-pivottable.mjs",
      "esm": "./esm2022/asif-dev-ng-pivottable.mjs",
      "default": "./fesm2022/asif-dev-ng-pivottable.mjs"
    }
  }
}
```

Verify:
```powershell
Get-Content ".\dist\angular-pivottable\package.json" | ConvertFrom-Json | Select-Object -ExpandProperty exports
```

### 10. Debugging Checklist

- [ ] Library built successfully (`ng build angular-pivottable`)
- [ ] Dist files exist in `dist/angular-pivottable`
- [ ] tsconfig.json has correct path mapping
- [ ] Dev server running without TypeScript errors
- [ ] Browser console shows component imports
- [ ] No runtime errors in console
- [ ] Components render on the page
- [ ] Pivot table is interactive
- [ ] Styles are applied correctly
- [ ] No network errors (404s)
- [ ] Compared behavior with source imports

## What to Report

If you find issues, gather this information:

1. **Console Errors**: Copy full error messages from browser console
2. **Network Errors**: Screenshot of Network tab showing failed requests
3. **Behavior Difference**: Describe what works with source vs dist
4. **Build Output**: Any warnings or errors from `ng build`
5. **Environment**: Node version, Angular version, OS

## Quick Commands Reference

```powershell
# Rebuild library
ng build angular-pivottable

# Start dev server
ng serve --port 4201

# Check if dist exists
Test-Path ".\dist\angular-pivottable"

# List dist contents
Get-ChildItem ".\dist\angular-pivottable"

# View package.json exports
Get-Content ".\dist\angular-pivottable\package.json" | ConvertFrom-Json

# Check installed dependencies
npm list react react-dom react-pivottable

# Clean build
Remove-Item -Recurse -Force ".\dist\angular-pivottable"
ng build angular-pivottable
```
