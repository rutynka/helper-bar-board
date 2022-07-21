<script>
    import { fade,fly } from 'svelte/transition';
    export let question = '';
    let visible = false;
    $: question = (() => {
        visible = false
        setTimeout(() => {visible = true},200)
        return question
    })()
</script>

{#if visible}
    <span class="board--text" in:fly="{{ y: 200, duration: 1300 }}" out:fade>{@html question}</span>
{/if}

<style>
    .board--text {color:#222;display:block;flex-grow:2}
    @media only screen and (max-width: 480px) {

    }
</style>