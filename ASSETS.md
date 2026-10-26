# Aset visual

Semua foto dibuat menggunakan **built-in image_gen**, lalu dioptimalkan ke WebP menggunakan Sharp. Tidak ada foto dari Instagram yang berhasil disalin ke project. Semua foto adalah ilustrasi penyajian, bukan foto produk asli. Aset project disimpan di `src/assets/images/`.

## Prompt hero

Output: `src/assets/images/hero.webp`.

> Photorealistic horizontal 16:9 editorial food photograph for an Indonesian home bakery website. This is a photo asset only, NO TEXT, NO LETTERING, NO website UI. Match an inviting warm homemade bakery cream and chocolate and terracotta art direction. Composition: lower 55 percent contains a generous wooden tray with round golden Indonesian roti abon buns topped with plentiful brown shredded meat at bottom left, a sliced vanilla Swiss roll cake on ceramic plate center, glossy banana bolen pastry with chocolate sprinkles bottom center-right, rustic chocolate brownies stacked at far right, and a small bowl of bright green coconut klepon in bottom right foreground. Tactile natural linen and wooden table, soft natural morning window sunlight from left, delicious realistic food textures, rich warm appetizing food photography with artisanal imperfections. Upper 45 percent is an empty softly lit ivory cream plaster wall, very clean low contrast negative space that will hold HTML headline on top. No plants overlapping upper middle text-safe area, tiny dried flowers at extreme left edge only. Premium magazine food photo, warm cream daylight, no excessive blur on food. Entire scene one continuous photograph, no panels, no logos, no watermarks.

## Prompt katalog

Setiap foto memakai prompt terpisah berbentuk:

> A single premium editorial product photograph, square composition. {SUBJECT}. Small Indonesian homemade bakery, natural warm window light, buttery cream linen tabletop background, chocolate brown and terracotta palette accents, tactile realistic appetizing food details, shot with 50mm lens at 35 degree angle, fill frame with food but keep 10% margin. Consistent warm artisanal photography art direction. Photo asset only, no text, no logos, no hands, no collage, no UI.

SUBJECT per file:

| File di public/images | SUBJECT |
| --- | --- |
| roti-abon.webp | three golden round Indonesian roti abon buns generously topped with brown shredded savory meat and parsley flecks, one bun torn to show fluffy interior, on a small handmade cream ceramic plate |
| bolen.webp | four glossy golden square Indonesian banana bolen pastries topped with chocolate sprinkles, one cut open to reveal banana and chocolate filling, on crumpled unbleached parchment |
| klepon.webp | seven small vivid pandan green Indonesian klepon rice cake balls covered with fresh white grated coconut on a deep olive green ceramic plate, one cut open revealing molten dark palm sugar |
| roll-cake.webp | a vanilla Swiss roll cake sliced into three spirals with subtle cream filling, on a handmade cream ceramic platter, one whole roll behind the slices |
| brownies.webp | a small round Indonesian chocolate brownies tart cake, decorated modestly with chocolate drizzle and small chocolate shards, one slice slightly pulled out revealing dense fudgy interior, on a handmade cream ceramic cake plate; no birthday text, no candles |
| cookies.webp | golden Indonesian nastar pineapple cookies and rustic chocolate chip cookies arranged in two small ceramic bowls beside a plain open glass jar, no labels |

Favicon dan detail smile wordmark dibuat sebagai SVG/CSS sederhana. Wordmark merupakan usulan pengolahan tipografi untuk website, bukan salinan logo resmi.

Ornamen penutup berupa sketsa roti abon dibuat sebagai SVG di `src/components/BreadSketch.astro`, memakai garis cream dengan opacity rendah. Ornamen ini menggantikan simbol bintang dan bergerak dari rotasi -12° ke 6° saat scroll.

## Foto journey

Dua aset tambahan dibuat dengan built-in `image_gen` dan disimpan di `src/assets/images/`. Seluruhnya merupakan ilustrasi, termasuk dapur yang ditampilkan.

Prompt untuk setiap aset:

> Create one photorealistic food editorial photograph asset, portrait 4:5 composition. {SUBJECT} Match warm artisanal homemade bakery photography, soft natural side lighting, film-like subtle texture, no text, labels, logos, UI, watermarks or collage. This is concept imagery for hap.pybake.

- `journey-dapur.webp` — SUBJECT: A quiet small Indonesian home baking kitchen in warm morning light. Close-up wooden worktop with a cream ceramic bowl containing soft bread dough, a wooden rolling pin, a light dusting of flour, plain linen apron and a small tray of unbaked square banana bolen pastries. No person, no hands, no fancy commercial equipment. Frame like an intimate editorial still life of a real home baker's workbench. Warm cream wall, natural linen, wood, warm terracotta pottery. Strong composition and appetizing tactile details.
- `journey-bersama.webp` — SUBJECT: An intimate Indonesian afternoon tea table set for sharing homemade snacks. Warm sunlit wooden table, an open low wooden tray with golden roti abon buns, small ceramic plate of sliced Swiss roll cake, a few glossy banana bolen pastries, green klepon in a bowl, two terracotta cups of tea. Linen napkins, natural lived-in details, no people or hands. Top-down diagonal editorial photograph that feels like being invited to a home, warm cream, caramel and chocolate colors. Realistic appetizing food, not croissants.
