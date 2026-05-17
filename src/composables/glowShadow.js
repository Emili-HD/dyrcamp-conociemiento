// composables/glowShadow.js
// Reusable glow text-shadow animation with GSAP + SplitText + optional ScrollTrigger
// Usage (Section1.vue):
//   const { init, kill } = glowShadow({
//     selector: '.lighting-text',
//     finalShadow: '0px 0px 30px #D3E2E3',
//     keepFinalShadow: true, // Section1 keeps the glow
//     scroll: false          // play immediately on mount
//   })
//   onMounted(() => init())
//   onUnmounted(() => kill())
//
// Usage (other sections): keepFinalShadow: false, or use scroll triggers to re-play per section.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function glowShadow(options = ({})) {
	if (typeof window === 'undefined') {
		return { init: () => { }, kill: () => { } }
	}

	console.log('[glowShadow] initialized with options:', options);


	const {
		selector = '.lighting-text',
		finalShadow = '0px 0px 10px rgba(211, 226, 227, .3), 0px 0px 30px rgba(211, 226, 227, 1)',
		keepFinalShadow = true,
		scroll = false,
		start = 'top 40%',
		amount = 0.35,
		duration = 1,
		glowShadow = null,
		trigger = null,
	} = options

	let el = null
	const resolveEl = () => {
		if (el) return el
		// allow passing a direct element via options.el
		const maybeEl = (options)?.el
		el = (maybeEl && (maybeEl instanceof HTMLElement ? maybeEl : (maybeEl?.$el instanceof HTMLElement ? maybeEl.$el : null))) || gsap.utils.toArray(selector)
		if (!el && import.meta?.env?.DEV) console.warn(`[glowShadow] element not found for selector: ${selector}`)
		return el
	}

	let triggerEl = null
	const resolveTrigger = () => {
		if (triggerEl) {
			return triggerEl
		}

		const opt = (trigger)
		if (opt instanceof HTMLElement) {
			triggerEl = opt
		}
		else if (typeof opt === 'string') {
			triggerEl = document.querySelector(opt)
		}
		else {
			triggerEl = resolveEl() // fallback: use target element
		}

		if (!triggerEl && import.meta?.env?.DEV) {
			console.warn(`[glowShadow] trigger not found for: ${opt || selector}`
			)
		}
		return triggerEl
	}

	// Prepare values
	const defaultGlow = `0px 0px 10px rgba(211, 226, 227, .3), 0px 0px 30px rgba(211, 226, 227, 1)`

	const initShadowVal = `0px 0px 10px rgba(211, 226, 227, 0), 
						   0px 0px 30px rgba(211, 226, 227, 0)`

	let split = null
	let tl = null
	let st = null

	const playAnim = (targetEl) => {
		// Only clear shadow if we're not keeping the final shadow
		if (!keepFinalShadow) {
			try { targetEl.style.setProperty('text-shadow', 'none', 'important') } catch { }
		} else {
			// For keepFinalShadow, start with a non-important inline value to avoid fighting the final important set
			gsap.set(targetEl, { textShadow: initShadowVal })
		}

		// Reset state each play
		tl?.kill()
		split?.revert()

		split = new SplitText(targetEl, {
			type: 'words,chars',
			wordsClass: 'split-word'
		})

		const charDuration = 0.25
		const charGlow = glowShadow || defaultGlow

		tl = gsap.timeline()
			.set(targetEl, { autoAlpha: 0.2, textShadow: initShadowVal })
			.to(targetEl, { autoAlpha: 1, duration, delay: 0 }, '<-0.35')

		// Phase A: Glow each char in, no yoyo
		tl.fromTo(
			split.chars,
			{ textShadow: initShadowVal },
			{
				textShadow: charGlow,
				duration: charDuration,
				stagger: { amount },
				ease: 'power2.out'
			}
		)
		// Phase B: Transition chars from glow to the requested finalShadow (can be equal or transparent)
		tl.to(
			split.chars,
			{
				textShadow: finalShadow,
				duration: charDuration,
				stagger: { amount },
				ease: 'power2.in'
			},
			'>'
		)
		// Phase C: Land the container to the desired finalShadow (transparent or visible)
		tl.to(targetEl, { textShadow: finalShadow, duration: 0.35, ease: 'power1.out' }, '>-0.05')

		// Pin with !important and clean SplitText
		tl.call(() => {
			try { targetEl.style.setProperty('text-shadow', finalShadow, 'important') }
			catch { }
		}, null, '+=0.01')

		tl.call(() => {
			split?.revert(); split = null;
			try { targetEl.style.setProperty('text-shadow', finalShadow, 'important') }
			catch { }
		}, null, '+=0')

		return tl
	}

	const init = () => {
		// Defer to ensure DOM is rendered
		requestAnimationFrame(() => {
			const target = resolveEl()
			if (!target) return

			if (scroll) {
				st?.kill()
				const trig = resolveTrigger()
				st = ScrollTrigger.create({
					trigger: trig || target,
					start,
					once: true,
					onEnter: () => playAnim(target),
				})
			} else {
				playAnim(target)
			}
		})
	}

	const kill = () => {
		tl?.kill();
		tl = null

		st?.kill();
		st = null

		split?.revert(); split = null
	}

	return { init, kill }
}
