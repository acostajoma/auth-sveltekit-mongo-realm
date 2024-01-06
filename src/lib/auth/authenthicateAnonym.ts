import { error } from '@sveltejs/kit';
import {app} from '$lib/realmApp'
import * as Realm from "realm-web";


const authenticateAnonym = async () => {	
    const anonymCredentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(anonymCredentials);
        const accessToken = user.accessToken; 
   
        const response : Response = await fetch('/api/authenticateAnonym', {
            method : 'POST',
            body: JSON.stringify({accessToken}),
            headers: {
                'content-type': 'application/json'
            }
        })

        if ( !response.ok ) {
            throw error(400, 'Ha ocurrido un error');
        }

    } catch (err) {
        throw error(400, 'Ha ocurrido un error');
    }
}

export default authenticateAnonym;