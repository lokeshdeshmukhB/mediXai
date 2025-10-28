# Color Migration Guide

## Quick Reference: Old vs New Colors

### Primary Colors

| Old Color | Old Class | New Color | New Class | Usage |
|-----------|-----------|-----------|-----------|-------|
| Teal #14b8a6 | `bg-teal-600` | Green #6BBF59 | `bg-primary` | Buttons, primary actions |
| Blue #2563eb | `bg-blue-600` | Dark Green #2E7D32 | `bg-secondary` | Hover states, accents |
| Teal #0d9488 | `bg-teal-700` | Dark Green #2E7D32 | `bg-secondary` | Active/pressed states |

### Background Colors

| Old Color | Old Class | New Color | New Class |
|-----------|-----------|-----------|-----------|
| Teal 50 | `bg-teal-50` | Green 50 | `bg-primary-50` |
| Blue 50 | `bg-blue-50` | Green 100 | `bg-primary-100` |
| Teal 100 | `bg-teal-100` | Green 100 | `bg-primary-100` |

### Text Colors

| Old Color | Old Class | New Color | New Class |
|-----------|-----------|-----------|-----------|
| Teal 600 | `text-teal-600` | Green | `text-primary` |
| Blue 600 | `text-blue-600` | Dark Green | `text-secondary` |
| Gray 900 | `text-gray-900` | Dark Gray | `text-text-primary` |
| Gray 600 | `text-gray-600` | Light Gray | `text-text-secondary` |

### Border Colors

| Old Color | Old Class | New Color | New Class |
|-----------|-----------|-----------|-----------|
| Teal 600 | `border-teal-600` | Green | `border-primary` |
| Teal 400 | `border-teal-400` | Green | `border-primary` |
| Teal 200 | `border-teal-200` | Green 200 | `border-primary-200` |

## Common Pattern Replacements

### 1. Gradient Buttons
**Before:**
```jsx
className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
```

**After:**
```jsx
className="bg-primary hover:bg-secondary"
```

### 2. Background Gradients
**Before:**
```jsx
className="bg-gradient-to-br from-teal-50 to-blue-50"
```

**After:**
```jsx
className="bg-primary-50"
```

### 3. Text Gradients
**Before:**
```jsx
className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
```

**After:**
```jsx
className="text-primary"
```

### 4. Loading Spinners
**Before:**
```jsx
className="border-4 border-teal-600 border-t-transparent"
```

**After:**
```jsx
className="border-4 border-primary border-t-transparent"
```

### 5. Focus Rings
**Before:**
```jsx
className="focus:ring-2 focus:ring-teal-500"
```

**After:**
```jsx
className="focus:ring-2 focus:ring-primary"
```

### 6. Hover Borders
**Before:**
```jsx
className="hover:border-teal-400"
```

**After:**
```jsx
className="hover:border-primary"
```

## Component-Specific Changes

### Navigation/Sidebar
- Active state: `bg-teal-50 text-teal-600` → `bg-primary-50 text-primary`
- Logo text: Gradient → `text-primary`

### Buttons
- Primary: Teal/Blue gradient → `bg-primary`
- Hover: Gradient shift → `hover:bg-secondary`
- Disabled: No change (stays gray)

### Cards & Stats
- Icon backgrounds: `bg-teal-50` → `bg-primary-50`
- Icon colors: `text-teal-600` → `text-primary`
- Accent colors: `bg-blue-50` → `bg-primary-100`

### Forms
- Focus rings: `ring-teal-500` → `ring-primary`
- Selected state: `border-teal-600 bg-teal-50` → `border-primary bg-primary-50`
- Active inputs: Teal → Green

### Chat Interface
- User messages: Teal/Blue gradient → `bg-primary`
- Bot avatar: `bg-teal-100 text-teal-600` → `bg-primary-100 text-primary`

### Progress Bars
- Fill color: Teal/Blue gradient → `bg-primary`
- Background: No change (stays gray)

## Exceptions (Colors NOT Changed)

These colors serve specific purposes and were intentionally kept:

1. **Difficulty Levels (Quiz Module)**
   - Beginner: Green (kept)
   - Intermediate: Yellow/Orange (kept)
   - Advanced: Red (kept)

2. **Status Indicators**
   - Error: Red (kept)
   - Warning: Orange/Yellow (kept)
   - Success: Green (kept)
   - Info: Blue (kept for specific info messages)

3. **Severity Badges (Drug Interactions)**
   - High: Red (kept)
   - Moderate: Yellow (kept)
   - Low: Blue → Green (changed to match theme)

4. **System Colors**
   - Gray scales (kept for neutrals)
   - White/Black (kept)

## Migration Checklist

When adding new components, use:

- ✅ `bg-primary` for primary actions
- ✅ `bg-secondary` for hover states
- ✅ `text-primary` for headings
- ✅ `text-text-primary` for body text
- ✅ `text-text-secondary` for captions
- ✅ `bg-primary-50` for light backgrounds
- ✅ `border-primary` for accent borders
- ✅ `ring-primary` for focus states

Avoid:
- ❌ `bg-teal-*` classes
- ❌ `bg-blue-*` classes (except for specific status indicators)
- ❌ `text-teal-*` classes
- ❌ Gradient classes with teal/blue

## Testing Your Changes

1. Check all button states (default, hover, active, disabled)
2. Verify form focus states
3. Test loading spinners
4. Check navigation active states
5. Verify card accents
6. Test dark mode (if applicable)
7. Check accessibility contrast ratios

## Color Values Reference

```css
/* Primary Green */
--primary: #6BBF59;
--primary-50: #f0fdf0;
--primary-100: #dcfcd6;
--primary-200: #bbf7b2;
--primary-300: #8eef81;
--primary-400: #6BBF59;
--primary-500: #4caf50;
--primary-600: #2E7D32;
--primary-700: #1b5e20;
--primary-800: #194d1a;
--primary-900: #163f17;

/* Secondary Dark Green */
--secondary: #2E7D32;
--secondary-light: #4caf50;
--secondary-dark: #1b5e20;

/* Text Colors */
--text-primary: #4A4A4A;
--text-secondary: #B0B0B0;
```

## Need Help?

If you're unsure about a color choice:
1. Check this guide for the pattern
2. Look at similar components in the codebase
3. Use browser DevTools to inspect existing elements
4. Refer to `tailwind.config.js` for available classes
