---
name: Lumina Pixel
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#414751'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#717783'
  outline-variant: '#c1c7d3'
  surface-tint: '#0060ac'
  primary: '#005da7'
  on-primary: '#ffffff'
  primary-container: '#2976c7'
  on-primary-container: '#fdfcff'
  inverse-primary: '#a4c9ff'
  secondary: '#006d3c'
  on-secondary: '#ffffff'
  secondary-container: '#85f6ad'
  on-secondary-container: '#00723f'
  tertiary: '#845000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36712'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#88f9b0'
  secondary-fixed-dim: '#6bdc96'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522c'
  tertiary-fixed: '#ffddba'
  tertiary-fixed-dim: '#ffb866'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  card-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  card-gap: 16px
  section-padding: 32px
  inner-padding: 20px
---

## Brand & Style

The design system is built for a vibrant, gamified English learning experience. It balances a nostalgic "Pixel-Art" aesthetic with modern, clean UI principles to ensure the learning process feels like a rewarding game rather than a chore. The target audience is learners who value visual feedback and a sense of progression.

The style is a hybrid of **Modern Minimalism** and **Playful Retro**. It uses chunky, high-contrast elements and a vibrant palette to drive engagement. While the core containers are clean and readable, the "spirit" of the design lives in pixelated accents, dithered-inspired gradients, and bold, tactile components that evoke the joy of classic handheld gaming.

## Colors

The color strategy uses high-saturation primary and functional colors to provide immediate feedback. 

- **Primary (Learning Blue):** Used for main actions, active states, and navigation.
- **Success (Achievement Green):** Reserved exclusively for "Mastered" states and correct answers.
- **Warning/Error (Try Again Red):** Used for mistakes and "needs review" indicators.
- **Accents:** Soft Yellow (#F6AD55) for Nouns, Purple (#9F7AEA) for Verbs, and Pink/Teal for other parts of speech to help with visual categorization.
- **Neutral:** A very soft grey background ensures that the vibrant card colors pop without causing eye strain during long study sessions.

## Typography

This design system utilizes a three-tier font strategy:
1. **Plus Jakarta Sans** provides a friendly, rounded geometric feel for headlines and flashcard content.
2. **Inter** ensures maximum legibility for definitions, examples, and settings.
3. **Space Grotesk** is used for labels and metadata (like word categories) to inject a subtle "technical/digital" feel that complements the pixel-art accents.

For mobile, headlines should scale down by approximately 15% to maintain screen real estate while preserving the bold, heavy-weight hierarchy.

## Layout & Spacing

The layout follows a **fluid-to-fixed** model. On mobile, elements utilize a single-column layout with 24px side margins. On desktop, content is contained within a maximum width of 1200px.

Spacing is based on an 8px grid. To reinforce the "tactile card" feel, we prioritize generous internal padding within containers (20px+) to ensure the UI feels airy and approachable. Card grids should use a 16px gutter to maintain clear separation of concepts.

## Elevation & Depth

Depth is achieved through **Tonal Layers** combined with **Ambient Shadows**. 

Instead of traditional, blurry floating shadows, this design system uses "Sticker Shadows"—offset shadows with a slightly higher opacity (15-20%) and a low blur radius (8px), creating the effect that cards are physical objects resting just above the surface. 

Higher elevation states (like a card being flipped or dragged) should increase the shadow offset and blur, while interactive buttons should appear to "sink" (shadow decreases) when pressed to provide physical feedback.

## Shapes

The shape language is defined by "Super-Rounded" corners. While the base `roundedness` is set to `2` (0.5rem), the flagship Flash Cards and Primary Buttons utilize `rounded-xl` (1.5rem / 24px) to create a friendly, toy-like appearance. 

Progress bars and category chips should use pill-shaped (fully rounded) ends to contrast against the more structural card containers.

## Components

### Flash Cards
The core component. Cards must have a minimum height of 320px on mobile. They feature a white surface, 24px corner radius, and a subtle 2px border in a lighter shade of the category color (e.g., a soft purple border for Verbs).

### Buttons
- **Primary:** High-contrast blue with white text, bold weight, and a "press-in" animation effect.
- **Functional (Green/Red):** Used for "Known" and "Learn Again" actions at the bottom of the study screen.

### Chips
Small, pill-shaped tags used for word categories. They should use the category's accent color at 20% opacity for the background, with 100% opacity for the text to ensure accessibility.

### Input Fields
Clean, white backgrounds with a thick 2px border that changes from neutral to Primary Blue on focus. Use "Plus Jakarta Sans" for the input text to keep the feel friendly.

### Progress Indicators
Thick, 12px height bars with a "stepped" look to mimic pixel-art progression. The "filled" portion should use a subtle gradient and a white "shine" line at the top to give it a 3D glass effect.

### Category Icons
Pixel-style icons (16x16 or 32x32 grid style) should be used alongside category labels to reinforce the "Pixel-Art" brand narrative.