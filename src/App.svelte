<script>
    //Dependencies
    import {Route, router} from 'tinro'; 
    import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";
    import { onMount } from 'svelte';


    //Components
    import Input from './components/Input.svelte';
    import Header from './components/Header.svelte'
    import Toast from './components/utilities/Toast.svelte';
    import Login from './components/Login.svelte'
    import Redirect from './components/utilities/Redirect.svelte';
    import List from './components/List.svelte';

    //Create your own firebase config file at project root folder to be imported
    //import {firebaseConfig} from "../firebaseConfigVercel"

    import {region} from './stores/region'
   
    const fb = __firebase;

    const firebaseConfig = {
        apiKey: fb.env.API_KEY,
        authDomain: fb.env.AUTH_DOMAIN,
        databaseURL: fb.env.DATABASE_URL,
        projectId: fb.env.PROJECT_ID,
        storageBucket: fb.env.STORAGE_BUCKET,
        messagingSenderId: fb.env.MESSAGING_SENDER_ID,
        appId: fb.env.APP_ID,
        measurementId:fb.env.MEASUREMENT_ID
    };

    

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    let y;
</script>

<svelte:head>
    <title>shorter</title>
</svelte:head>
<svelte:window bind:scrollY={y}/>


<main>
    <Route path="/*" firstmatch>    
        <Route path="/">
            <Toast/>
            
            <div class="cont-main">
                
                <div class="cont-body" style="{y > 10 ? "box-shadow: 0px -5px 3px -5px rgba(0,0,0,.6), 0px 5px 3px -5px rgba(0,0,0,.6);": ""}">
                    <Header></Header>
                    <Login/>
                    <Input/>
                </div>
                <div class="cont-list">
                    <List></List>
                </div>
            </div>
        </Route>
        <Route path="/:redirect" let:meta>
            <Redirect redirect={meta.params.redirect}></Redirect>
        </Route>
    </Route>
    
        


	
</main>

<style>
    :root {
        --bg-color:  rgb(250,250,250);
        --bg-highlight: rgb(240,240,240);
        --bg-theme: #d3eced;
        --theme-default: #91EAE4;
        
    }

    :global(body) {
        background: var(--bg-color);
        padding: 0px;
    }

	main {
		text-align: center;
        padding: 0.1rem;
		max-width: 400px;
        min-height: 50vh;
		margin: 0 auto;
        font-family: monospace;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: 800px;
            padding: 0px 2rem;
		}
	}

    .cont-main {
        
    }

    .cont-body {
        display:flex;
        position:sticky;
        top: 0;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background-color: var(--bg-color);
        transition: 0.1s ease-in-out
    }
</style>