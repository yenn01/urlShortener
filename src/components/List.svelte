<script>
import {surls} from '../stores/surls.js'
import { fade, fly } from 'svelte/transition';
import Toggle from "svelte-toggle";
import {loggedIn} from '../stores/loggedIn'

    import Link from './Link.svelte';
    import Db from './databases/Db.svelte'
    import {userInput} from '../stores/userInput.js'

    let db

    const handleSuccess = (eventMsg) => {
        notifications.success("Short URLs found",3000)
    }
    
    const addUrl = () => {

        db.createShortUrls($userInput)
    }

    let toggled = false

</script>
<Db bind:this={db} on:writeSuccessful={handleSuccess}></Db>

<div class="cont-surls" transition:fade>
    {#if $surls!== null} 
        {#each $surls as _surl}
            <Link {_surl}></Link>
        {/each}
        <div class="cont-add">
            
            <button class="btn-add" on:click|preventDefault={addUrl} >
                Add New
            </button>
            <Toggle on="Private" off="Public"  disabled={$loggedIn === null ? true : false} bind:toggled hideLabel label="Set private or public link" toggledColor="#91EAE4"/>
        </div>
    {/if}

</div>

<style>

.cont-add {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.btn-add {
    font-size: 1.2rem;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 500;
        padding: 0.5rem 1rem;
    margin-bottom: 1rem;
}

.btn-add:hover {
        background-color:var(--theme-default);
        transition: 0.3s ease-in-out;
    }
</style>