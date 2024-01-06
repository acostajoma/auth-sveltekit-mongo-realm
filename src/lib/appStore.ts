import { writable, type Writable } from 'svelte/store';
import { type App } from 'realm-web'
import realmApp from '$lib/realmApp';


export const appStore : Writable<App> = writable(realmApp); 
