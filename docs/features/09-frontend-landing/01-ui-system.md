# UI System: Luxury Glassmorphism Frontend

## Visual Direction

- Dark luxury base with layered glow and soft gradients.
- Frosted glass surfaces using border + blur + translucency.
- Editorial heading hierarchy with large, high-impact typography.
- Rounded corners mainly in 18px to 26px range.

## Typography

- Heading font: `Syne` (local file, variable font).
- Body font: `Manrope` (local file, variable font).
- Font source location:
  - `frontend/src/assets/fonts/Syne-Variable.ttf`
  - `frontend/src/assets/fonts/Manrope-Variable.ttf`

## Design Tokens

Defined in `frontend/src/styles/theme.css`:

- Background: `--bg-main`, `--bg-secondary`
- Text: `--text-main`, `--text-muted`
- Accent: `--accent-purple`, `--accent-blue`, `--accent-silver`, `--accent-pink`
- Surface border: `--line-soft`

## Reusable Components

- UI primitives:
  - `components/ui/Button.tsx`
  - `components/ui/GlassPanel.tsx`
  - `components/ui/SectionHeading.tsx`
- Card modules:
  - `components/cards/ProductCard.tsx`
  - `components/cards/CategoryCard.tsx`
  - `components/cards/ValueCard.tsx`
  - `components/cards/TestimonialCard.tsx`

## Interaction Details

- Hover states: lift effect, glow intensification, border accent.
- Motion classes in `frontend/src/styles/animations.css`.
- Focus states: high-contrast outlines for keyboard accessibility.
- Mobile-first layout with responsive grid/carousel behavior.