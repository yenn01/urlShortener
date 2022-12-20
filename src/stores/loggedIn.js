import { writable } from "svelte/store";
import { localStore } from './localStore.js'
export const loggedIn = localStore('firebaseLoggedIn',null);