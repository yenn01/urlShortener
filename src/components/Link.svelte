
<script>

import { fade, fly } from 'svelte/transition';

let hostname = window.location.origin

export let _surl;

</script>

<div class="cont-surl" transition:fly>
     <h4>{hostname}/{_surl.url}</h4>
</div>

<style>

    .cont-surl {
        padding:1rem;
        background-color: var(--bg-highlight);
        margin: 1rem 0;
        border-radius: 10px;
    }

</style>