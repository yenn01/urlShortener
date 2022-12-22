<script>
import {surls} from '../stores/surls.js'
import {notifications} from '../stores/notifications.js'
import {userInput} from '../stores/userInput.js'
import {loggedIn} from '../stores/loggedIn'

import { fade, fly } from 'svelte/transition';
import Toggle from "svelte-toggle";

import {validInput} from '../stores/validInput'

    import Link from './Link.svelte';
    import Db from './databases/Db.svelte'
    

    let db

    const handleSuccess = (eventMsg) => {
        notifications.success("Short URLs found",3000)
    }
    
    const addUrl = () => {

        db.createShortUrls($userInput, toggled)
    }

    let toggled = false

$: if($loggedIn == null) {toggled = false}
</script>
<Db bind:this={db} on:writeSuccessful={handleSuccess}></Db>

<div class="cont-surls" transition:fade>
    {#if !($surls === null || $surls === "")} 
        {#each $surls as _surl}
            <Link {_surl}></Link>
        {/each}

    {:else if $surls === ""}
        <h4 transition:fade>No links exist :&#40;</h4>
        
    {/if}
    {#if $validInput == true && ($surls === "" || $surls !== null)}
    <div class="cont-add" transition:fly>
            
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