
<h1 align="center">
    <a href="https://rutynka.io">
	<img width="820" src="public/bar_board_screenshot.png" alt="screenshot">
	</a>
	<br>
</h1>

# Rutynka bar board helper

![npm](https://img.shields.io/npm/v/@rutynka/helper-progress?style=plastic)
![NPM](https://img.shields.io/npm/l/@rutynka/helper-bar-board)

This is a svelte bar board helper for [Rutynka](https://rutynka.io) apps.

## Stand-alone live demo on [Vercel](https://vercel.com)

https://helper-bar-board.vercel.app/

`bb.set({text:"NPM package with Bombay Engineer Group"},3)` in Web Inspector

## Get started

Install the dependencies...

```bash
npx degit rutynka/helper-bar-board#main helper-bar-board
cd helper-bar-board
yarn install
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Import as `Svelte Component` with bindings `this`

<img width="820" src="public/bar_board_screenshot_hello_svelte.png" alt="screenshot">

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
yarn install
yarn add rutynka/helper-bar-board@^0.2.7
yarn dev
http://localhost:8080/
```

```js
<script>
	import BarManager from '@rutynka/helper-bar-board'
	export let name;

	let bb;
	function handleClick() {
		let id = bb.init({settings:{text:'init 🌭 + 🌭 =',color:80,}})
		bb.set({text:'🌭🌭',color:110,},id)
		console.log('click')
	}
</script>

<main>
	<BarManager bind:this={bb}/>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<button on:click={handleClick}>Show bar</button>
</main>
```

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
