<template>
    <section
        ref="sectionRef"
        class="section section-5"
    >
        <div
            ref="wrapperRef"
            class="section__wrapper col-span-full"
        >
            <div
                ref="imagesRef"
                class="images relative self-center"
            >
                <div
                    ref="leftSlotRef"
                    class="image__slot image__slot--left relative flex flex-col justify-start"
                >

                </div>
                <div
                    ref="centerSlotRef"
                    class="image__slot image__slot--center flex flex-col justify-end"
                >
                    <div
                        ref="centerCardRef"
                        class="image__card"
                    >
                        <div
                            ref="centerImageRef"
                            class="image__center"
                        >
                            <img
                                src="/media/images/dyresel-cumplimiento.png"
                                alt=""
                            >
                        </div>
                    </div>
                </div>
                <div
                    ref="rightSlotRef"
                    class="image__slot image__slot--right relative flex flex-col justify-end"
                >
                    <div
                        ref="desktopTextListRef"
                        class="text__list text__list--desktop absolute top-[10%] hidden md:block"
                    >
                        <ul>
                            <li class="absolute top-0 min-w-52">
                                <h2 class="text-title-m font-medium text-dark leading-none">Total cumplimiento normativo
                                </h2>
                                <p class="font-sans text-base text-dark">Conocemos el marco regulatorio nacional e
                                    internacional, estamos al día de cada actualización y sabemos cómo llevar cada
                                    normativa
                                    a la práctica</p>
                            </li>
                            <li class="absolute top-0 min-w-52 opacity-0">
                                <h2 class="text-title-m font-medium text-dark leading-none">Asesoramiento técnico
                                    especializado</h2>
                                <p class="font-sans text-base text-dark">Analizamos tu caso para ofrecerte la solución
                                    técnica que mejor encaja con tu vehículo y con la normativa</p>
                            </li>
                            <li class="absolute top-0 min-w-52 opacity-0">
                                <h2 class="text-title-m font-medium text-dark leading-none">Soluciones homologadas y
                                    validadas</h2>
                                <p class="font-sans text-base text-dark">Validamos cada producto previamente valorando
                                    sus
                                    prestaciones, compatibilidad y cumplimiento de la regulación vigente.</p>
                            </li>
                            <li class="absolute top-0 min-w-52 opacity-0">
                                <h2 class="text-title-m font-medium text-dark leading-none">Experiencia en cada sector
                                </h2>
                                <p class="font-sans text-base text-dark">Trasladamos a cada tipología de vehículo el
                                    conocimiento especializado que nos dan más de 35 años de experiencia.</p>
                            </li>
                        </ul>
                    </div>
                    <div
                        ref="rightCardRef"
                        class="image__card"
                    >
                        <div
                            ref="rightImageRef"
                            class="image__right"
                        >
                            <img
                                src="/media/images/dyresel-asesoramiento.png"
                                alt=""
                            >
                        </div>
                    </div>
                    <div
                        ref="nextRightCardRef"
                        class="image__card"
                    >
                        <div
                            ref="nextRightImageRef"
                            class="image__right image__right--next"
                        >
                            <img
                                src="/media/images/dyresel-soluciones.png"
                                alt=""
                            >
                        </div>
                    </div>
                    <div
                        ref="finalRightCardRef"
                        class="image__card"
                    >
                        <div
                            ref="finalRightImageRef"
                            class="image__right image__right--final"
                        >
                            <img
                                src="/media/images/dyresel-experiencia.png"
                                alt=""
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref="mobileTextListRef"
                class="text__list text__list--mobile block md:hidden"
            >
                <ul>
                    <li class="absolute top-0 min-w-52">
                        <h2 class="uppercase text-[32px] font-medium text-dark leading-none">Total cumplimiento
                            normativo
                        </h2>
                        <p class="font-sans text-[15px] text-dark">Conocemos el marco regulatorio nacional e
                            internacional, estamos al día de cada actualización y sabemos cómo llevar cada
                            normativa
                            a la práctica</p>
                    </li>
                    <li class="absolute top-0 min-w-52 opacity-0">
                        <h2 class="uppercase text-[32px] font-medium text-dark leading-none">Asesoramiento técnico
                            especializado</h2>
                        <p class="font-sans text-[15px] text-dark">Analizamos tu caso para ofrecerte la solución
                            técnica que mejor encaja con tu vehículo y con la normativa</p>
                    </li>
                    <li class="absolute top-0 min-w-52 opacity-0">
                        <h2 class="uppercase text-[32px] font-medium text-dark leading-none">Soluciones homologadas y
                            validadas</h2>
                        <p class="font-sans text-[15px] text-dark">Validamos cada producto previamente valorando
                            sus
                            prestaciones, compatibilidad y cumplimiento de la regulación vigente.</p>
                    </li>
                    <li class="absolute top-0 min-w-52 opacity-0">
                        <h2 class="uppercase text-[32px] font-medium text-dark leading-none">Experiencia en cada sector
                        </h2>
                        <p class="font-sans text-[15px] text-dark">Trasladamos a cada tipología de vehículo el
                            conocimiento especializado que nos dan más de 35 años de experiencia.</p>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { nextTick, onMounted, onUnmounted, ref } from 'vue'
    import gsap from 'gsap'
    import { Flip } from 'gsap/Flip'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    gsap.registerPlugin(Flip, ScrollTrigger)

    const sectionRef = ref(null)
    const wrapperRef = ref(null)
    const imagesRef = ref(null)
    const leftSlotRef = ref(null)
    const centerSlotRef = ref(null)
    const rightSlotRef = ref(null)
    const centerCardRef = ref(null)
    const rightCardRef = ref(null)
    const nextRightCardRef = ref(null)
    const finalRightCardRef = ref(null)
    const desktopTextListRef = ref(null)
    const mobileTextListRef = ref(null)
    const centerImageRef = ref(null)
    const rightImageRef = ref(null)
    const nextRightImageRef = ref(null)
    const finalRightImageRef = ref(null)

    let ctx

    onMounted(async () => {
        await nextTick()

        const section = sectionRef.value
        const wrapper = wrapperRef.value
        const images = imagesRef.value
        const leftSlot = leftSlotRef.value
        const centerSlot = centerSlotRef.value
        const rightSlot = rightSlotRef.value
        const centerCard = centerCardRef.value
        const rightCard = rightCardRef.value
        const nextRightCard = nextRightCardRef.value
        const finalRightCard = finalRightCardRef.value
        const desktopTextList = desktopTextListRef.value
        const mobileTextList = mobileTextListRef.value
        const centerImage = centerImageRef.value
        const rightImage = rightImageRef.value
        const nextRightImage = nextRightImageRef.value
        const finalRightImage = finalRightImageRef.value

        if (!section || !wrapper || !images || !leftSlot || !centerSlot || !rightSlot || !centerCard || !rightCard || !nextRightCard || !finalRightCard || !desktopTextList || !mobileTextList || !centerImage || !rightImage || !nextRightImage || !finalRightImage) {
            return
        }

        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reduceMotion) {
            gsap.set([centerImage, rightImage, nextRightImage, finalRightImage], { clearProps: 'all' })
            return
        }

        ctx = gsap.context(() => {
            const flipCardProps = 'transform,width,height,max-width,max-height,min-width,min-height,position,top,bottom,left,right'
            const textLists = [desktopTextList, mobileTextList]
            const textItems = Array.from({ length: 4 }, (_, index) => {
                return textLists
                    .map(textList => gsap.utils.toArray('li', textList)[index])
                    .filter(Boolean)
            })
            const allTextItems = textItems.flat()

            gsap.set([centerCard, rightCard, nextRightCard, finalRightCard, centerImage, rightImage, nextRightImage, finalRightImage], {
                willChange: 'transform'
            })

            gsap.set([rightImage, nextRightImage, finalRightImage], {
                y: () => window.innerHeight
            })

            gsap.set(centerImage, {
                autoAlpha: 1
            })

            gsap.set([rightImage, nextRightImage, finalRightImage], {
                autoAlpha: 0.5
            })

            gsap.set(allTextItems, { autoAlpha: 0 })
            gsap.set(textItems[0], { autoAlpha: 1 })

            gsap.set([nextRightCard, finalRightCard], {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%'
            })

            const imageSwapState = Flip.getState([centerCard, rightCard])
            leftSlot.appendChild(centerCard)
            centerSlot.appendChild(rightCard)

            const imageSwapFlip = Flip.from(imageSwapState, {
                absolute: false,
                duration: 1,
                ease: 'none',
                nested: true,
                paused: true,
                prune: true
            })

            let secondSwapFlip = null
            const secondSwapProgress = { value: 0 }

            const setNextRightCardInRightSlot = () => {
                rightSlot.appendChild(nextRightCard)
                gsap.set(nextRightCard, { clearProps: flipCardProps })
                gsap.set(nextRightCard, {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%'
                })
            }

            const setupSecondSwapFlip = () => {
                if (secondSwapFlip) {
                    return
                }

                gsap.set([rightCard, nextRightCard], { clearProps: 'transform,width,height,max-width,max-height,min-width,min-height' })
                gsap.set(centerCard, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%'
                })

                const secondSwapState = Flip.getState([rightCard, nextRightCard])
                leftSlot.appendChild(rightCard)
                centerSlot.appendChild(nextRightCard)
                gsap.set(nextRightCard, { clearProps: 'position,bottom,left,right,width' })

                secondSwapFlip = Flip.from(secondSwapState, {
                    absolute: false,
                    duration: 1,
                    ease: 'none',
                    nested: true,
                    paused: true,
                    prune: true
                })
                secondSwapFlip.progress(secondSwapProgress.value)
            }

            const revertSecondSwapFlip = () => {
                secondSwapFlip?.kill()
                secondSwapFlip = null
                secondSwapProgress.value = 0
                gsap.set([rightCard, nextRightCard], { clearProps: flipCardProps })
                centerSlot.appendChild(rightCard)
                setNextRightCardInRightSlot()
                gsap.set(centerCard, { clearProps: 'position,top,left,right,width' })
            }

            let thirdSwapFlip = null
            const thirdSwapProgress = { value: 0 }

            const setFinalRightCardInRightSlot = () => {
                rightSlot.appendChild(finalRightCard)
                gsap.set(finalRightCard, { clearProps: flipCardProps })
                gsap.set(finalRightCard, {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%'
                })
            }

            const setupThirdSwapFlip = () => {
                if (thirdSwapFlip) {
                    return
                }

                gsap.set([nextRightCard, finalRightCard], { clearProps: 'transform,width,height,max-width,max-height,min-width,min-height' })
                gsap.set(rightCard, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%'
                })

                const thirdSwapState = Flip.getState([nextRightCard, finalRightCard])
                leftSlot.appendChild(nextRightCard)
                centerSlot.appendChild(finalRightCard)
                gsap.set(finalRightCard, { clearProps: 'position,bottom,left,right,width' })

                thirdSwapFlip = Flip.from(thirdSwapState, {
                    absolute: false,
                    duration: 1,
                    ease: 'none',
                    nested: true,
                    paused: true,
                    prune: true
                })
                thirdSwapFlip.progress(thirdSwapProgress.value)
            }

            const revertThirdSwapFlip = () => {
                thirdSwapFlip?.kill()
                thirdSwapFlip = null
                thirdSwapProgress.value = 0
                gsap.set([nextRightCard, finalRightCard], { clearProps: flipCardProps })
                centerSlot.appendChild(nextRightCard)
                setFinalRightCardInRightSlot()
                gsap.set(rightCard, { clearProps: 'position,top,left,right,width' })
            }

            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: section,
                    start: 'center center',
                    end: () => `+=${window.innerHeight * 4}`,
                    scrub: true,
                    pin: wrapper,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                },
                onComplete: () => {
                    gsap.set([centerCard, rightCard, nextRightCard, finalRightCard, centerImage, rightImage, nextRightImage, finalRightImage], { willChange: 'auto' })
                },
                onReverseComplete: () => {
                    gsap.set([centerCard, rightCard, nextRightCard, finalRightCard, centerImage, rightImage, nextRightImage, finalRightImage], { willChange: 'transform' })
                }
            })

            tl.to(rightImage, {
                y: 0,
                duration: 1.3
            })

            tl.add(imageSwapFlip)
            imageSwapFlip.paused(false)

            tl.to(centerImage, {
                autoAlpha: 0.5,
                duration: 1
            }, '<')

            tl.to(textItems[0], {
                autoAlpha: 0,
                duration: 1
            }, '<')

            tl.to(textItems[1], {
                autoAlpha: 1,
                duration: 1
            }, '<')

            tl.to(rightImage, {
                autoAlpha: 1,
                duration: 1
            }, '<')

            tl.to(nextRightImage, {
                y: 0,
                duration: 1
            }, '<')

            tl.to(nextRightImage, {
                autoAlpha: 0.5,
                duration: 1
            }, '<')

            tl.to(centerImage, {
                autoAlpha: 0,
                duration: 1
            })

            tl.to(textItems[1], {
                autoAlpha: 0,
                duration: 1
            }, '<')

            tl.to(textItems[2], {
                autoAlpha: 1,
                duration: 1
            }, '<')

            tl.to(secondSwapProgress, {
                value: 1,
                duration: 1,
                onUpdate: () => {
                    if (secondSwapProgress.value <= 0.001) {
                        if (secondSwapFlip) {
                            revertSecondSwapFlip()
                        }
                        return
                    }

                    setupSecondSwapFlip()
                    secondSwapFlip?.progress(secondSwapProgress.value)
                },
                onReverseComplete: revertSecondSwapFlip
            }, '<')

            tl.to(rightImage, {
                autoAlpha: 0.5,
                duration: 1
            }, '<')

            tl.to(nextRightImage, {
                autoAlpha: 1,
                duration: 1
            }, '<')

            tl.to(finalRightImage, {
                y: 0,
                duration: 1
            }, '<')

            tl.to(finalRightImage, {
                autoAlpha: 0.5,
                duration: 1
            }, '<')

            tl.to(rightImage, {
                autoAlpha: 0,
                duration: 1
            })

            tl.to(textItems[2], {
                autoAlpha: 0,
                duration: 1
            }, '<')

            tl.to(textItems[3], {
                autoAlpha: 1,
                duration: 1
            }, '<')

            tl.to(thirdSwapProgress, {
                value: 1,
                duration: 1,
                onUpdate: () => {
                    if (thirdSwapProgress.value <= 0.001) {
                        if (thirdSwapFlip) {
                            revertThirdSwapFlip()
                        }
                        return
                    }

                    setupThirdSwapFlip()
                    thirdSwapFlip?.progress(thirdSwapProgress.value)
                },
                onReverseComplete: revertThirdSwapFlip
            }, '<')

            tl.to(nextRightImage, {
                autoAlpha: 0.5,
                duration: 1
            }, '<')

            tl.to(finalRightImage, {
                autoAlpha: 1,
                duration: 1
            }, '<')

            tl.to({}, { duration: 0.4 })
        }, section)

        ScrollTrigger.refresh()
    })

    onUnmounted(() => {
        ctx?.revert()
    })
</script>

<style scoped>

    .section-5 {
        min-height: 100vh;
    }

    .section__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    .images {
        --center-width: clamp(275px, 29.2708vw, 562px);
        --center-height: calc(var(--center-width) * 808 / 562);
        --side-width: calc(var(--center-width) * 185 / 562);
        --side-height: calc(var(--side-width) * 248 / 185);
        --image-gap: clamp(1rem, calc(-0.5rem + 3.125vw), 3.25rem);

        display: grid;
        width: max-content;
        height: var(--center-height);
        grid-template-columns: var(--side-width) var(--center-width) var(--side-width);
        column-gap: var(--image-gap);
        overflow: visible;
    }

    .image__slot {
        min-width: 0;
        min-height: 0;
    }

    .image__slot--left,
    .image__slot--right {
        width: var(--side-width);
        height: var(--center-height);
    }

    .image__slot--center {
        width: var(--center-width);
        height: var(--center-height);
    }

    .image__card,
    .image__center,
    .image__right {
        width: 100%;
        height: 100%;
        transform-origin: bottom center;
    }

    .image__slot--left .image__card,
    .image__slot--right .image__card {
        width: var(--side-width);
        height: var(--side-height);
    }

    .image__slot--center .image__card {
        width: var(--center-width);
        height: var(--center-height);
    }

    .image__center img,
    .image__right img,
    .image__right--next img,
    .image__right--final img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text__list--mobile {
        margin-top: 1.5rem;
        min-height: 11rem;
        position: relative;
        width: min(82vw, 28rem);
    }

    .text__list--mobile ul {
        position: relative;
    }

    @media (max-width: 768px) {
        .section__wrapper {
            align-items: flex-start;
            flex-direction: column;
            display: flex;
            justify-content: flex-start;
            margin-left: 6vw;
        }
    }

    @media (max-width: 520px) {
        .section__wrapper {
            margin-left: 0;
            justify-content: center;
        }

        .images {
            left: 12%;
        }
    }
</style>
