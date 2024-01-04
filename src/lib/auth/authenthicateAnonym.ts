import { error } from '@sveltejs/kit';
import {app} from '$lib/constants'

const authenticateAnonym = async () => {	
    const anonymCredentials = Realm.Credentials.anonymous();
    try {
        await app.logIn(anonymCredentials);
    } catch (err) {
        throw error(400, 'Ha ocurrido un error');
    }
}

export default authenticateAnonym;