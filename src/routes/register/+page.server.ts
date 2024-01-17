import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { registerSchema } from '$lib/forms/schemas';
import { registerWithEmailAndPassword } from '$lib/server/register';

export const load = (async () => {
	const form = await superValidate(registerSchema);
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, registerSchema);
		const {
			data: { password, email }
		} = form;
        
		const dataToReturn = {
			...form,
			data: { 
                email,
                password : "",
                passwordConfirmation : ""
            }
		};
		console.log('REGISTER: ', { ...dataToReturn });

		if (!form.valid) return fail(400, {dataToReturn});

		const registrationResult = await registerWithEmailAndPassword(email, password);
		if (!registrationResult.valid){
            return setError(dataToReturn, 'email', registrationResult.message)
        }
		// If valid redirect user
		return { dataToReturn };
	}
};
