import { PUBLIC_APP_ID } from '$env/static/public';
import { type NumericRange } from '@sveltejs/kit';
import { App, getApp, MongoDBRealmError } from 'realm-web';

export async function registerWithEmailAndPassword(
	email: string,
	password: string
): Promise<{ valid: boolean; message: string }> {
	const app = getApp(PUBLIC_APP_ID) || new App(PUBLIC_APP_ID);
	try {
		await app.emailPasswordAuth.registerUser({ email, password });
		return { valid: true, message: 'Usuario registrado. Verifica tú correo.' };
	} catch (error) {
		// Error al comunicarse con MongoDB
		if (error instanceof MongoDBRealmError && error.errorCode === 'AccountNameInUse') {
			return { valid: false, message: 'El correo ya está en uso.' };
		} 
		return { valid: false, message: 'Ha ocurrido un error al intentar registrar el usuario' };
		
	}
}

/**
 * Confirm an Email User with the token and tokenId provided by te realm web sdk and mongodb
 * @param token Provided by the registerUser function
 * @param tokenId Provided by the registerUser function
 * @returns Promise<{ valid: boolean; message: string}>
 */
export async function confirmEmailUser(
	token: string,
	tokenId: string
): Promise<{ valid: boolean; message: string; status? : NumericRange<400, 599> }> {
	const app = getApp(PUBLIC_APP_ID) || new App(PUBLIC_APP_ID);

	if (!token && !tokenId) return  {valid: false, message : "No podemos procesar su solicitud en este momento. Por favor, asegúrese de que todos los pasos previos se hayan completado correctamente.", status : 400}

	try {
		await app.emailPasswordAuth.confirmUser({ token, tokenId });
		return { valid: true, message: 'Usuario verficado.' } 
	} catch (error) {
		let confirmationOutput = {valid : false,  status : 404 as NumericRange<400, 599> , message : 'Ha ocurrido un error al confirmar el usuario.'}
		
		if (error instanceof MongoDBRealmError && error.errorCode === 'UserpassTokenInvalid') {
			confirmationOutput = { ...confirmationOutput, message : 'El token de autenticación está expirado o es inválido.', status : 409}
		} 

		return confirmationOutput;
	}
}


/**
 * Resend an Email Confirmation message
 * @param email
 * @returns Promise<{ valid: boolean; message: string}>
 */
export async function resendEmailConfirmationMessage(email:string) : Promise<{ valid: boolean; message: string; status? : NumericRange<400, 599> }> {
	const app = getApp(PUBLIC_APP_ID) || new App(PUBLIC_APP_ID);
	try {
		await app.emailPasswordAuth.resendConfirmationEmail({email})
		return {valid : true , message : "Email de confirmación reenviado"}
	} catch (error) {		
		let confirmationOutput = {valid : false,  status : 404 as NumericRange<400, 599> , message : 'Ha ocurrido un error al confirmar el usuario.'}
		if (error instanceof MongoDBRealmError){
			if (error.errorCode === 'UserNotFound'){
				confirmationOutput = {...confirmationOutput, message : 'No existe ningun registro con ese email.'}
			}
			else if (error.errorCode === 'UserAlreadyConfirmed'){
				confirmationOutput = {...confirmationOutput, message : 'El usuario ya ha sido confirmado', status : 400}
			}
		}

		return confirmationOutput
		
	}
}