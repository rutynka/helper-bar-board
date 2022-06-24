<script>
    export let start_timer
    export let timer = 0;
    let interval = {}

    $: start_timer ? start() : stop()
    function stop() {
        clearInterval(interval);
    }
    function start() {
        timer = 0
        stop()
        interval = setInterval(() => {
            timer++
        }, 1000);
    }

</script>
<div class="counter counter-options">
    {#if timer !== 0}
        <span data-timer={timer} class="timer">{timer} s</span>
    {/if}
</div>


<style>
    .counter {
        position: absolute;
        right: 0;
    }
    .counter-options {
        color: white;
        z-index: 5;
        padding: 0 10px;
    }
    @media only screen and (max-width: 480px) {
        .counter-options {
            font-size: 20px;
            top: 0;
        }
    }
</style>