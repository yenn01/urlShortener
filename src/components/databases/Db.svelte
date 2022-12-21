<script>
import { getDatabase, push, ref, set, onValue, get, increment,update, query, equalTo,startAt, orderByKey, orderByValue, orderByChild,limitToLast, DataSnapshot,  } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createEventDispatcher } from 'svelte';
import { sha256 } from 'js-sha256';

import { loggedIn } from "../../stores/loggedIn"
import {region} from "../../stores/region"
    import { onMount } from "svelte";

const dispatch = createEventDispatcher();

const db = getDatabase()
const auth = getAuth();




async function getDetails() {
        const ipURL = "http://ip-api.io/json/"
        //TODO : When development 
        // "run npm install -g local-cors-proxy"
        // "lcp --proxyUrl http://ip-api.io"
        // "Call proxy"
        const res = await fetch("http://localhost:8010/proxy/json/")
                    .then(res => res.json())
                    .then(parsed => {
                            console.log(parsed)
                            $region = parsed.region_name
                            return parsed.region_name
                        }       
                    )
    }

let arrayifyJson = (_json) => {
    let prows = Object.entries(_json).map(function(entry){
            let key = entry[0];
            let value = entry[1];

            let nested_object = value;
            nested_object.key = key;

            return nested_object;
        });
    return prows;
}

// checkLongUrlHash = (_hash) => {
    
// }

// let getLongUrlChilds = (_url) => {
//     const urlHash = sha256(_url)
//     const lurlRef = ref(db,`long_url/${urlHash}`)
    

//     dispatch('msg-shortUrls')
// }

export const createShortUrls = (_url) => {
    const urlHash = sha256(_url)
   
    const surlRef = ref(db,`short_url/`)

    //TODO Add record to firebase longURL
    const newSurlRef = push(surlRef)
    const pushKey = newSurlRef.key
    console.log(newSurlRef.key)
    set(newSurlRef, {
        'main':encodeURI(_url),
        'owner': $loggedIn === null ? "None" : $loggedIn.id,
        'createdOn': Date.now(),
        'stats': {
            'lifetimeClicks': 0
        }
    }).then(() => {
        
       
            const lurlRef = ref(db,`long_url/${urlHash}`)
            let updateLongUrl = {}
            
            if($loggedIn) {
                let updateUserStat = {}
                const userRef = ref(db,`user/${$loggedIn.id}`)
                updateUserStat[`/stats/numberOfPrivateLinks`] = increment(1)
                update(userRef,updateUserStat)
                updateLongUrl[`/surls/${pushKey}`] = $loggedIn.id
            } else {
                updateLongUrl[`/surls/${pushKey}`] = "public"
            }
            updateLongUrl[`main`] = encodeURI(_url)
            update(lurlRef,updateLongUrl)

            console.log(db)
            
            dispatch('writeSuccessful')
        


        
    })
    // .catch((error) => {
    //      dispatch('writeFail')
    //      alert(error)
    //  })

}

export const redirectUrl = async (_url) => {
    console.log(_url);
    await getDetails().then(() => {
        let clickedRef = "";
        const surlRef = query(ref(db,'short_url/'),orderByKey(),startAt(_url))
        get(surlRef).then( snapshot => {
            if(snapshot.hasChildren()) {
                snapshot.forEach(childSS => {
                    const mainUrl = childSS.child("main").val()
                    clickedRef = childSS.key
                    console.log(mainUrl)
                    dispatch("redirectionFound",mainUrl)
                })
                if(clickedRef !== "") {
                        console.log(clickedRef)
                        const statRef = ref(db,`short_url/${clickedRef}`)
                        const clickRef = ref(db,`short_url/${clickedRef}/clicks`)
                        const pushClick = push(clickRef)
                        set(pushClick, {
                            'geolocation':$region,
                            'device':navigator.userAgent,
                            'timestamp': Date.now(),                
                        }).then(()=> {
                            let updates = {}                
                            updates[`/stats/lifetimeClicks`] = increment(1)
                            update(statRef,updates)
                        })            
                    }
            } else {
                dispatch("redirectionNotFound")
            }
        })
    })

}

</script>


<style>

</style>