import Cookies from 'js-cookie';
import { App, Credentials } from 'realm-web';
import { createInTwentyMinutesTimestamp } from '$lib/utils';
import { TWENTY_MINS_IN_MS } from '$lib/constants';
import { MongoDBRealmError, User } from 'realm-web';
import { error } from '@sveltejs/kit';
import { getApplication } from '$lib/utils';

/**
 * Sets a cookie with the access token and another one with the provider type if !== from anon-user
 * Finally registers an interval to refresh the accessToken every twenty minutes.
 * @param app : App from realm-web sdk
 * @returns () => clearInterval(resetAccessToken); or undefined
 */
export function initializeAuth(app : App, user : User) : (() => void) {	
	setCookie('accessToken', user.accessToken as string);
	if (user.providerType !== 'anon-user') {setCookie('userAccess', user.providerType as string)}
	const resetAccessToken = setInterval(async () => {
		try {
			await app?.currentUser?.refreshCustomData();
		} catch (error) {
			console.log('Error ocurred');
		}
		setCookie('accessToken', user.accessToken as string);
	}, TWENTY_MINS_IN_MS);
	return () => {
		console.log('destroy');
		
		clearInterval(resetAccessToken)}
}

export function setCookie(name : string , content:string) {
	Cookies.set(name, content, {
		path: '/',
		expires: createInTwentyMinutesTimestamp()
	});
}

export async function loginAnonymous(app : App) {
	const credentials = Credentials.anonymous();
	try {
		const user = await app.logIn(credentials);  
		return user;
	} catch (err) {
		error(400, {message: "Ha ocurrido un error inesperado"})
	}
  }

export async function loginEmailPassword(email : string, password : string, app : App) 
: Promise<{valid : boolean , user : User | null, message?: string }>
{	
	try {
		const credentials = Credentials.emailPassword(email, password);
		const user = await app.logIn(credentials);
		return {valid : true , user};
	} catch (error) {
		let outputError = { valid : false , user : null, message : "Ha ocurrido un error al iniciar sesión"}
		if (error instanceof MongoDBRealmError) {
			if (error.error === "invalid username/password"){
				outputError = { ...outputError, message : "Email o contraseña inválida."}
			} 
			else if (error.error === "confirmation required"){
				outputError = { ...outputError, message : "El usuario no se ha registrado o no ha confirmado su registro."}
			}			
		}
		return outputError

	}
}

export function loginWithGoogle (){
	const app = getApplication();
	const redirectUrl = "http://localhost:5173/authenticated"
	const credentials = Credentials.google({redirectUrl})
	try {
		const user = app.logIn(credentials)
		return user;
	} catch (error) {
		console.log(error);
	}
}
