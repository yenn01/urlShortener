
<script>
    import { setPersistence, browserSessionPersistence } from 'firebase/auth';
    import { getAuth, onAuthStateChanged, signInWithRedirect, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
    import 'firebase/compat/auth';
    import { loggedIn } from '../../stores/loggedIn.js'
    import { createEventDispatcher } from 'svelte';
    const auth = getAuth();
    const dispatch = createEventDispatcher()
    //setPersistence(auth,browserSessionPersistence)
       
    // Firebase user
    let user = auth.currentUser
  
    // expose property on the component that we can use
    // to choose if we want use popup or redirect
    export let useRedirect = false;
  
    // small mapper function
    const userMapper = claims => ({
      id: claims.user_id,
      name: claims.name,
      email: claims.email,
      picture: claims.picture
    });
    
    export const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        if (useRedirect) {
            return signInWithRedirect(auth, provider);
        } else {
            return signInWithPopup(auth, provider).catch((error)=>{
                if(error.code === 'auth/popup-closed-by-user') {
                    dispatch('loginError',{
                        'text': "Pop-up was closed without login in, please try to login again."
                    })
                } else if (error.code === 'auth/popup-blocked') {
                    dispatch('loginError',{
                        'text': "Pop-up was blocked, please turn off pop up blocker and try again."
                    })
                }
            })
        }
    };
  
    export const logout = () => {
        loggedIn.set(null)
        auth.signOut();
    }
  
    // will be fired every time auth state changes
    auth.onAuthStateChanged(async fireUser => {
      if (fireUser) {
        // in here you might want to do some further actions
        // such as loading more data, etc.
  
        // if you want to set custom claims such as roles on a user
        // this is how to get them because they will be present
        // on the token.claims object
        const token = await fireUser.getIdTokenResult();
        user = userMapper(token.claims);
      } else {
        user = null;
      }
      loggedIn.set(user)
    });
  
    // reactive helper variable
    
  </script>
  
  <!-- we will expose all required methods and properties on our slot -->
  <div>
    <slot {user} {loggedIn} {loginWithGoogle} {logout} />
  </div>