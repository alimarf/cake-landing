# hap.pybake

A landing page for hap.pybake, a home bakery in Malang, Indonesia. The **Warm & Homemade** visual direction combines cream, chocolate, and terracotta colors with serif typography and warm product photography.

## Getting started

Use Node.js >=22.23.4 and npm >=9.6.5.

```sh
npm install
npm run dev
```

The local development server runs at http://localhost:4381. Port 4381 avoids conflicts with other local projects.

```sh
npm run check   # Run Astro and TypeScript diagnostics
npm run build   # Run diagnostics and create a static production build in dist/
npm run preview # Preview the production build
```

## Stack and structure

- Astro with static output and no React runtime.
- Tailwind CSS 4 through the Vite plugin, with custom tokens and styles in `src/styles/global.css`.
- Lenis for smooth wheel scrolling and anchor navigation, synchronized with the GSAP ticker.
- GSAP and ScrollTrigger for entrance animations, hero parallax, section reveals, and catalog filtering.
- A three-scene journey follows the hero: kitchen → preparation → sharing. CSS sticky positioning and the GSAP timeline activate at viewport widths of at least 600px and heights of at least 620px, or widths of at least 360px and heights of at least 740px. The app preview and tall phones share the same choreography with responsive layouts. Chapter markers and progress follow scrolling in both directions.
- On shorter screens and without JavaScript, the scenes remain readable in a vertical layout. Reduced motion uses brief fades without sticky positioning or zoom. A direct link to the menu is available.
- Cormorant Garamond and DM Sans fonts are served locally through Fontsource, with no requests to Google Fonts.
- `src/pages/index.astro`: page markup and content.
- `src/data/products.ts`: categories, products, WhatsApp number, product-specific message templates, and the Instagram profile link.
- `src/data/images.ts`: imported image metadata used by Astro's `Image` component.
- `src/scripts/main.ts`: scrolling, animations, filters, and mobile navigation.
- `src/assets/images/`: concept photography in WebP format. Astro generates optimized responsive image sizes during the build.

## Business content

References include the [hap.pybake Instagram profile](https://www.instagram.com/hap.pybake/) and product posts whose IDs are recorded in the catalog data. Product names, the Malang location, and the quoted bio reflect the profile reviewed during development. Other copy is proposed editorial content.

Prices, stock, lead times, payment methods, and delivery arrangements are left for the business to confirm. Order CTAs open WhatsApp at **+62 813-5933-8291**. Each product photo and order link prepares a message containing the product name; visitors review and send the message themselves. Instagram links are limited to the kitchen story and the footer profile link.

All current product images are **AI-generated illustrations**, rather than photographs of the actual products. This is also disclosed near the catalog. Replace them with official product photography before the business launch when available. Asset origins and generation prompts are documented in `ASSETS.md`.

## Interactions and accessibility

- Category filters use buttons with `aria-pressed` and a live result count.
- Mobile navigation supports Escape and returns focus to the menu button.
- Anchor navigation moves keyboard focus to the destination content without adding it to the regular Tab sequence.
- All content is available in HTML; the catalog and links remain usable without JavaScript.
- The `prefers-reduced-motion` preference disables smooth scrolling, parallax, and element movement while keeping content visible.
- Touch scrolling uses native browser behavior; wheel scrolling and anchor navigation use Lenis when motion is enabled.
- Hover effects are limited to pointers that support hover. Fonts are served locally, and images below the hero load lazily. The pinned catalog loads its cards on entry so they are ready as scrolling reveals them.

## Before publishing

Confirm the business copy, product photography, variants, pricing, and ordering process with the owner. The canonical URL and absolute Open Graph image URL use `https://happybake.vercel.app`, configured through `site` in `astro.config.mjs`. Update this setting if the production domain changes. Astro generates a 1200 × 630 JPEG social preview from the hero image at build time; PNG and SVG favicons and an Apple touch icon are included. Test the scrolling experience on a physical phone; desktop emulation only verifies the responsive layout.

The project is configured for local development and static builds. No hosting deployment or external service account has been created.

## Page animation choreography

- Hero: word-by-word title entrance, navigation and CTA entrances, photo zoom and text parallax on scroll, and subtle arrow movement.
- Entire page: a progress bar at the top and an underline for the active navigation link.
- Journey: photo and text transitions, detail zoom, scene movement, and three chapter indicators.
- Catalog: at viewport widths of at least 600px and heights of at least 760px, vertical scrolling moves six products horizontally across a pinned stage. Filtering rebuilds the scroll distance and keeps visitors at the menu. In the regular layout, masked photo reveals are followed by captions.
- Story: a polaroid moves and rotates with scrolling, the photo is revealed through a mask, the title appears word by word, paragraphs enter in sequence, and the seal rotates.
- Ordering: lines grow with scrolling, numbers, titles, and descriptions enter in sequence, and symbols rotate on entry.
- Closing section: the terracotta surface expands from a rounded shape, the title appears word by word, the CTA enters, and the decorative bread illustration rotates.
- Footer: contact links enter in sequence, and the oversized wordmark rises into view with scrolling.
- Precision pointers: button labels respond magnetically while click targets and keyboard navigation remain stable.
- Reduced motion disables pinning, zoom, movement, and decorative loops. Headings retain complete accessible names even when their visual text is split into individual words.
