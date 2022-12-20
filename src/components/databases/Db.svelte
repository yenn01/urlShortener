<script>
import { getDatabase, push, ref, set, onValue, get, increment,update, query, equalTo,startAfter, orderByKey, orderByValue, orderByChild,limitToLast,  } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createEventDispatcher } from 'svelte';
import { sha256 } from 'js-sha256';

import { loggedIn } from "../../stores/loggedIn"

const dispatch = createEventDispatcher();

const db = getDatabase()
const auth = getAuth();

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
    const lurlRef = ref(db,`long_url/${urlHash}`)
    const surlRef = ref(db,`short_url/`)


    const newSurlRef = push(surlRef)
    set(newSurlRef, {
        'main':encodeURI(_url),
        'owner': $loggedIn === null ? "None" : $loggedIn.id,
        'createdOn': Date.now(),
        'stats': {
            'lifetimeClicks': 0
        }
    }).then(() => {
        
        if($loggedIn) {
            const userRef = ref(db,`user/${$loggedIn.id}`)
            let updates = {}
            updates[`/stats/numberOfPrivateLinks`] = increment(1)
            console.log(updates)
            console.log(db)
            update(userRef,updates)
            dispatch('writeSuccessful')
        }
        
    })
    // .catch((error) => {
    //     dispatch('writeFail')
    //     alert(error)
    // })

}

</script>


<style>

</style>