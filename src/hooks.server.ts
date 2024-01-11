
import { setSession } from '$houdini';
import type { Handle } from '@sveltejs/kit';
import { DEV_API_KEY } from '$env/static/private'
import { Credentials  } from 'realm-web';
import {newRealmApp, getRealmApp} from '$lib/realmApp';

export const handle: Handle = async ({ event , resolve }) => {
    const token : string | undefined = event.cookies.get('accessToken')
    let serverToken : string | undefined; 
    if (!token) {
        const serverCredential = Credentials.apiKey(DEV_API_KEY)
        let application = getRealmApp;
        if(!application) application = newRealmApp 
        const  serverUser = await application.logIn(serverCredential) 
        serverToken = await serverUser.accessToken as string
    }
    event.locals.accessToken = token
    event.locals.serverToken = serverToken
    
    setSession(event, { user : {token : token || serverToken as string}} )    
    return await resolve(event)
}
