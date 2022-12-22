<script>
    import { notifications } from '../stores/notifications';
    import {surls} from '../stores/surls.js'
    import {userInput} from '../stores/userInput.js'
    import {validInput} from '../stores/validInput.js'
    import Db from './databases/Db.svelte'
    import { fade, fly } from 'svelte/transition';
    import isURL from 'validator/lib/isURL'


    
    let db;
    let showMeta = false;
    let loadingTitle = false;
    $:urlTitle = "Not Found"
    const send = () => {
        if(!$validInput) {
            notifications.danger("Invalid Url", 3000)
            return
        }
        $surls = null
        getTitle()

        db.getURLs($userInput)
    }

    
    
    const handleFound = (eventMsg) => {
        console.log("handled");
        console.log(eventMsg.detail);
 
            $surls = eventMsg.detail
    }

    const handleNotFound = (eventMsg) => {
        console.log("handled");
 
            $surls = ""
    }

    const parseTitle = (body) => {
        let match = body.match(/<title.*>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
        if (!match || typeof match[1] !== 'string')
            throw new Error('Unable to parse the title tag')
        return match[1]
    }

     const getTitle = async () => {
        loadingTitle = true;
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURI($userInput)}`).then((res)=> res.text())
        .then(body =>parseTitle(body))
        .then(title=> {
            console.log(title)
            urlTitle = title
            loadingTitle = false;
            showMeta = true;

        })
    }
    //TODO : Add regex to check for valid link



    $: if($userInput !== null) {$validInput = isURL($userInput)} else if ($userInput === "") {$validInput = false}
    $: $userInput, $surls = null, showMeta = false , loadingTitle=false,urlTitle = "Not Found"
</script>
<Db bind:this={db} on:urlsFound={handleFound} on:urlsNotFound={handleNotFound}></Db>
<div class="tab-input" transition:fade>
    <h2 class="cont-topic">Input your Long Urls Here!</h2>
    <form>
    <div class="cont-input">
        <input type="text" 
        id="in-longUrl" 
        placeholder="Type here..." bind:value={$userInput}>
        
    </div>
    <div class="cont-submit">
        <button class="btn_submit" on:click|preventDefault={send} >
            Check
        </button>
    </div>
    </form>
</div>
<div class="cont-urlMeta">
    {#if showMeta}
        <h2 class="meta" transition:fade>{urlTitle}</h2>

    {:else if loadingTitle}
        <h3>Loading title...</h3>


    {/if}

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
        width: 100%;
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
			width: 100%;
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

    .meta {
        text-decoration: underline;
    }

</style>