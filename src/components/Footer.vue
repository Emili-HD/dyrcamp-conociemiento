<template>
    <footer
        class="footer fixed bottom-0 inset-x-0 px-16 py-5.25 z-999"
        ref="footerRef"
    >
        <div class="footer__info flex justify-between items-center font-sans text-xs">
            <div class="footer__info-copyright uppercase leading-none text-left">
                Sistemas de iluminación y señalización para vehículos industriales. <a href="tel:+34976126616">T. 976 12
                    66 16</a>
            </div>
            <div class="footer__info-copyright uppercase leading-none text-center">
                Calle la Venta, 31 - 50420 Cadrete (Zaragoza)
            </div>
            <div class="footer__info-social flex justify-end items-center">
                <ul class="flex gap-4 items-center">
                    <li><a
                            class="privacy-link"
                            target="_blank"
                            href="https://dyresel.com/politica-de-privacidad/"
                        >Política de privacidad</a></li>
                    <!-- <li><a
							class="social-link"
							href="#"
						>
							<svg
								viewBox="0 0 72 41"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									class="fill-bg"
									y="0.320312"
									width="72"
									height="40"
									rx="20"
									fill="#D3E2E3"
									fill-opacity="0.1"
								/>
								<rect
									x="0.5"
									y="0.820312"
									width="71"
									height="39"
									rx="19.5"
									stroke="#D3E2E3"
									stroke-opacity="0.2"
								/>
								<path
									class="stroke-line"
									d="M46.5406 14.7403C46.4218 14.2657 46.1799 13.8309 45.8392 13.4797C45.4986 13.1286 45.0713 12.8735 44.6006 12.7403C42.8806 12.3203 36.0006 12.3203 36.0006 12.3203C36.0006 12.3203 29.1206 12.3203 27.4006 12.7803C26.9298 12.9135 26.5025 13.1686 26.1619 13.5197C25.8213 13.8709 25.5794 14.3057 25.4606 14.7803C25.1458 16.5259 24.9918 18.2966 25.0006 20.0703C24.9894 21.8574 25.1433 23.6416 25.4606 25.4003C25.5915 25.8602 25.8389 26.2785 26.1787 26.6148C26.5186 26.9511 26.9394 27.1941 27.4006 27.3203C29.1206 27.7803 36.0006 27.7803 36.0006 27.7803C36.0006 27.7803 42.8806 27.7803 44.6006 27.3203C45.0713 27.1871 45.4986 26.9321 45.8392 26.5809C46.1799 26.2297 46.4218 25.7949 46.5406 25.3203C46.8529 23.5879 47.0069 21.8306 47.0006 20.0703C47.0118 18.2833 46.8578 16.499 46.5406 14.7403Z"
									stroke="#D3E2E3"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									class="stroke-line"
									d="M33.75 23.3408L39.5 20.0708L33.75 16.8008V23.3408Z"
									stroke="#D3E2E3"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</a></li> -->
                    <li><a
                            class="social-link relative -top-px"
                            target="_blank"
                            href="https://www.linkedin.com/company/dyresel-sl/about/"
                        >
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.60001 16H0.279999V5.32H3.60001V16ZM1.94 3.86C0.870002 3.86 0.01 3 0 1.94C0 0.87 0.859998 0.01 1.92 0C2.99 0 3.85 0.86 3.86 1.92C3.86 2.98 3 3.85 1.94 3.86ZM16.02 16H12.71V10.8C12.71 9.56 12.69 7.97 10.98 7.97C9.27001 7.97 8.99001 9.32 8.99001 10.71V16H5.67V5.32H8.85001V6.78H8.90001C9.55001 5.67 10.75 5.01 12.04 5.06C15.4 5.06 16.01 7.27 16.01 10.14V16.01L16.02 16Z"
                                    fill="#D3E2E3"
                                />
                            </svg>
                        </a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    const footerRef = ref(null);

    onMounted(() => {
        const site = footerRef.value.querySelector('.footer__logo-site a');
        gsap.set(site, { letterSpacing: '6em', opacity: 0, position: 'absolute', rotateX: 90 });

        gsap.to(
            site,
            {
                letterSpacing: '0.27em',
                opacity: 1,
                duration: 2,
                rotateX: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: footerRef.value,
                    start: 'top bottom-=200',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse',
                    // markers: true,
                },
            }
        );
    });
</script>
