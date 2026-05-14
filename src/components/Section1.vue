<template>
    <section class="section mb-56">
        <!-- section title -->
        <div class="section__title col-start-1 col-span-7 place-content-center relative z-1 pl-16">
            <h1 class="section__title-h1 text-left leading-[0.9] mb-4">
                <span class="text-title-l align-top font-bold tracking-tight-3">Con conocimiento normativo,<br>no tienes
                    nada que </span>
                <span class="plane-title font-liger text-[4rem] text-secondary">temer</span>
            </h1>
            <p class="lighting-text section__title-p text-title-s font-normal tracking-8">
                La luz siempre gana
            </p>
        </div>

        <!-- section background -->
        <div class="section__image">
            <img
                src="/media/images/dyresel-conocimiento-hero.png"
                alt=""
            >
        </div>

    </section>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue'
    import gsap from 'gsap'
    import glowShadow from '@/composables/glowShadow'

    // Configuramos el efecto glow/shadow del texto "LA LUZ"
    // Usamos el composable glowShadow.js
    // que encapsula toda la lógica y reutilización del efecto
    // Lo iniciamos justo después de que aparezca el primer span
    // en la animación de entrada de la sección
    // y lo paramos al desmontar el componente
    const { init, kill } = glowShadow({
        selector: '.section__title .lighting-text',
        glowShadow: '0px 0px 10px rgba(211, 226, 227, .3), 0px 0px 30px rgba(211, 226, 227, 1), 0px 0px 30px rgba(211, 226, 227, 1)',
        finalShadow: '0px 0px 10px rgba(211, 226, 227, .3), 0px 0px 30px rgba(211, 226, 227, 0.2), 0px 0px 30px rgba(211, 226, 227, 1)',
        keepFinalShadow: true,
        scroll: false
    })

    // Animaciones de entrada de la sección
    // y lógica de popup del video
    let tl
    let detachFullVideo = null
    let isFullVideoOpen = false

    let detachHydrators = null
    let isTinieblasHydrated = false

    onMounted(() => {
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const spans = gsap.utils.toArray('.section__title-h1 span')
        const p = document.querySelector('.section__title-p')

        // Sin animaciones: deja todo visible y lanza el glow directamente
        if (reduceMotion) {
            gsap.set([spans, p], { autoAlpha: 0.4, y: 0 })
            init()
            return
        }

        // Con animaciones: inicializa los elementos ocultos y lanza la línea de tiempo
        // con las animaciones
        const movement = 100

        gsap.set([spans[0]], { autoAlpha: 1, rotateX: -90, y: -1 * movement })
        gsap.set([spans[1]], { autoAlpha: 0, rotateY: 90, x: movement })
        // gsap.set([spans[2]], { autoAlpha: 0, rotateY: -90, x: -1 * movement })
        gsap.set(p, { autoAlpha: 0 })

        tl = gsap.timeline({ defaults: { duration: 1, ease: 'sine.out' } })

        // 1) Aparece el primer span (LA LUZ)
        tl.to(spans[0], { y: 0, rotateX: 0, delay: 0.2 })
            // Justo después, disparamos la animación de glow del composable
            .add(() => init(), '>-0.05')
            // 2) Aparece el segundo span
            .to(spans[1], { autoAlpha: 1, rotateY: 0, x: 0 }, '>-0.75')
            // 3) Aparece el tercer span
            // .to(spans[2], { autoAlpha: 1, rotateY: 0, x: 0 }, '>-0.75')
            // 4) Párrafo y flechas
            .to(p, { autoAlpha: 1 }, '>-0.9')

        // --- Full video overlay controls ---
        const full = document.querySelector('.full__video')
        const playBtn = full?.querySelector('.video__play')
        const closeBtn = full?.querySelector('.full__video-close')
        const videoEl = full?.querySelector('.tinieblas__video')
        const overlayEl = full?.querySelector('.full__video-overlay')
        const headerEl = document.querySelector('.header')

        if (full && playBtn && closeBtn && videoEl) {
            // Evitar coste de red inicial del video hasta que el usuario muestre interes
            try { videoEl.preload = 'none' } catch { }

            // Función para hidratar el video de tinieblas
            // (poner el src en el source y llamar a load())
            // Solo se hace una vez
            function hydrateTinieblas() {
                if (isTinieblasHydrated) { return }
                const srcEl = videoEl.querySelector('source')
                const dataSrc = srcEl?.getAttribute('data-src')
                if (!dataSrc) { return }
                srcEl.setAttribute('src', dataSrc)
                srcEl.removeAttribute('data-src')
                try { videoEl.preload = 'metadata' } catch { }
                try { videoEl.load() } catch { }
                isTinieblasHydrated = true
            }

            // Hidratamos al primer gesto de interes en mobile/desktop
            const onHover = () => { hydrateTinieblas() }
            const onFocus = () => { hydrateTinieblas() }
            const onTouch = () => { hydrateTinieblas() }
            playBtn.addEventListener('mouseenter', onHover, { passive: true })
            playBtn.addEventListener('focusin', onFocus, { passive: true })
            playBtn.addEventListener('touchstart', onTouch, { passive: true })
            detachHydrators = () => {
                playBtn.removeEventListener('mouseenter', onHover)
                playBtn.removeEventListener('focusin', onFocus)
                playBtn.removeEventListener('touchstart', onTouch)
            }

            // Estado inicial: play visible por fade-in; video y close ocultos
            gsap.set(playBtn, { autoAlpha: 0 })
            gsap.to(playBtn, { autoAlpha: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 })
            gsap.set(closeBtn, { autoAlpha: 0 })
            gsap.set(videoEl, { autoAlpha: 0, visibility: 'hidden' })
            gsap.set(overlayEl, { autoAlpha: 0 })

            function openFullVideo() {
                if (isFullVideoOpen) { return }
                isFullVideoOpen = true
                // oculta CTA play
                gsap.to(playBtn, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
                // oscurecer el fondo y ocultar header global (esta fuera de la seccion)
                if (overlayEl) {
                    gsap.to(overlayEl, { autoAlpha: 0.9, duration: 0.3, ease: 'power2.out' })
                }
                if (headerEl) {
                    gsap.to(headerEl, { autoAlpha: 0, duration: 0.2, ease: 'power2.out', onStart: () => { headerEl.style.pointerEvents = 'none' } })
                }
                // muestra video + boton close
                gsap.set(videoEl, { visibility: 'visible' })
                gsap.to(videoEl, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
                gsap.to(closeBtn, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
                // aseguramos que el source exista antes de reproducir
                try { hydrateTinieblas() } catch { }
                try {
                    videoEl.currentTime = 0
                    const p = videoEl.play()
                    if (p && typeof p.catch === 'function') { p.catch(() => { }) }
                } catch { }
            }

            // Cerrar video: oculta video y boton close, muestra play y header
            // y quita el overlay
            function closeFullVideo() {
                if (!isFullVideoOpen) { return }
                isFullVideoOpen = false
                // pausar y ocultar video
                try { videoEl.pause() } catch { }
                gsap.to(videoEl, {
                    autoAlpha: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => gsap.set(videoEl, { visibility: 'hidden' })
                })
                // ocultar boton close
                gsap.to(closeBtn, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' })
                // revertir overlay y header
                if (overlayEl) {
                    gsap.to(overlayEl, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
                }
                if (headerEl) {
                    gsap.to(headerEl, { autoAlpha: 1, duration: 0.25, ease: 'power2.out', onComplete: () => { headerEl.style.pointerEvents = '' } })
                }
                // volver a mostrar CTA play
                gsap.to(playBtn, { autoAlpha: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
            }

            function onKeyDown(e) {
                if (e.key === 'Escape') { closeFullVideo() }
            }

            playBtn.addEventListener('click', openFullVideo)
            closeBtn.addEventListener('click', closeFullVideo)
            document.addEventListener('keydown', onKeyDown)

            detachFullVideo = () => {
                playBtn.removeEventListener('click', openFullVideo)
                closeBtn.removeEventListener('click', closeFullVideo)
                document.removeEventListener('keydown', onKeyDown)
            }
        }
    })

    onUnmounted(() => {
        tl?.kill()
        kill()
        detachFullVideo?.()
        detachHydrators?.()
    })
</script>


<style scoped>

    /* section title */
    /**************************************/

    .section__title-p {
        margin: 0 auto 4.2rem;
    }

    /* section video */
    /**************************************/
    .section__image {
        width: 100%;
        height: 100vh;
        object-fit: cover;
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    /* responsive */
    /**************************************/
    @media (max-width: 768px) {
        .section__title {
            grid-column-start: 1;
            grid-column-end: 5;
        }

        .section__title-h1 span:nth-child(1) {
            font-size: 8rem;
        }

        .section__title-h1 span:nth-child(3) {
            font-size: 3.25rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1366px) and (orientation: portrait) {
        .section__title {
            grid-column-start: 1;
            grid-column-end: 5;
        }
    }
</style>
