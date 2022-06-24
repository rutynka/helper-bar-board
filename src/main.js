import App from './BarManager.svelte';
let anchor = document.body.firstChild;
if (document.getElementsByTagName('nav').length) {
	anchor = document.getElementsByTagName('nav')[0].nextElementSibling
}
const bb = new App({
	target: document.body,
	// target: document.body.getElementsByTagName('main')[0],
	// anchor: document.getElementById('userContent').firstChild,
	anchor: anchor,
	props: {
	}
});

export default bb;