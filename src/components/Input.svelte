<script>
    import { notifications } from '../stores/notifications';
    import Db from './databases/Db.svelte'
    let userInput;
    let db;
    const send = () => {
        db.createShortUrls(userInput)
    }

    const handleSuccess = (eventMsg) => {
        notifications.success("Short URLs found",3000)
    }

</script>
<Db bind:this={db} on:writeSuccessful={handleSuccess}></Db>
<div class="tab-input" transition:fade>
    <h1 class="cont-topic">Input your Long Urls Here!</h1>
    <form>
    <div class="cont-input">
        <input type="text" 
        id="in-longUrl" 
        placeholder="Type here..." bind:value={userInput}>
        
    </div>
    <div class="cont-submit">
        <button class="btn_submit" on:click|preventDefault={send} >
            Submit
        </button>
    </div>
    </form>
</div>

<style>

    .tab-input {
        display: flex;
        justify-content: center;
        width:100%;
        flex-direction: column;
    }

    .cont-input {
        margin-bottom: 1rem;
    }

    input {
        font-size: 1.2rem;
        outline: none;
        border:none;
        width: 90vw;
        text-align: center;
        background-color: var(--bg-color);
        border-bottom: 2px solid darkgrey;
        transition: 0.2s ease-in-out;
    }

    input:hover {
        border-bottom: 2px solid black;
        transition: 0.2s ease-in-out;
    }

    input:focus {
        border-bottom: 2px solid black;
        transition: 0.2s ease-in-out;
    }

    @media (min-width: 640px) {
		input {
			width: 60vw;
		}
	}

    .btn_submit {
        font-size: 1.2rem;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 500;
        padding: 0.5rem 1rem;
    }

    .btn_submit:hover {
        background-color:var(--theme-default);
        transition: 0.3s ease-in-out;
    }

</style>