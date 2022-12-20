<script>
    import {Route, router} from 'tinro'; 

    import Input from './components/Input.svelte';
    import Header from './components/Header.svelte'

	
</script>

<svelte:head>
    <title>shorter</title>
</svelte:head>

<main>
    <Header></Header>
	<div class="cont-main">
        <div class="cont-body">
            <div>Login</div>
            <Input/>
        </div>
        <div class="cont-list">
            
        </div>
    </div>
	
</main>

<style>
    :root {
        --theme-default: #91EAE4;
    }

	main {
		text-align: center;
		padding: 0.2rem 2rem;
		max-width: 240px;
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
		}
	}

    .cont-body {
        display:flex;
        justify-content: center;
        flex-direction: column;
    }
</style>