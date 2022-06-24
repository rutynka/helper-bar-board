<script>
    import { fly } from 'svelte/transition';
    export let question = '';
    let visible = false;
    // function anime() {
    //     let el = document.getElementById('board')
    //     if (el) {
    //         el.classList.add('board--fade');
    //         console.log('color transparent')
    //         setTimeout(()=>{
    //             document.getElementById('board').classList.remove('board--fade');
    //         }, 25000);
    //
    //     }
    // }
    $: question = (() => {
        visible = true
        return question
    })()
</script>

{#if visible}
    <span id="board" class="board--text" in:fly="{{ y: 200, duration: 2000 }}">{@html question}</span>
{/if}

<style>
    .board--text {color:#222;display:block;flex-grow:2}
    @media only screen and (max-width: 480px) {

    }
</style>