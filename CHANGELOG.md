# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

## [0.3.0] - 2026-05-20

### Added

- Añadida dependencia `lenis` en `package.json` y `package-lock.json`.
- Añadida carpeta `public/media/videos/originals/` con copias originales de los vídeos antes de su optimización.
- Añadido footer mobile no fijo al final del contenido en `App.vue`.
- Añadido prop `fixed` a `Footer.vue` para alternar entre footer fijo y footer en flujo.
- Añadida variante visual `footer--dark` para adaptar el footer a fondos claros.
- Añadido indicador de scroll con flechas animadas en `Section1.vue`.
- Añadido segundo mensaje superpuesto en el título de `Section2.vue`, sincronizado con el swap de vídeos.
- Añadida lista de textos mobile independiente en `Section5.vue`, sincronizada con la lista desktop.
- Añadidos sources responsive en `Section6.vue` para servir vídeo mobile o desktop según viewport.

### Changed

- Versión del proyecto actualizada a `0.3.0`.
- Optimizados los vídeos de `public/media/videos/`, reduciendo el peso de los MP4 usados en la landing.
- `App.vue`
  - Mantiene `smoothTouch: 0.1` para unificar el comportamiento de ScrollSmoother y ScrollTrigger en touch/tablet.
  - Sincroniza el estado oscuro/claro de todos los footers con la transición del fondo blanco global.
  - Renderiza footer fijo en desktop y footer no fijo en mobile.
- `src/assets/main.css`
  - Ajustada la escala tipográfica responsive para mejorar encaje en mobile, tablet y desktop.
  - Ajustado `text-title-xxs` con tracking específico.
- `Footer.vue`
  - Reorganizado el layout para mobile con columnas, centrado de textos y espaciados más compactos.
  - Añadida comprobación defensiva antes de inicializar la animación GSAP del enlace del sitio.
- `Section1.vue`
  - Convertido el hero a layout responsive con título centrado en mobile/tablet y alineado izquierdo en desktop.
  - Ajustada la imagen de fondo para ocupar viewport completo y reposicionarse por breakpoint.
  - Simplificada la animación de entrada del título para evitar rotaciones que penalizaban el responsive.
  - Ajustados tamaño y letter-spacing del subtítulo por breakpoint.
- `Section2.vue`
  - Reorganizado el grid en mobile/tablet con dos filas y ajustes de escala/altura de vídeos.
  - Añadida transición entre los dos bloques de texto durante la animación principal.
- `Section3.vue` y `Section4.vue`
  - Ajustados spans, tamaños, uppercase y centrado para mejorar el comportamiento responsive.
- `Section5.vue`
  - Reducido el mínimo de la imagen central de `300px` a `275px`.
  - Reducido el gap mínimo entre imágenes.
  - Sincronizados textos desktop y mobile por índice durante toda la secuencia GSAP.
  - Añadido layout mobile en columna con altura reservada para el texto y ajustes específicos para viewports estrechos.
- `Section6.vue`
  - Reemplazado `src` único por `<source>` responsive.
  - Eliminado el ratio fijo en mobile para que el vídeo se adapte mejor.
- `Section7.vue`
  - Ajustados grid, padding, tamaños de título/subtítulo y campos para mobile.
  - Añadido hover claro al botón de envío.
  - Ajustado tamaño de labels y checks en viewports pequeños.
- `README.md`
  - Actualizada la versión, el stack, la estructura de vídeos y la documentación de los cambios responsive, footer, media y secciones.

## [0.2.0] - 2026-05-17

### Added

- Añadido `Footer.vue` con información corporativa, enlace de privacidad y LinkedIn.
- Añadidos assets de Section5:
  - `dyresel-cumplimiento.png`
  - `dyresel-asesoramiento.png`
  - `dyresel-soluciones.png`
  - `dyresel-experiencia.png`
- Añadido fondo global `.landing-dot-bg` fuera de `#smooth-wrapper`.
- Añadida sección de contacto `Section7.vue` con formulario EmailJS, estados de éxito/error, checkboxes de consentimiento y honeypot.

### Animations

- `App.vue`
  - Añadida animación ScrollTrigger scrub del punto blanco global.
  - El punto parte desde el bottom fuera del viewport, sube hasta el centro y escala de `2%` a `150%`.
  - El punto queda como fondo blanco fijo para el resto de la landing.
  - Añadido estado reducido para `prefers-reduced-motion`.
  - Añadido cambio de color del header cuando el fondo pasa a claro.

- `Header.vue`
  - Los paths SVG del logotipo cambian de blanco a `#24333b` sobre fondo claro.
  - El CTA cambia a fondo `#24333b`, texto blanco y hover claro con texto oscuro.

- `Section5.vue`
  - Añadida animación principal de imágenes con pin, scrub y GSAP Flip.
  - La imagen 1 inicia en center.
  - La imagen 2 sube por el slot derecho y pasa a center mientras la imagen 1 pasa a left.
  - La imagen 3 sube por el slot derecho y entra a center en el siguiente Flip.
  - La imagen 4 sube por el slot derecho y entra a center en el último Flip.
  - Las imágenes laterales activas quedan en opacidad `0.5`.
  - La imagen central activa queda en opacidad `1`.
  - Las imágenes que salen de la secuencia pasan a opacidad `0`.
  - Añadida sincronización de `text__list`: cada `li` hace fade-in cuando su imagen asociada entra al centro y el texto anterior hace fade-out.
  - Añadidos resets de Flip para evitar deformaciones al hacer scroll inverso y volver a avanzar.

### Changed

- `Section5.vue`
  - Sustituido el grid Tailwind fijo de imágenes por un layout CSS interno con variables proporcionales.
  - A `1920x1080`, la imagen central mide `562x808px`.
  - A `1920x1080`, las imágenes laterales miden `185x248px`.
  - El responsive escala las cajas proporcionalmente hasta tablet horizontal, manteniendo medidas estables para GSAP Flip.

- `README.md`
  - Actualizada la estructura del proyecto.
  - Documentado el funcionamiento de Header, Section3, Section5, Section7 y Footer.
  - Documentadas las fórmulas responsive de Section5.

### Version

- Versión del proyecto actualizada a `0.2.0`.

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
