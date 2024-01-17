// import { setSession } from '$houdini';
// import type { Handle } from '@sveltejs/kit';
// import { DEV_API_KEY } from '$env/static/private'
// import { Credentials  } from 'realm-web';
// import { App, getApp } from 'realm-web';
// import { PUBLIC_APP_ID } from '$env/static/public';

// export const handle: Handle = async ({ event , resolve }) => {
//     const token : string | undefined = event.cookies.get('accessToken')
//     let serverToken : string | undefined;
//     if (!token) {
//         const serverCredential = Credentials.apiKey(DEV_API_KEY)
//         const application = getApp(PUBLIC_APP_ID) || new App(PUBLIC_APP_ID);;
//         const  serverUser = await application.logIn(serverCredential)
//         serverToken = await serverUser.accessToken as string
//         console.log(serverToken);
//     }
//     event.locals.accessToken = token
//     event.locals.serverToken = serverToken

//     setSession(event, { user : {token : token || serverToken as string}} )
//     return await resolve(event)
// }
