/**
 * Escapes plain text and turns line breaks into real <br> tags
 * so animated DOM transforms (like SplitText) preserve the layout.
 *
 * @param {string | null | undefined} text
 * @returns {string}
 */
export function formatMultilineText(text) {
	if (!text) {
		return ''
	}

	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
		.replace(/\n/g, '<br />')
}
