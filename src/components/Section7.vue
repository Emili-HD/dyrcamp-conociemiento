<template>
    <section
        ref="sectionEl"
        id="contact"
        class="section section-7 items-start pt-[15%]"
    >
        <div class="section__wrapper col-start-2 col-span-4 leading-none">
            <h2 class="text-title-xl text-dark leading-[1.2] tracking-4 uppercase max-w-[20ch] mb-4">
                Llevamos la iluminación de tu vehículo industrial donde nadie más se atreve.
            </h2>
            <p class="text-subtitle-lg text-dark font-light font-sans leading-[1.2]">Contacta con nosotros y te
                asesoraremos.</p>
        </div>
        <div
            class="form__wrapper col-start-7 col-span-5 py-14 relative"
            :class="{ 'is-idle': status === 'idle', 'is-success': status === 'success', 'is-error': status === 'error' }"
        >
            <form
                id="contact-form"
                ref="formEl"
                class="form w-full"
                @submit.prevent="onSubmit"
            >
                <div class="form__fields flex flex-col gap-y-8 mb-8.5">
                    <input
                        type="hidden"
                        name="_subject"
                        :value="form.subject"
                    />
                    <input
                        type="text"
                        name="user_name"
                        placeholder="Nombre"
                        v-model="form.name"
                        required
                    />
                    <input
                        type="email"
                        name="user_email"
                        placeholder="Email"
                        v-model="form.email"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Mensaje"
                        v-model="form.message"
                        rows="1"
                        required
                    ></textarea>

                    <input
                        type="text"
                        name="_honeypot"
                        tabindex="-1"
                        autocomplete="off"
                        style="position:absolute;left:-9999px;opacity:0"
                        aria-hidden="true"
                    />
                </div>

                <div class="form__accept">
                    <div class="form__accept-checks">
                        <label
                            for="acepto"
                            class="aceptar"
                        >
                            <input
                                type="checkbox"
                                name="privacy_accepted"
                                id="acepto"
                                v-model="form.accepted"
                                required
                            >
                            He leído y acepto la política de privacidad de Dyresel.
                        </label>
                        <label
                            for="comunicaciones"
                            class="aceptar"
                        >
                            <input
                                type="checkbox"
                                name="marketing_opt_in"
                                id="comunicaciones"
                                v-model="form.marketing"
                            >
                            Acepto el envío de comunicaciones comerciales.
                        </label>
                    </div>
                    <button
                        type="submit"
                        class="btn btn--primary text-button-m"
                    >{{ sending ? 'Enviando…' : 'Enviar' }}</button>

                </div>
            </form>

            <div
                v-show="status === 'success'"
                class="form__success text-dark top-1/4 max-w-[65ch]"
                role="status"
                aria-live="polite"
            >
                <h3 class="text-title-m">¡GRACIAS!</h3>
                <p class="text-body-m">Hemos recibido tu solicitud y nos pondremos en contacto contigo lo antes
                    posible.</p>
                <p class="text-body-m"><strong>La luz siempre gana.</strong></p>
                <svg
                    width="250"
                    height="27"
                    viewBox="0 0 250 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M138.68 2.76882C144.268 2.73023 148.461 0.654675 155.274 0.487946C162.085 0.339841 163.176 1.21348 170.932 0.657618C178.694 0.111252 186.519 0.556193 189.963 0.106245C193.412 -0.342791 193.833 0.806766 198.742 0.495797C203.655 0.194024 206.647 0.343509 210.963 0.741151C215.28 1.11302 228.501 1.68084 233.312 1.40825C238.125 1.10218 243.608 2.1511 246.898 2.51229C247.924 2.62401 248.731 2.74839 249.348 2.86646C249.61 2.91652 249.729 2.99816 249.728 3.07217C249.728 3.07221 249.728 3.07226 249.728 3.07231C249.726 3.16446 249.536 3.24474 249.198 3.23818C247.561 3.20632 245.112 3.22885 242.221 3.43374C236.832 3.82722 236.251 3.10369 228.98 3.20754C221.714 3.33654 217.366 3.89724 208.816 3.44849C200.255 3.0386 198.373 4.75478 186.285 4.0363C174.184 3.39259 173.033 5.2583 161.099 6.10913C149.164 6.97308 133.994 7.18964 126.815 7.9637C119.64 8.71359 110.035 9.92204 99.8543 10.9349C89.6675 11.9371 77.2816 14.2825 66.0736 15.6427C54.8549 16.9657 39.0647 19.294 31.7579 20.3774C24.4511 21.4473 22.6694 21.7292 15.7899 23.4064C11.8316 24.3757 6.32572 25.4579 1.58734 26.055C-0.794017 26.3554 -0.352614 25.9154 1.9485 25.2307C5.31579 24.2307 8.17746 23.7589 9.84371 22.9737C13.1826 21.4058 14.6186 20.7726 19.2071 20.3028C23.8028 19.8373 25.6575 18.3585 28.3097 17.958C30.9601 17.577 31.0404 18.1416 44.2807 15.1993C57.5329 12.3023 64.8842 11.0493 69.9455 10.1386C75.0175 9.2257 85.7449 8.22523 94.0414 6.97009C102.332 5.66119 119.338 3.98585 126.162 3.05926C132.988 2.10521 133.086 2.82235 138.68 2.76882Z"
                        fill="#202E33"
                    />
                </svg>
            </div>

            <div
                v-show="status === 'error'"
                class="form__error"
                role="alert"
                aria-live="assertive"
            >
                <h3 class="text-title-m">Ups, algo no ha ido bien.</h3>
                <p class="text-body-m">Por favor, inténtalo de nuevo en unos minutos.</p>
            </div>

        </div>
    </section>
</template>

<script setup>
    import emailjs from '@emailjs/browser';
    import { ref, reactive, onMounted, onUnmounted } from 'vue';

    const sectionEl = ref(null)
    const cleanupFns = []

    const formEl = ref(null)
    const form = reactive({
        subject: 'Contacto desde Landing Tinieblas Conocimiento',  // campo oculto _subject
        name: '',
        email: '',
        message: '',
        accepted: false,
        marketing: false,
    })
    const sending = ref(false)
    const status = ref('idle') // 'idle' | 'success' | 'error'

    const resetTimer = ref(null)

    const scheduleReset = () => {
        if (resetTimer.value) clearTimeout(resetTimer.value)
        resetTimer.value = setTimeout(() => {
            status.value = 'idle'
        }, 4000)
    }

    // EmailJS config — usa variables de entorno Vite/Nuxt
    const serviceId = 'service_8mrwkqn'
    const templateId = 'template_btej1ve'
    const publicKey = 'Zu0oYeVv2iarMPCh4'

    const onSubmit = async () => {
        if (!form.accepted || !formEl.value) return
        sending.value = true
        status.value = 'idle'
        try {
            // O bien inicializas una vez en mounted, o pasas publicKey aquí
            await emailjs.sendForm(serviceId, templateId, formEl.value, { publicKey })
            status.value = 'success'
            scheduleReset()
            // Limpia el formulario
            form.name = ''
            form.email = ''
            form.message = ''
            form.accepted = false
            form.marketing = false
            formEl.value.reset()
        } catch (err) {
            console.error('EmailJS error:', err)
            status.value = 'error'
            scheduleReset()
        } finally {
            sending.value = false
        }
    }

    onMounted(() => {
        if (publicKey) {
            try { emailjs.init({ publicKey }) } catch (_) { }
        }
    });

    onUnmounted(() => {
        if (resetTimer.value) clearTimeout(resetTimer.value)
        cleanupFns.forEach(fn => {
            try { fn() } catch (e) { }
        })
    })
</script>

<style scoped>

    /* form */
    /**************************************/
    .form__fields {

        & input,
        & textarea {
            flex: 1;
            border: 0;
            border-bottom: 1px solid var(--dark-color);
            background-color: transparent;
            color: var(--color-dark);
            position: relative;
            min-height: 2.125rem;
            font-family: var(--font-inter);
        }

        & input::placeholder,
        & textarea::placeholder {
            color: var(--dark-color);
            opacity: 1;
            position: absolute;
            top: 0;
            font-family: var(--font-inter);
            letter-spacing: var(--letter-spacing--3);
        }

        & textarea {
            resize: none;
        }
    }

    .form__accept {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        row-gap: 2rem;
        position: relative;

        & button {
            padding: .75rem 1.5rem;
            background-color: var(--dark-color);
            color: var(--light-color);
            border: 0;
            cursor: pointer;
            font-family: var(--font-inter);
            text-transform: uppercase;
            border-radius: var(--rounded-full);
            height: fit-content;
            transition: color .3s ease, background-color .3s ease;
            opacity: 1;
        }

        & button[disabled] {
            opacity: .6;
            cursor: not-allowed;
        }
    }

    .form__accept-checks {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        & label {
            cursor: pointer;
            font-family: var(--font-inter);
            letter-spacing: var(--letter-spacing--3);
            font-size: var(--text-body-xs);
            display: flex;
            gap: .5rem;
            color: var(--color-dark);

            & input {
                cursor: pointer;
            }
        }
    }



    /* Overlay message layers */
    /**************************************/
    .form__error {
        color: #b91c1c;
    }

    .form__success,
    .form__error {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 1rem;
        text-align: left;
        padding: 0;
        pointer-events: none;
        /* no interacciones */
        opacity: 0;
        transition: opacity .35s ease;
        will-change: opacity;
    }

    /* Crossfade: form vs message */
    .form {
        transition: opacity .35s ease;
        will-change: opacity;
    }

    .is-success .form,
    .is-error .form {
        opacity: 0;
        pointer-events: none;
    }

    .is-idle .form {
        opacity: 1;
        pointer-events: auto;
    }

    .is-success .form__success {
        opacity: 1;
    }

    .is-error .form__error {
        opacity: 1;
    }


    /* Custom checkbox */
    /**************************************/
    input[type=checkbox] {
        appearance: none;
        background-color: transparent;
        margin: 0;
        font: inherit;
        color: currentColor;
        width: 1.35em;
        height: 1.35em;
        border: 1px solid var(--dark-color);
        transform: translateY(-0.1em);
        display: grid;
        place-content: center;

        &:checked {
            position: relative;
        }

        &:checked::after {
            content: '';
            position: absolute;
            top: 0;
            left: 9px;
            width: 4px;
            height: 9px;
            transform: rotate(45deg);
            border-right: 1.5px solid var(--dark-color);
            border-bottom: 1.5px solid var(--dark-color);
            box-shadow: 1px 1px 0 1px var(--light-color), inset -1px -1px 0 1px var(--light-color);
            transition: all 0.3s ease;
            transition-delay: 0.15s;
        }
    }

</style>
