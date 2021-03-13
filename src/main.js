import App from './Bar.svelte';

const bb = new App({
	// target: document.body,
	target: document.body.getElementsByTagName('main')[0],
	// anchor: document.body.firstChild,
	anchor: document.getElementById('userContent'),
	props: {
	}
});

export default bb;