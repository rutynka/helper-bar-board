<svelte:options accessors={true}/>

<script>
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

	function getFirstFreeID () {
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
	//cant pass obj - used string obj instead ;)
	export const set = function(obj,id = 0) {
		if (!elements.length || elements.length < id + 1) {
			return
		}
		const merge = Object.assign(JSON.parse(elements[id].settings),obj)
		elements[id].settings = JSON.stringify(merge)
		elements = elements
		const bbChange = new CustomEvent('bbchange', {detail: {id:id, bb:merge}})
		document.body.dispatchEvent(bbChange)
	}
	export const init = function(bb) {
		bb.id = getFirstFreeID();
		let settingsPassString = JSON.stringify(bb.settings)
		bb.settings = settingsPassString;
		elements.splice(bb.id,0,bb)
		configState.splice(bb.id,0,bb)
		elements = [...elements];
		console.log('init bar data obj', elements)
		return bb.id
	}
	export const get = function(prop = 'text',value = 0) {
		if (prop === 'debug' || !configState.length || !configState[value]) {
			console.debug(configState,elements,ids)
			return false
		}
		let obj = JSON.parse(configState[value])
		return obj[prop]
	}
	export const del = function(id = 0) {
		ids = ids.filter(el => {return el !== id})
		elements = elements.filter(el => { return el.id !== id})
		// @todo - should delete configState by id not all! 
		configState.length = 0
	}
	export const delAll = function() {
		elements.length = 0
		configState.length = 0
	}
	export const justify_mini = function(value) {
		mini = value;
	}

	
</script>
<div class="full-wrapper sticky">
	{#each elements as el (el.id) }
		{#if !el.mini}
			<Bar bind:config={configState[el.id]} bind:settingsJSON={el.settings}/>
		{/if}
	{/each}
</div>
<div class="mini-wrapper sticky mini-size" style="justify-content:{mini}">
	{#each elements as el (el.id) }
		{#if el.mini}
			<Bar bind:config={configState[el.id]} bind:settingsJSON={el.settings}/>
		{/if}
	{/each}
</div>
<style>
	.full-wrapper {z-index:5}
	.mini-wrapper {z-index:6}
	.mini-size {font-size: 0.5rem;}
	.sticky {position: sticky; top:0;}	
	.mini-wrapper {display: flex;flex-wrap: wrap;}
</style>