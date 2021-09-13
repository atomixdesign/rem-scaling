## Usage

Attach the rem font scaling

```tsx
import { HtmlFontSetter } from '@atomixdesign/rem-scaling'


new HtmlFontSetter({
  min: 12, // Min px size
  max: 16, // Max px size
  base: 16, // Default px size (normally this is the max size). Used for when no breakpoints match
  breakpoints: {
    md: [768, 1024], // Font-size @768: 12px, @1024: 16px
    lg: [1024, 1600],
  },
  fallback: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY], // Fallback breakpoint for SSR, if no SSR is needed just use this
})
```

If you'd like to remove the rem scaling in the future, simply call the return value

```tsx
import { HtmlFontSetter } from '@atomixdesign/rem-scaling'

const instance = new HtmlFontSetter({ ... })

instance.destroy()
```