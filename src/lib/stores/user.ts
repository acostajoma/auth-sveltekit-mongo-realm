import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';

import { getApplication } from '$lib/utils';
import { initializeAuth, loginAnonymous } from '$lib/auth';
import type { User } from 'realm-web';

async function createUser() {
    let unsubscribeFunction = () => {}
    let currentUser : null | User = null;

    if(!browser) {
        writable({currentUser , unsubscribeFunction});
    }
    else{
        const app = getApplication();
        currentUser = app.currentUser || await loginAnonymous(app);
        unsubscribeFunction = initializeAuth(app, currentUser as User)
    }

	const { subscribe, set } = writable({currentUser, unsubscribeFunction}, () => {
        return unsubscribeFunction()
    });
    
	return {
		subscribe,
		set,
        changeUser : async (newUser : User) => {
            if (!browser) return;
            const store  = get(user)
            
            if (store) {
                store.unsubscribeFunction()
            }
            const app = getApplication();

            const unsubscribeFunction = initializeAuth(app, newUser)
            return set({currentUser : newUser , unsubscribeFunction})
        }
	};
}

export const user  = await createUser();
