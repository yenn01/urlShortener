<script>
    import Auth from './databases/Auth.svelte'

    import {notifications} from '../stores/notifications.js'
    import {loggedIn} from '../stores/loggedIn'

    const announceError = () => {
        notifications.danger()
    }

    $: $loggedIn, console.log($loggedIn)
</script>
<div class="holder-login">
    <Auth
	useRedirect={false}
    let:loginWithGoogle
    let:logout
    on:loginError={announceError}
    >
{#if $loggedIn === null}
<div class="cont-login">
   
    
    <button type="button" class="btn-google" on:click={ loginWithGoogle()}>
        <img width="15px" style="margin-right: 0.5rem;" alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Sign in with Google
    </button> 
    <small>Login to make your URLs private!</small>
    
   
        

</div>
{:else}
<div class="cont-logged">
    <div class="cont-userImg">
        <img class="userImg" src={$loggedIn.picture}>
    </div>
    <div class="">Welcome {$loggedIn.name}!</div>
    <button class="btn-logout" on:click={logout()}>Logout</button>
    
</div>


{/if}
</Auth>
</div>
<style>

    .cont-login {
        padding:2rem;
        flex-direction: column;
        display: flex;
        align-items: center;
    }

    .cont-logged {
        padding:1rem 1rem 0.5rem 1rem;
        background-color: var(--bg-highlight);
        border-radius: 10px;
    }

    .userImg {
        width:5rem;
        border-radius: 50%;
    }

    .btn-google {
        display:flex;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
    }

    .btn-logout {
        margin-top:1rem;
        border-radius:10%;
    }

</style>