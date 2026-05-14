# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

## [0.1.0] - 2026-05-14

### Added

- Estructura base del proyecto Vue 3 + Vite + Tailwind CSS 4.
- Integración de GSAP con ScrollSmoother para el scroll global.
- Definición de tokens visuales, tipografías locales y utilidades en `src/assets/main.css`.
- Componentes principales de página:
  - `Header.vue`
  - `Section1.vue`
  - `Section2.vue`
  - `Section3.vue`
  - `Section4.vue`
  - `Section5.vue`
  - `Section6.vue`
  - `Section7.vue`
- Assets locales de imagen y vídeo en `public/media`.
- Composable `glowShadow.js` para animaciones de brillo con GSAP, SplitText y ScrollTrigger.

### Animations

- `App.vue`
  - Añadido `ScrollSmoother` sobre `#smooth-wrapper` y `#smooth-content`.
  - Añadido filtro SVG `#wiggle` con `feTurbulence` y `feDisplacementMap`.
  - Ajustado el filtro para reducir diferencias entre Chrome y Safari.

- `Section1.vue`
  - Añadida animación de entrada del título principal.
  - Aplicado filtro `#wiggle` sobre `.plane-title`.
  - Añadido efecto `glowShadow` sobre `.lighting-text`.
  - Añadido control de vídeo overlay con hidratación diferida, play, close, Escape y restauración del header.

- `Section2.vue`
  - Añadido reveal de `section__title` con SplitText por caracteres.
  - El reveal anima la opacidad de caracteres de `50%` a `100%` con ScrollTrigger scrub.
  - El reveal empieza en `top 65%` y termina en `center center`.
  - Añadido pin de `section__wrapper` cuando la sección llega a `center center`.
  - Añadida entrada de `video__left` desde debajo del viewport hasta alinearse con `video__center`.
  - Añadido GSAP Flip scrubbed para intercambiar simultáneamente:
    - `video__left` hacia el slot central.
    - `video__center` hacia el slot derecho.
  - Añadida transición de opacidad durante el Flip:
    - `video__left`: `30%` a `100%`.
    - `video__center`: `100%` a `30%`.
  - Añadido control de reproducción de vídeos:
    - `video__center` reproduce al entrar en el pin.
    - ambos vídeos se pausan durante el Flip.
    - `video__left` reproduce cuando queda en el centro.
    - ambos vídeos se pausan y resetean a `0` al salir la sección del viewport.

### Changed

- Documentado el proyecto completo en `README.md`.
- Versión del proyecto asignada a `0.1.0`.
