<script>
import { getDatabase, push, ref, set, onValue, get, increment,update, query, equalTo,startAt, orderByKey, orderByValue, orderByChild,limitToLast, DataSnapshot, endAt,  } from "firebase/database";
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
        //http://api.allorigins.win/get?url=
        //http://localhost:8010/proxy/json/
        const res = await fetch("http://ip-api.io/json")
                    .then(res => res.json())
                    .then(parsed => {
                            console.log(parsed)
                            $region = parsed.region_name
                            return parsed.region_name
                        }       
                    )


    }

let arrayifyJson = (_json) => {
        let rows = []
        
        Object.entries(_json).map( (entry)=> {

            //let key = entry[0];
            //let value = entry[1];
            
            if($loggedIn?.id == entry[1] || entry[1] === "public") {
                let nested_obj = {}            

                nested_obj["url"] = entry[0]
                nested_obj["owner"] = entry[1]
                if(entry[1] != "public") {
                    rows.unshift(nested_obj)
                } else {
                    rows.push(nested_obj)
                }
            }
        })

    console.log(rows)
    return rows;
}

// checkLongUrlHash = (_hash) => {
    
// }

// let getLongUrlChilds = (_url) => {
//     const urlHash = sha256(_url)
//     const lurlRef = ref(db,`long_url/${urlHash}`)
    

//     dispatch('msg-shortUrls')
// }

export const createShortUrls = (_url,_private) => {
    const urlHash = sha256(_url)
   
    const surlRef = ref(db,`short_url/`)

    let owner = "None"
    if(_private) {
        owner = $loggedIn.id
    }

    //TODO Add record to firebase longURL
    const newSurlRef = push(surlRef)
    const pushKey = newSurlRef.key
    console.log(newSurlRef.key)
    set(newSurlRef, {
        'main':encodeURI(_url),
        'owner': owner,
        'createdOn': Date.now(),
        'stats': {
            'lifetimeClicks': 0
        }
    }).then(() => {
        
       
            const lurlRef = ref(db,`long_url/${urlHash}`)
            let updateLongUrl = {}
            
            if(_private) {
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
        const surlRef = query(ref(db,'short_url/'),orderByKey(),startAt(_url),endAt(_url+"\uf8ff"))
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

export const getURLs = (_url) => {
    const urlHash = sha256(_url)
    console.log(urlHash)
    const queryRef = query(ref(db,`long_url/`),orderByKey(),equalTo(urlHash))

    onValue(queryRef,snapshot=> {
        if(snapshot.exists()) {
            snapshot.forEach((childSnap)=> {
                if(childSnap.hasChild("surls")) {
                    console.log(childSnap.child("surls").toJSON())
                    console.log(childSnap.hasChild("surls"))
                    dispatch("urlsFound",arrayifyJson(childSnap.child("surls").toJSON()))
                }
            })
        } else {
            console.log("Not Found")
            dispatch("urlsNotFound")
        }
        
        
    })
}

export const getSurlDetails = (_key) => {
    const queryRef = query(ref(db,`short_url/`),orderByKey(),startAt(_key),endAt(_key+"\uf8ff"))

    onValue(queryRef, snapshot => {
        if(snapshot.exists()) {
            snapshot.forEach((childSnap)=> {
                console.log(childSnap.toJSON())
                dispatch("surlDetailsFound",childSnap.toJSON())
            })
        }
    })

}

</script>


<style>

</style>