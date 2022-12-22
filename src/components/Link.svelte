
<script>
  import Db from './databases/Db.svelte'
import { fade, fly } from 'svelte/transition';
    import { notifications } from '../stores/notifications';
    import Modal from './utilities/Modal.svelte'

let hostname = window.location.origin
let db;
let open = false;

export let _surl;

let url = hostname + "/" +_surl.url.slice(0,14)
let stats;
const getLinkStats = () => {
    db.getSurlDetails(_surl.url.slice(0,14))
}

const handleSuccess = (eventMsg) => {
    stats = eventMsg.detail
    open = true;
}

</script>
<Db bind:this={db} on:surlDetailsFound={handleSuccess}></Db>
{#if open}
	<Modal on:close="{() => open = false}">
        <h2 slot="header">
			{stats.main}
		</h2>
        <div class="">Number of clicks : {stats.stats.lifetimeClicks}</div>
	</Modal>
{/if}

<div class="cont-surl" transition:fly style="{_surl.owner !== "public" ? "background-color:#d3eced": ""}">
     <h4>{url}</h4>
     {#if _surl.owner !== "public"}
        <div class="lbl-private">Private Link</div>
     {/if}
     <button type="button" class="btn-stats" on:click={getLinkStats}>
        Stats
     </button>
     <button type="button" class="btn-copy" on:click={ () => { navigator.clipboard.writeText(url); notifications.success("Copied to clipboard",3000)}} title="Copy to clipboard">
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16" title="Copy to clipboard">
        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
      </svg>
    </button>
</div>

<style>

    .cont-surl {
        display:flex;
        padding:1rem;
        background-color: var(--bg-highlight);
        margin: 1rem 0;
        border-radius: 10px;
        justify-content: space-between;
    align-items: center;

    }

    .btn-copy {
        all: unset;
        cursor: pointer;
        color: gray;
    }

    .btn-copy:hover {
        color:darkslategrey;
    }

    .lbl-private {
        font-weight:800;
    }


</style>