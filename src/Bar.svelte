<svelte:options accessors={true} />

<script>
	import Board from './Board.svelte'
	import Timer from  './Timer.svelte'
	export let question = ''
	export let reset = false
	export let set_timer = false
	export let wrong_list = []
	export let correct_list = []

	let correct = 0
	let wrong = 0
	export const set_wrong = function(x, y) {
		wrong_list.push([x, y])
		wrong++
	}
	export const set_correct = function(x, y) {
		correct_list.push([x, y])
		correct++
	}
	export const get_timer = function () {
		let t = document.getElementById('boardTimer')
		return t ? parseInt(t.getAttribute('data-timer')) : 0
	}
	export const set_color = function (x) {
		let r = document.querySelector(':root');
		r.style.setProperty('--bb-color', x);
	}

	$: question
	$: correct
	$: wrong
	$: if (reset === true) {
		console.log('reset')
		correct = 0
		wrong = 0
		correct_list = []
		wrong_list = []
		question = ' '
		set_timer = false
		reset = false
	}

	console.log('bb helper v0.1.0')
</script>

<bb-helper id="bb">
	{#if question}
		<div id="bar" class="bar bar--display bar--sticky" data-domain="https://public.local">
			<div id="boardCounters" class="score score--absolute">
				<span id="correctCounter" >{correct}</span>
				<span id="wrongCounter" class="{wrong ? '' : 'visibility'}" >{wrong}</span>
			</div>
			<Board {question} />
			<Timer bind:start_timer={set_timer}/>
			<div id="progressBar" class="bar--progress"></div>
		</div>
	{/if}
</bb-helper>

<style id="bbStyle">
	:root {
		--bb-color:64;
	}
	.bar {
		text-align:center;
		font-size: 28px;
		font-family: monospace;
		background-color: hsla(var(--bb-color),68%, 67%,1);
		padding: 10px 0 10px 0;
		z-index:5;
		box-shadow: 0 4px 18px #444;
		min-height: 34px;
	}
	.bar--display {
		display: flex;
		justify-content: center;
	}
	.score--absolute {
		position:absolute;
		left:0;
		width:170px;
	}
	.bar--sticky {
		position: sticky;
		top: 0;
		width: 100%;
		z-index:2;
	}
	.visibility {
		visibility: hidden;
	}
	span:nth-of-type(1) {
		color:#008a00;
	}
	span:nth-of-type(2) {
		color:indianred;
	}

	span {
		width: 40%;
		display: inline-block;
		cursor:pointer;
	}

	@media only screen and (max-width: 480px) {
		.bar {
			font-size: 20px;
		}
		.score--absolute {
			top: 0;
			width: 30px;
		}
	}
</style>