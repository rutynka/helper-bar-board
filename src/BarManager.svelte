<svelte:options accessors={true} />

<script>
	// a) bb.init({settings:{text:'¯&#92;_(ツ)_/¯',color:77,correct:199,wrong:11,position:10,set_timer:true}})
	// b) bb.set({text:'¯\_(ツ)_/¯',correct:0,wrong:0,position:10,set_timer:true})
	// c) bb.init({mini:true,settings: {text:'¯&#92;_(ツ)_/¯',color:200,correct:399,wrong:11,position:10,set_timer:true}})

	import Bar from './Bar.svelte'
	let mini = 'left'
	let ids = []
	let elements = [
		// { id: 1, pos:1, settings: "{\"text\":\"___RUTYNKA___\",\"color\":\"100\"}" },
		// { id: 2, pos:2, settings: "{\"text\":\"¯&#92;_(ツ)_/¯\",\"color\":\"200\"}" },
		// { id: 3, pos:3, mini:true, settings: "{\"text\":\"test mini\",\"color\":\"150\",\"mini\":true}"},
		// { id: 4, pos:4, mini:true, settings: "{\"text\":\"mini test\",\"color\":\"250\",\"mini\":true}" }
	];
	let configState = [
		// {},{},{},{}
	]
	let correct = 0
	let wrong = 0
	export let wrong_list = []
	export let correct_list = []

	function getFirstFreeID () {
		// let sequence = [...Array(100).keys()]
		let i =0;
		while (true) {
			if (!ids.includes(i)) {
				ids.push(i)
				return i
				break;
			}
			i++;
		}
	}
	//cant pass obj - use string obj instead ;)
	export const set = function(obj,id = 0) {
		if (!elements.length || elements.length < id + 1) {
			return
		}
		elements[id].settings = JSON.stringify(Object.assign(JSON.parse(elements[id].settings),obj))
		elements = elements
	}
	export const init = function(bb) {
		bb.id = getFirstFreeID();
		let settingsPassString = JSON.stringify(bb.settings)
		bb.settings = settingsPassString;
		elements.push(bb)
		configState.push(bb)
		elements = [...elements];
		console.log('add bar data obj', elements)
		return bb.id
	}
	export const get = function(prop = 'text',value = 0) {
		if (!configState.length) {
			console.debug(configState)
			return 'undefined'
		}
		if (prop === 'debug') {
			return configState
		}
		let obj = JSON.parse(configState[value])
		return obj[prop]
	}
	export const del = function(id = 0) {
		ids = ids.filter(el => {return el != id})
		elements = elements.filter(el => { return el.id !== id})
		// @todo - should delete configState by id not all! 
		configState.length = 0
	}
	export const justify_mini = function(value) {
		mini = value;
	}

	export const set_wrong = function(x, y) {
		wrong_list.push([x, y])
		wrong++
	}
	export const set_correct = function(x, y) {
		correct_list.push([x, y])
		correct++
	}
	
</script>
<div class="full-display sticky">
	{#each elements as el (el.id) }
		{#if !el.mini}
			<Bar bind:config={configState[el.id]} bind:settingsJSON={el.settings}/>
		{/if}
	{/each}
</div>
<div class="mini-display sticky" style="justify-content:{mini}">
	{#each elements as el (el.id) }
		{#if el.mini}
			<Bar bind:config={configState[el.id]} bind:settingsJSON={el.settings}/>
		{/if}
	{/each}
</div>
<style>
	.sticky {position: sticky; top:0;}	
	.mini-display {display: flex;flex-wrap: wrap;}
</style>