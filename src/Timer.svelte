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
{#if start_timer}
    <div class="counter-options">
        {#if timer !== 0}
            <span  class="counter timer" data-timer={timer} >{timer}<span class="mobi"> s</span></span>
        {/if}
    </div>
{/if}


<style>
    .counter-options {
        position: relative;
        padding:0 2vw;
        color: white;
        z-index: 5;
    }
    .counter {
        position: absolute;
        right: 0;
    }
    @media only screen and (max-width: 480px) {
        .counter-options {
            padding:0 4vw;
        }
        .mobi {
            display: none;
        }
        .counter-options {
            font-size: 1em;
            top: 0;
        }
    }
</style>