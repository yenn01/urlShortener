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
    import {firebaseConfig} from "../firebaseConfig"

    import {region} from './stores/region'
   

   
    

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);


</script>

<svelte:head>
    <title>shorter</title>
</svelte:head>

<main>
    <Route path="/*" firstmatch>    
        <Route path="/">
            <Toast/>
            <Header></Header>
            <div class="cont-main">
                <div class="cont-body">
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
        --theme-default: #91EAE4;
        
    }

    :global(body) {
        background: var(--bg-color);
    }

	main {
		text-align: center;

        padding: 0.1rem;
		
		max-width: 400px;
        min-height: 50vh;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
            padding: 0.2rem 2rem;
		}
	}

    .cont-body {
        display:flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>