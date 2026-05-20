<template>
    <Navigation />
    <div
        ref="dotBgRef"
        class="landing-dot-bg"
        aria-hidden="true"
    ></div>
    <svg
        class="text__filters"
        aria-hidden="true"
    >
        <defs>
            <filter
                id="wiggle"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    ref="turb"
                    type="fractalNoise"
                    baseFrequency="0.001 0.09"
                    numOctaves="1"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap
                    ref="disp"
                    in="SourceGraphic"
                    in2="noise"
                    scale="20"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
        </defs>
    </svg>
    <div id="smooth-wrapper">
        <div id="smooth-content">
            <main id="planes">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
            </main>
            <Footer
                :fixed="false"
                class="footer--dark md:hidden"
            />
        </div>
    </div>
    <Footer class="hidden md:block" />
</template>

<script setup>
    import Navigation from './components/Header.vue';
    import Section1 from './components/Section1.vue';
    import Section2 from './components/Section2.vue';
    import Section3 from './components/Section3.vue';
    import Section4 from './components/Section4.vue';
    import Section5 from './components/Section5.vue';
    import Section6 from './components/Section6.vue';
    import Section7 from './components/Section7.vue';
    import Footer from './components/Footer.vue';

    import { onMounted, onUnmounted, ref } from 'vue'
    import gsap from 'gsap';
    import { ScrollSmoother } from 'gsap/ScrollSmoother';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    let filterTl
    let dotCtx
    const turb = ref(null)
    const disp = ref(null)
    const dotBgRef = ref(null)

    onMounted(() => {
        let smoother = ScrollSmoother.create({
            smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true, // looks for data-speed and data-lag attributes on elements
            smoothTouch: 0.1, // keep a tiny smoothing layer on touch/tablet so pinned ScrollTriggers use the same scroll model
        });

        document.querySelector(".header__cta a").addEventListener("click", e => {
            e.preventDefault();
            smoother.scrollTo(".section-7", true, "center center");
        });

        const turbEl = ((document.querySelector('#wiggle feTurbulence')))
        const dispEl = ((document.querySelector('#wiggle feDisplacementMap')))

        // Fallback por si el querySelector falla (según el DOM actual no debería, pero dejamos ambas vías)
        const turbNode = turbEl || ((turb?.value))
        const dispNode = dispEl || ((disp?.value))

        if (turbNode && dispNode) {
            // Timeline con yoyo para evitar salto entre repeticiones
            filterTl = gsap.timeline({
                repeat: -1,
                yoyo: true,
                repeatDelay: 0,
                defaults: { duration: 12, ease: 'sine.inOut' }
            })

            // 1) No bajamos la turbulencia hasta 0: Safari cambia mucho el render cuando colapsa el noise.
            filterTl.to(turbNode, { attr: { baseFrequency: '0.004 0.045', numOctaves: 1 } }, 0)

            // 2) En paralelo, modula la fuerza del desplazamiento para un efecto más orgánico
            filterTl.to(dispNode, { attr: { scale: 18 } }, 0)
        }

        const dotBg = dotBgRef.value
        const section3 = document.querySelector('.section-3')
        const header = document.querySelector('.header')
        const headerLogoPaths = gsap.utils.toArray('.header .logotip path, .header .imagotip path')
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const footers = gsap.utils.toArray('.footer')
        const setFooterDark = (isDark) => {
            footers.forEach(footer => {
                footer.classList.toggle('footer--dark', isDark)
            })
        }

        if (!dotBg || !section3) {
            return
        }

        dotCtx = gsap.context(() => {
            const dotInitialScale = 0.02
            const getDotStartY = () => (window.innerHeight * 0.5) + ((dotBg.offsetHeight * dotInitialScale) * 0.5)

            gsap.set(dotBg, {
                xPercent: -50,
                yPercent: -50,
                y: getDotStartY,
                scale: dotInitialScale,
                autoAlpha: 1,
                transformOrigin: 'center center',
                willChange: 'transform, opacity'
            })

            gsap.set(headerLogoPaths, { fill: '#fff' })
            header?.classList.remove('header--light-bg')

            if (reduceMotion) {
                ScrollTrigger.create({
                    trigger: section3,
                    start: 'top center',
                    onEnter: () => {
                        gsap.set(dotBg, { y: 0, scale: 1.5, autoAlpha: 1, willChange: 'auto' })
                        gsap.set(headerLogoPaths, { fill: '#24333b' })
                        header?.classList.add('header--light-bg')
                        setFooterDark(true)
                    },
                    onEnterBack: () => {
                        gsap.set(dotBg, { y: 0, scale: 1.5, autoAlpha: 1, willChange: 'auto' })
                        gsap.set(headerLogoPaths, { fill: '#24333b' })
                        header?.classList.add('header--light-bg')
                        setFooterDark(true)
                    },
                    onLeaveBack: () => {
                        gsap.set(dotBg, { y: getDotStartY, scale: dotInitialScale, autoAlpha: 1, willChange: 'transform, opacity' })
                        gsap.set(headerLogoPaths, { fill: '#fff' })
                        header?.classList.remove('header--light-bg')
                        setFooterDark(false)
                    },
                })
                return
            }

            const dotTl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section3,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                    invalidateOnRefresh: true,
                    onUpdate: () => {
                        if (dotTl.time() >= 2) {
                            header?.classList.add('header--light-bg')
                            setFooterDark(true)
                        } else {
                            header?.classList.remove('header--light-bg')
                            setFooterDark(false)
                        }
                    }
                },
                onComplete: () => {
                    gsap.set(dotBg, { willChange: 'auto' })
                },
                onReverseComplete: () => {
                    gsap.set(dotBg, { willChange: 'transform, opacity' })
                }
            })

            dotTl.to(dotBg, {
                y: 0,
                duration: 1
            })

            dotTl.to(dotBg, {
                scale: 1.5,
                duration: 1
            })

            dotTl.to(headerLogoPaths, {
                fill: '#24333b',
                duration: 0.01
            })
        }, dotBg)
    })

    onUnmounted(() => {
        dotCtx?.revert()
        filterTl?.kill()
    })
</script>

<style>
    #smooth-wrapper {
        position: relative;
        z-index: 1;
    }

    .landing-dot-bg {
        background: var(--color-light);
        border-radius: 9999px;
        height: 100vmax;
        left: 50%;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        top: 50%;
        width: 100vmax;
        z-index: 0;
    }

    .text__filters {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: visible;
        pointer-events: none;
    }

    /* oculto pero en DOM */
    .plane-title {
        display: inline-block;
        margin: -0.22em -0.28em;
        padding: 0.22em 0.28em;
        line-height: 1;
        overflow: visible;
        -webkit-filter: url("#wiggle");
        filter: url(#wiggle);
    }
</style>
