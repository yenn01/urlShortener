<script>
    import Auth from './databases/Auth.svelte'

    import {notifications} from '../stores/notifications.js'
    import {loggedIn} from '../stores/loggedIn'

    const announceError = () => {
        notifications.danger()
    }

    $: $loggedIn, console.log($loggedIn)
</script>

<div class="cont-login">
    {#if $loggedIn === null}
    <Auth
	useRedirect={false}
    let:loginWithGoogle
    on:loginError={announceError}
    >
    <button type="button" class="btn btn-outline-secondary" on:click={ loginWithGoogle()}>
        <img width="15px" style="margin-bottom:3px; margin-right:5px" alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Sign in with Google
    </button> 
    </Auth>
    {:else}
        <div class="">Welcome {$loggedIn.name}!</div>
    {/if}

</div>

<style>

</style>