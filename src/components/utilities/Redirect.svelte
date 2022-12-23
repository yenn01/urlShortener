<script>
    export let redirect = "/";
    let db;
    import { onMount } from 'svelte';
    import {Route, router} from 'tinro'; 
    import Db from '../databases/Db.svelte';

    onMount(async() => {

            console.log(redirect)
            if(redirect !== "/") {
                if(redirect?.length > 10 ) {
                    db.redirectUrl(redirect)
                } else {
                    notFound = true;
                }
            }
        

    
    })

    const handle404 = () => {
        notFound = true;
    }

    $: notFound = false;
//     const successPos = (pos) => {
//         const crd = pos.coords;

// console.log('Your current position is:');
// console.log(`Latitude : ${crd.latitude}`);
// console.log(`Longitude: ${crd.longitude}`);
// console.log(`More or less ${crd.accuracy} meters.`);
//     }



    const beginRedirect = (eventMsg) => {

        let url = eventMsg.detail
        // navigator.geolocation.getCurrentPosition(successPos);
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + eventMsg.detail;
        }
        window.location.href= url;
    }

    
</script>
<Db bind:this={db} on:redirectionFound={beginRedirect} on:redirectionNotFound={handle404}></Db>
{#if notFound}
    <h1>Error 404</h1>
    <div>This link does not exist </div>
    <div>Click <a href="/">here</a> to return to shorter</div>
{:else}
    <div>Redirecting... Please wait</div>
{/if}





<style>

</style>