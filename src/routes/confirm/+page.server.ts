import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { confirmEmailUser } from '$lib/server/register';

export const load = (async ({url}) => {    
    const searchParams = url.searchParams
    const token = searchParams.get('token') || ""
    const tokenId = searchParams.get('tokenId') || ""
    const {valid , message, status} = await confirmEmailUser(token, tokenId);
    
    if ( !valid && status === 409) redirect(303, '/resend-email-confirmation')
    if ( !valid ) error (status || 404 ,{ message });
    else return {message}
}) satisfies PageServerLoad;