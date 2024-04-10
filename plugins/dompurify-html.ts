import VueDOMPurifyHTML from 'vue-dompurify-html';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueDOMPurifyHTML, {
		default: {
			SAFE_FOR_TEMPLATES: true,
			USE_PROFILES: {
				html: true,
				svg: true,
				mathMl: true
			},
			ADD_TAGS: ['iframe'],
			ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
		},
	});
});
