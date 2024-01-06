
import { setSession } from '$houdini';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event , resolve }) => {
    const token = event.cookies.get('accessToken') || ""
    setSession(event, { user : {token}} )
    
    return await resolve(event)
}
