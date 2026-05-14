# dyrcamp-conocimiento

Proyecto Vue 3 + Vite para una experiencia visual de Dyresel Conocimiento, con animaciones GSAP, ScrollSmoother, ScrollTrigger, Flip, SplitText y assets de vídeo/imagen locales.

Version: `0.1.0`

## Stack

- Vue 3.5
- Vite 8
- Tailwind CSS 4
- GSAP 3.15
- Oxlint + ESLint + Prettier

## Estructura

```text
.
├── public/
│   ├── favicon.ico
│   └── media/
│       ├── images/
│       │   └── dyresel-conocimiento-hero.png
│       └── videos/
│           ├── comp_01.mp4
│           ├── comp_02.mp4
│           ├── comp_anime_final_1.mp4
│           ├── comp_anime_final_mobile.mp4
│           ├── comp_anime_final_v02_desktop.mp4
│           └── DEP_comp_anime_final_v01.mp4
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── assets/
│   │   ├── main.css
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
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

- `src/App.vue`: monta la navegación, el contenedor de ScrollSmoother, las secciones y el filtro SVG `#wiggle` usado por el texto `plane-title`.
- `src/assets/main.css`: tokens de color, tipografías locales, escala tipográfica y utilidades Tailwind del proyecto.
- `src/components/Section1.vue`: hero inicial con imagen de fondo, entrada del título, efecto de glow en el texto y filtro SVG sobre `plane-title`.
- `src/components/Section2.vue`: sección animada con reveal de texto, pin, vídeos, GSAP Flip, control de reproducción y reset de vídeo al salir del viewport.
- `src/composables/glowShadow.js`: composable reutilizable para animaciones de glow con GSAP, SplitText y ScrollTrigger.

## Animaciones

### Global

`App.vue` crea `ScrollSmoother` sobre:

```text
#smooth-wrapper
└── #smooth-content
```

También define el filtro SVG `#wiggle`, compuesto por `feTurbulence` y `feDisplacementMap`, aplicado globalmente a `.plane-title`.

### Section1

- Timeline de entrada del título con GSAP.
- `plane-title` usa el filtro SVG `#wiggle`.
- `glowShadow()` anima el texto `.lighting-text`.
- Incluye control de overlay de vídeo completo con hidratación diferida.

### Section2

- `section__title` usa SplitText por caracteres.
- El reveal empieza en `top 65%` y termina en `center center`, antes del pin.
- `section__wrapper` se pinea en `center center`.
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
