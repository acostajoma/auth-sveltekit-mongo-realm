import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request,cookies }) => {
    
    const accessToken = await request.json()
    cookies.set('accessToken', accessToken, {path : "/"})
    return json('Usuario Anonimo registrado');
};