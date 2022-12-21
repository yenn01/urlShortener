<script>
import {surls} from '../stores/surls.js'
    import Link from './Link.svelte';
    import Db from './databases/Db.svelte'
    import {userInput} from '../stores/userInput.js'
    let db

    const handleSuccess = (eventMsg) => {
        notifications.success("Short URLs found",3000)
    }
    
    const addUrl = () => {

        db.createShortUrls(userInput)
    }


</script>
<Db bind:this={db} on:writeSuccessful={handleSuccess}></Db>

<div class="cont-surls" transition:fade>
    {#if $surls!== null} 
        {#each $surls as _surl}
            <Link {_surl}></Link>
        {/each}
        <div class="cont-add">
            <button class="btn_add" on:click|preventDefault={addUrl} >
                Add New
            </button>
        </div>
    {/if}

</div>

<style>


</style>