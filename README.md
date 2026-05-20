# dyrcamp-conocimiento

Proyecto Vue 3 + Vite para una experiencia visual de Dyresel Conocimiento, con animaciones GSAP, ScrollSmoother, ScrollTrigger, Flip, SplitText y assets de vídeo/imagen locales.

Version: `0.3.0`

## Stack

- Vue 3.5
- Vite 8
- Tailwind CSS 4
- GSAP 3.15
- Lenis 1.3
- Oxlint + ESLint + Prettier

## Estructura

```text
.
├── public/
│   ├── favicon.ico
│   └── media/
│       ├── images/
│       │   ├── dyresel-asesoramiento.png
│       │   ├── dyresel-conocimiento-hero.png
│       │   ├── dyresel-cumplimiento.png
│       │   ├── dyresel-experiencia.png
│       │   └── dyresel-soluciones.png
│       └── videos/
│           ├── comp_01.mp4
│           ├── comp_02.mp4
│           ├── comp_anime_final_1.mp4
│           ├── comp_anime_final_mobile.mp4
│           ├── comp_anime_final_v02_desktop.mp4
│           ├── DEP_comp_anime_final_v01.mp4
│           └── originals/
│               ├── comp_01.mp4
│               ├── comp_02.mp4
│               ├── comp_anime_final_1.mp4
│               ├── comp_anime_final_mobile.mp4
│               ├── comp_anime_final_v02_desktop.mp4
│               └── DEP_comp_anime_final_v01.mp4
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── assets/
│   │   ├── main.css
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── Section1.vue
│   │   ├── Section2.vue
│   │   ├── Section3.vue
│   │   ├── Section4.vue
│   │   ├── Section5.vue
│   │   ├── Section6.vue
│   │   └── Section7.vue
│   ├── composables/
│   │   └── glowShadow.js
│   └── utils/
│       └── formatMultilineText.js
├── index.html
├── vite.config.js
├── package.json
└── CHANGELOG.md
```

## Archivos principales

- `src/App.vue`: monta la navegación, el fondo global `landing-dot-bg`, el contenedor de ScrollSmoother, las secciones, el footer desktop fijo, el footer mobile en flujo y el filtro SVG `#wiggle` usado por el texto `plane-title`.
- `src/assets/main.css`: tokens de color, tipografías locales, escala tipográfica responsive y utilidades Tailwind del proyecto.
- `src/components/Header.vue`: cabecera fija con logotipo SVG, CTA de contacto y estado cromático alternativo sobre fondo claro.
- `src/components/Section1.vue`: hero inicial responsive con imagen de fondo, entrada del título, efecto de glow en el texto, filtro SVG sobre `plane-title` e indicador de scroll animado.
- `src/components/Section2.vue`: sección animada responsive con reveal de texto, intercambio de mensajes, pin, vídeos, GSAP Flip, control de reproducción y reset de vídeo al salir del viewport.
- `src/components/Section3.vue`: sección de transición responsive que dispara el punto blanco global.
- `src/components/Section5.vue`: sección de beneficios responsive con imagen central, imágenes laterales, textos desktop/mobile sincronizados y swaps con GSAP Flip.
- `src/components/Section6.vue`: bloque de vídeo full-width con source mobile y desktop.
- `src/components/Section7.vue`: sección de contacto responsive con formulario EmailJS, estados de éxito/error, validaciones básicas y hover del CTA.
- `src/components/Footer.vue`: pie con datos corporativos, privacidad, enlace social, variante fija/opcional y tema claro/oscuro.
- `src/composables/glowShadow.js`: composable reutilizable para animaciones de glow con GSAP, SplitText y ScrollTrigger.

## Animaciones

### Global

`App.vue` crea `ScrollSmoother` sobre:

```text
#smooth-wrapper
└── #smooth-content
```

También define el filtro SVG `#wiggle`, compuesto por `feTurbulence` y `feDisplacementMap`, aplicado globalmente a `.plane-title`.

El fondo blanco global vive fuera de `#smooth-wrapper` como `.landing-dot-bg`. Permanece fijo para poder convertirse en background del resto de la landing sin depender del posicionamiento interno de cada sección.

En dispositivos touch se mantiene `smoothTouch: 0.1` para que los ScrollTriggers pineados compartan el mismo modelo de scroll que desktop.

### Header

- El CTA de contacto hace scroll suave hasta `.section-7`.
- El logotipo parte en blanco sobre el fondo oscuro.
- Cuando termina el escalado del punto blanco, los paths SVG cambian a `#24333b`.
- El botón cambia a fondo `#24333b`, texto blanco y hover con fondo `#D3E2E3` y texto `#24333b`.

### Section1

- Timeline de entrada del título con GSAP.
- `plane-title` usa el filtro SVG `#wiggle`.
- `glowShadow()` anima el texto `.lighting-text`.
- Incluye control de overlay de vídeo completo con hidratación diferida.
- El layout centra el hero en mobile/tablet y conserva el alineado a la izquierda en desktop.
- La imagen de fondo ocupa el ancho de viewport, se recorta con `object-cover` y ajusta su posición entre mobile y desktop.
- Añade flechas inferiores animadas para sugerir scroll, respetando `prefers-reduced-motion`.

### Section2

- `section__title` usa SplitText por caracteres.
- El título se divide en dos mensajes superpuestos; el segundo entra mientras se completa el swap de vídeos.
- El reveal empieza en `top 65%` y termina en `center center`, antes del pin.
- `section__wrapper` se pinea en `center center`.
- El layout usa dos filas en mobile/tablet y reajusta escala/altura de los vídeos para evitar recortes agresivos.
- `video__center` empieza visible y reproduce al entrar en el pin.
- `video__left` sube desde debajo del viewport con opacidad `30%`.
- Al llegar a su posición, GSAP Flip anima simultáneamente:
  - `video__left` pasa al slot central.
  - `video__center` pasa al slot derecho.
- Durante el Flip:
  - `video__left` sube de `30%` a `100%` de opacidad.
  - `video__center` baja de `100%` a `30%` de opacidad.
  - ambos vídeos permanecen pausados.
- Cuando `video__left` queda en el centro, se reproduce.
- Al salir la sección del viewport, ambos vídeos se pausan y resetean a `0`.

### Section3

- Dispara la animación global de `.landing-dot-bg`.
- El punto parte desde el bottom, fuera del viewport, con escala `2%`.
- Al llegar `.section-3` a `top center`, el punto sube hasta el centro del viewport con scrub.
- Después escala hasta `150%` y queda como fondo blanco fijo del resto de la landing.
- En `prefers-reduced-motion`, el estado final se aplica sin scrub.

### Section5

- La sección usa un layout propio para las imágenes, separado del grid general de `.section`.
- A `1920x1080`, la imagen central mide hasta `562x808px`.
- A `1920x1080`, las imágenes laterales miden `185x248px`.
- Las medidas responsive se calculan con variables CSS proporcionales:
  - `--center-width: clamp(275px, 29.2708vw, 562px)`
  - `--center-height: calc(var(--center-width) * 808 / 562)`
  - `--side-width: calc(var(--center-width) * 185 / 562)`
  - `--side-height: calc(var(--side-width) * 248 / 185)`
  - `--image-gap: clamp(1rem, calc(-0.5rem + 3.125vw), 3.25rem)`
- El grid interno tiene tres slots estables: left, center y right. Esto evita que GSAP Flip mida cajas variables heredadas del grid exterior.
- La secuencia desktop usa cuatro imágenes:
  - `dyresel-cumplimiento.png`
  - `dyresel-asesoramiento.png`
  - `dyresel-soluciones.png`
  - `dyresel-experiencia.png`
- La imagen activa en center queda con opacidad `1`.
- Las imágenes activas en left/right quedan con opacidad `0.5`.
- La imagen que sale de la secuencia pasa a opacidad `0`.
- Cada imagen tiene un `li` asociado en `text__list`; cuando una imagen entra al centro, su texto hace fade-in y el anterior fade-out.
- Hay listas de texto separadas para desktop y mobile, ambas sincronizadas por la misma secuencia GSAP.
- En mobile la sección pasa a columna, posiciona el carrusel con margen lateral controlado y reserva altura para el texto inferior.
- Los flips actuales son:
  - imagen 1 center -> left e imagen 2 right -> center.
  - imagen 2 center -> left e imagen 3 right -> center, mientras la imagen 1 desaparece.
  - imagen 3 center -> left e imagen 4 right -> center, mientras la imagen 2 desaparece.

### Section6

- El vídeo usa `<source>` con media queries:
  - `comp_anime_final_mobile.mp4` para viewports de hasta `767px`.
  - `comp_anime_final_v02_desktop.mp4` para viewports desde `768px`.
- En desktop mantiene formato `aspect-video`; en mobile se adapta sin forzar el mismo ratio.

### Section7

- Formulario de contacto con EmailJS.
- Campos: nombre, email, mensaje, aceptación de privacidad, opt-in comercial y honeypot.
- Estados `idle`, `success` y `error`.
- El estado de éxito/error se resetea automáticamente tras unos segundos.
- El grid pasa a una columna en mobile y ajusta padding, tamaños de texto y checks para mejorar legibilidad.
- El botón de envío incorpora hover claro con texto oscuro.

### Footer

- Desktop mantiene el footer fijo en la parte inferior.
- Mobile renderiza un footer no fijo al final del contenido, con variante oscura para fondos claros.
- `App.vue` sincroniza `footer--dark` con el mismo estado de fondo claro que usa el header.
- La animación del texto del sitio comprueba que el enlace existe antes de inicializar GSAP.

## Media

- Los vídeos de `public/media/videos/` se han reemplazado por versiones optimizadas de menor peso.
- Las fuentes originales se conservan en `public/media/videos/originals/` para futuras exportaciones o recompresiones.

## Scripts

```sh
npm install
npm run dev
npm run build
npm run lint
npm run format
```

## Desarrollo

El servidor de desarrollo se arranca con:

```sh
npm run dev
```

Vite mostrará la URL local, normalmente:

```text
http://localhost:5173/
```

## Compatibilidad

Las animaciones respetan `prefers-reduced-motion` en las secciones donde se inicializan efectos complejos. Safari puede comportarse distinto con filtros SVG aplicados sobre texto HTML; el filtro `#wiggle` usa una región ampliada y valores de turbulencia no nulos para reducir recortes y diferencias de velocidad.
