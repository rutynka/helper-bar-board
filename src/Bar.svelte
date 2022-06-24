<svelte:options accessors={true} />

<script>
	import Board from './Board.svelte'
	import Timer from  './Timer.svelte'
	export let settingsJSON;
	export let config;
	
	let s = {text:'',set_timer:false,progress:-1,progress_max:100}
	
	$: if (settingsJSON) {
		
		s = Object.assign({}, s, JSON.parse(settingsJSON));
		// console.log('refresh each sec when timer running', s)
		config = JSON.stringify(s)
	}

	console.log('bb helper v0.2.2')
</script>

<bb-helper>
	{#if s.text}
		<div style="background-color:hsla({s.color},68%, 67%,1 " class="bar bar-display bar-sticky bar-full">
			<div class="board-counter score {s.correct > 0 || s.wrong > 0 ? '' : 'hidden'}">
				<span class="correct-counter {s.correct > 0 ? '' : 'hidden'}" >{s.correct}</span>
				<span class="wrong-counter {s.wrong > 0 ? '' : 'hidden'}" >{s.wrong}</span>
			</div>
			<div class="{s.position > 0 ? 'pos' : 'hidden'}">{s.position}</div>
			<Board bind:question={s.text} />
			<Timer bind:timer={s.timer} bind:start_timer={s.set_timer}/>
		</div>
		<progress class="bar-progress {s.progress !== -1 ? '' : 'hidden'}" value="{s.progress}" max="{s.progress_max}"></progress>
	{/if}
</bb-helper>

<style>
	:root {
		--bb-color:64;
	}
	::-moz-progress-bar {
  		background-color: red;
	}
	::-webkit-progress-bar {
  		background-color: orange;
	}
	progress {
		width:99%;
		height: 5px;
    	vertical-align: 5px;
		block-size:5px;
	}
	.bar {
		text-align:center;
		font-size: 1.8rem;
		font-family: monospace;
		background-color: hsla(var(--bb-color),68%, 67%,1);
		padding: 10px 0 10px 0;
		z-index:5;
		box-shadow: 0 4px 18px #444;
		min-height: 34px;
	}
	.bar-display {
		display: flex;
		justify-content: center;
	}
	.bar-full {
		width:100%
	}
	.bar-sticky {
		width: 100%;
		z-index:2;
	}
	.pos {color:white; width:5vw;}
	.hidden {display:none;}
	span:nth-of-type(1) {
		color: hsl(120, 90%, 40%);
	}
	span:nth-of-type(2) {
		color: hsl(0, 90%, 40%);
	}

	span {
		width: 40%;
		display: inline-block;
		cursor:pointer;
	}

	@media only screen and (max-width: 480px) {
		.bar {
			font-size: 20px;
			height: 30px;;
		}
	}
</style>