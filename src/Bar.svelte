<script>
	import Board from './Board.svelte'
	import Timer from  './Timer.svelte'
	export let settingsJSON;
	export let config;
	
	let configDefault = {text:'',start_timer:false,progress:-1,progress_max:100,img:false}
	let s = {...configDefault}
	
	$: if (settingsJSON) {
		let parsedSetting = JSON.parse(settingsJSON)
			s = Object.assign({}, s, parsedSetting);
			// console.log('refresh each sec when timer running', s)
			config = JSON.stringify(s)
	}

</script>

<bb-helper>
	{#if s.text}
		<div style="background-color:hsla({s.color},68%, 67%,1)" class="bar bar-display bar-sticky bar-full">
			<div class="board-counter score {s.correct > 0 || s.wrong > 0 ? '' : 'hidden'}">
				<span class="correct-counter {s.correct > 0 ? '' : 'hidden'}" >{s.correct}</span>
				<span class="wrong-counter {s.wrong > 0 ? '' : 'hidden'}" >{s.wrong}</span>
			</div>
			<div class="{s.position > 0 ? 'pos' : 'hidden'}">{s.position}</div>
			{#if s.img}<img class="avatar" alt="avatar" src="{s.img}">{/if}
			<Board bind:question={s.text} />
			<Timer bind:timer={s.timer} bind:timer_visible={s.timer_visible} bind:start_timer={s.start_timer}/>
		</div>
		{#if s.progress !== -1}
			<progress class="bar-progress {s.progress !== -1 ? '' : 'hidden'}"value="{s.progress}" max="{s.progress_max}"></progress>
		{/if}
		{#if s.progress === -1 && s.progress_max === 'undefined'}
			<progress class="bar-progress" max="100"></progress>

		{/if}
	{/if}
</bb-helper>

<style>
	.avatar {max-height:24px;padding-right: 10px;margin-top:-5px;}
	:root {
		--bb-color:64;
	}
	::-moz-progress-bar {
  		background-color: hsla(120,90%, 30%,1);
	}
	::-webkit-progress-bar {
  		background-color: hsla(120,90%, 30%,1);
	}
	.bar {
		text-align:center;
		font-size: 2em;
		font-family: monospace;
		background-color: hsla(var(--bb-color),68%, 67%,1);
		padding: 10px 5px 10px 0;
		z-index:5;
		box-shadow: 0 4px 18px #444;
		max-height: 34px;
	}
	.bar-display {
		display: flex;
		justify-content: center;
	}
	.bar-sticky {
		z-index:2;
		padding-left:5px
	}
	progress {
		width:99.8%;
		height: 5px;
    	vertical-align: 5px;
		block-size:5px;
	}
	.pos {color:white; width:3vw;}
	.hidden {display:none;}
	span:nth-of-type(1) {
		color: hsl(120, 90%, 40%);
	}
	span:nth-of-type(2) {
		color: hsl(0, 90%, 40%);
	}

	span {
		display: inline-block;
		cursor:pointer;
	}

	@media only screen and (max-width: 480px) {
		.pos {color:white; width:5vw;}
	}
</style>