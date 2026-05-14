<template>
    <section
        ref="sectionRef"
        class="section section-2"
    >
        <div
            ref="wrapperRef"
            class="section__wrapper grid grid-cols-4 lg:grid-cols-12 col-span-full"
        >
            <h2
                ref="titleRef"
                class="section__title col-start-2 col-span-3 text-title-m mt-75 self-start"
            >
                Normativas complejas y cambiantes, exigencias crecientes,
                dudas en decisiones técnicas, riesgos en homologaciones… </h2>
            <div
                ref="videosRef"
                class="videos col-start-5 col-span-8 grid grid-cols-[1.5fr_4fr_1.5fr] gap-5 h-[70vh] self-center px-20"
            >
                <div
                    ref="leftSlotRef"
                    class="video__slot video__slot--left flex flex-col justify-end"
                >
                    <div
                        ref="leftCardRef"
                        class="video__card"
                    >
                        <div
                            ref="leftVideoRef"
                            class="video__left"
                        >
                            <video
                                ref="leftMediaRef"
                                src="/media/videos/comp_02.mp4"
                                muted
                                loop
                                playsinline
                            ></video>
                        </div>
                    </div>
                </div>
                <div
                    ref="centerSlotRef"
                    class="video__slot video__slot--center flex flex-col justify-end"
                >
                    <div
                        ref="centerCardRef"
                        class="video__card"
                    >
                        <div
                            ref="centerVideoRef"
                            class="video__center"
                        >
                            <video
                                ref="centerMediaRef"
                                src="/media/videos/comp_01.mp4"
                                muted
                                loop
                                playsinline
                            ></video>
                        </div>
                    </div>
                </div>
                <div
                    ref="rightSlotRef"
                    class="video__slot video__slot--right flex flex-col justify-end"
                >

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { nextTick, onMounted, onUnmounted, ref } from 'vue'
    import gsap from 'gsap'
    import { Flip } from 'gsap/Flip'
    import { SplitText } from 'gsap/SplitText'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    gsap.registerPlugin(Flip, SplitText, ScrollTrigger)

    const sectionRef = ref(null)
    const wrapperRef = ref(null)
    const titleRef = ref(null)
    const videosRef = ref(null)
    const leftSlotRef = ref(null)
    const centerSlotRef = ref(null)
    const rightSlotRef = ref(null)
    const leftCardRef = ref(null)
    const centerCardRef = ref(null)
    const leftVideoRef = ref(null)
    const centerVideoRef = ref(null)
    const leftMediaRef = ref(null)
    const centerMediaRef = ref(null)

    let ctx
    let titleSplit

    onMounted(async () => {
        await nextTick()

        const section = sectionRef.value
        const wrapper = wrapperRef.value
        const title = titleRef.value
        const videos = videosRef.value
        const leftSlot = leftSlotRef.value
        const centerSlot = centerSlotRef.value
        const rightSlot = rightSlotRef.value
        const leftCard = leftCardRef.value
        const centerCard = centerCardRef.value
        const leftVideo = leftVideoRef.value
        const centerVideo = centerVideoRef.value
        const leftMedia = leftMediaRef.value
        const centerMedia = centerMediaRef.value

        if (!section || !wrapper || !title || !videos || !leftSlot || !centerSlot || !rightSlot || !leftCard || !centerCard || !leftVideo || !centerVideo || !leftMedia || !centerMedia) {
            return
        }

        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reduceMotion) {
            gsap.set(title, { autoAlpha: 1 })
            gsap.set([leftVideo, centerVideo], { clearProps: 'all' })
            return
        }

        ctx = gsap.context(() => {
            let activeMedia = null

            const pauseMedia = (media, reset = false) => {
                try {
                    media.pause()
                    if (reset) {
                        media.currentTime = 0
                    }
                } catch { }
            }

            const playMedia = (media) => {
                if (activeMedia === media && !media.paused) {
                    return
                }

                pauseMedia(leftMedia)
                pauseMedia(centerMedia)
                activeMedia = media

                const play = media.play?.()
                if (play && typeof play.catch === 'function') {
                    play.catch(() => { })
                }
            }

            const resetMedia = () => {
                activeMedia = null
                pauseMedia(leftMedia, true)
                pauseMedia(centerMedia, true)
            }

            const pauseAllMedia = () => {
                activeMedia = null
                pauseMedia(leftMedia)
                pauseMedia(centerMedia)
            }

            gsap.set([leftCard, centerCard, leftVideo, centerVideo], {
                willChange: 'transform'
            })

            titleSplit = new SplitText(title, {
                type: 'words, chars',
                charsClass: 'section__title-char'
            })

            gsap.set(titleSplit.chars, {
                autoAlpha: 0.5
            })

            gsap.to(titleSplit.chars, {
                autoAlpha: 1,
                ease: 'none',
                stagger: {
                    each: 0.015
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    end: 'center center',
                    scrub: true
                }
            })

            gsap.set(leftVideo, {
                y: () => window.innerHeight,
                autoAlpha: 0.3
            })

            gsap.set(centerVideo, {
                y: 0,
                autoAlpha: 1
            })

            const videoSwapState = Flip.getState([leftCard, centerCard])
            centerSlot.appendChild(leftCard)
            rightSlot.appendChild(centerCard)

            const videoSwapFlip = Flip.from(videoSwapState, {
                absolute: false,
                duration: 1,
                ease: 'none',
                nested: true,
                paused: true,
                prune: true
            })

            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section,
                    start: 'center center',
                    end: () => `+=${window.innerHeight * 1.4}`,
                    scrub: true,
                    pin: wrapper,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onEnter: () => playMedia(centerMedia),
                    onEnterBack: () => playMedia(centerMedia),
                    onUpdate: () => {
                        const time = tl.time()

                        if (time < 1.3) {
                            playMedia(centerMedia)
                        } else if (time < 2.3) {
                            pauseAllMedia()
                        } else {
                            playMedia(leftMedia)
                        }
                    }
                },
                onComplete: () => {
                    gsap.set([leftCard, centerCard, leftVideo, centerVideo], { willChange: 'auto' })
                },
                onReverseComplete: () => {
                    gsap.set([leftCard, centerCard, leftVideo, centerVideo], { willChange: 'transform' })
                }
            })

            tl.to(leftVideo, {
                y: 0,
                duration: 1.3
            })

            tl.add(videoSwapFlip)
            videoSwapFlip.paused(false)
            tl.to(leftVideo, { autoAlpha: 1, duration: 1 }, '<')
            tl.to(centerVideo, { autoAlpha: 0.3, duration: 1 }, '<')

            tl.to({}, { duration: 0.4 })

            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                onLeave: resetMedia,
                onLeaveBack: resetMedia
            })
        }, section)

        ScrollTrigger.refresh()
    })

    onUnmounted(() => {
        titleSplit?.revert()
        ctx?.revert()
    })
</script>

<style scoped>
    .section-2 {
        min-height: 100vh;
    }

    .section__wrapper {
        min-height: 100vh;
        align-items: center;
    }

    .videos {
        overflow: visible;
    }

    .video__slot {
        min-width: 0;
        min-height: 0;
    }

    .video__card,
    .video__left,
    .video__center {
        width: 100%;
        aspect-ratio: 562 / 720;
        transform-origin: bottom center;
    }

    .video__left,
    .video__center {
        height: 100%;
    }

    .video__left video,
    .video__center video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
