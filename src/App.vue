<template>
    <Navigation />
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
        </div>
    </div>
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

    import { onMounted, onUnmounted, ref } from 'vue'
    import gsap from 'gsap';
    import { ScrollSmoother } from 'gsap/ScrollSmoother';

    gsap.registerPlugin(ScrollSmoother);

    let filterTl
    const turb = ref(null)
    const disp = ref(null)

    onMounted(() => {
        let smoother = ScrollSmoother.create({
            smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true, // looks for data-speed and data-lag attributes on elements
            smoothTouch: false, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
        });

        document.querySelector(".header__cta a").addEventListener("click", e => {
            e.preventDefault();
            smoother.scrollTo(".section-6", true, "center center");
        });

        const turbEl = ((document.querySelector('#wiggle feTurbulence')))
        const dispEl = ((document.querySelector('#wiggle feDisplacementMap')))

        // Fallback por si el querySelector falla (según el DOM actual no debería, pero dejamos ambas vías)
        const turbNode = turbEl || ((turb?.value))
        const dispNode = dispEl || ((disp?.value))

        if (!turbNode || !dispNode) return

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
    })

    onUnmounted(() => {
        filterTl?.kill()
    })
</script>

<style>
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
