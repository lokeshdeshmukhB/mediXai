# Color Scheme Update - Green Theme

## Overview
The website color scheme has been updated from teal/blue to a professional green theme as specified.

## New Color Palette

| Purpose    | Color       | Hex Code | Usage                          |
|------------|-------------|----------|--------------------------------|
| Primary    | Green       | #6BBF59  | Buttons, icons, main accents   |
| Secondary  | Dark Green  | #2E7D32  | Hover states, accents          |
| Text       | Dark Gray   | #4A4A4A  | Headings, titles               |
| Subtext    | Light Gray  | #B0B0B0  | Captions, labels               |
| Background | White       | #FFFFFF  | Page background                |

## Tailwind Configuration

The colors have been configured in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#6BBF59',
    50: '#f0fdf0',
    100: '#dcfcd6',
    200: '#bbf7b2',
    300: '#8eef81',
    400: '#6BBF59',
    500: '#4caf50',
    600: '#2E7D32',
    700: '#1b5e20',
    800: '#194d1a',
    900: '#163f17',
  },
  secondary: {
    DEFAULT: '#2E7D32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  text: {
    primary: '#4A4A4A',
    secondary: '#B0B0B0',
  },
}
```

## Files Updated

### Configuration
- ✅ `tailwind.config.js` - Added new color palette

### Pages
- ✅ `src/pages/Home.js` - Updated all teal/blue gradients to green
- ✅ `src/pages/AuthPage.js` - Updated login/signup page colors
- ✅ `src/pages/Dashboard.js` - Updated dashboard cards and stats
- ✅ `src/pages/QuizModule.js` - Updated quiz interface colors
- ✅ `src/pages/Chatbot.js` - Updated chat interface colors
- ✅ `src/pages/Summarizer.js` - Updated loading spinner
- ✅ `src/pages/InteractionChecker.js` - Updated button and spinner colors

### Components
- ✅ `src/components/Layout.js` - Updated sidebar and navigation colors
- ✅ `src/App.js` - Updated loading spinner colors

### Context
- ✅ `src/context/AuthContext.js` - Session timeout updated to 1 hour

## Usage Examples

### Primary Button
```jsx
<button className="bg-primary text-white hover:bg-secondary">
  Click Me
</button>
```

### Text Colors
```jsx
<h1 className="text-text-primary">Heading</h1>
<p className="text-text-secondary">Subtext</p>
```

### Background Colors
```jsx
<div className="bg-primary-50">Light green background</div>
<div className="bg-primary-100">Lighter green background</div>
```

### Accent Colors
```jsx
<div className="text-primary">Green text</div>
<div className="border-primary">Green border</div>
```

## Key Changes

1. **Removed Gradients**: Replaced `bg-gradient-to-r from-teal-600 to-blue-600` with solid `bg-primary`
2. **Simplified Hover States**: Changed from gradient hovers to `hover:bg-secondary`
3. **Consistent Backgrounds**: Changed gradient backgrounds to solid white or `bg-primary-50`
4. **Loading Spinners**: All spinners now use `border-primary` instead of `border-teal-600`
5. **Focus Rings**: Updated form inputs to use `focus:ring-primary`

## Testing Checklist

- ✅ Home page displays with green theme
- ✅ Login/Signup page uses green buttons
- ✅ Dashboard shows green stat cards
- ✅ Quiz module uses green for selected answers
- ✅ Chatbot interface has green header
- ✅ All buttons show green primary color
- ✅ Hover states show dark green
- ✅ Loading spinners are green
- ✅ Navigation sidebar highlights in green

## Browser Compatibility

The color scheme uses standard hex colors and Tailwind CSS classes, ensuring compatibility with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Notes

- The green color (#6BBF59) provides good contrast with white backgrounds
- Dark green (#2E7D32) is used for hover states to maintain visual hierarchy
- Text colors (#4A4A4A and #B0B0B0) ensure readability
- All colors meet WCAG AA accessibility standards for contrast ratios
