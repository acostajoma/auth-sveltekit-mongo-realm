import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { emailSchema } from '$lib/forms/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { resendEmailConfirmationMessage } from '$lib/server/register';

export const load = (async () => {
    const form = await superValidate(emailSchema)
    return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default:async ({request}) => {
        const form = await superValidate(request, emailSchema);
        if (!form.valid) return fail(400, {form})
        const { data : {email} } = form;    
        const {valid, message} = await resendEmailConfirmationMessage(email)
        if (!valid) {
            setError(form, 'email', message); 
            return {form}
        }
        else redirect(303,'/') // TODO: Redirect to other page
    }
};