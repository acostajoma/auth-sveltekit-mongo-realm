import { PUBLIC_APP_ID } from '$env/static/public';
import Cookies from 'js-cookie';
import { App, getApp, type User } from 'realm-web';
import { createInTwentyMinutesTimestamp } from '$lib/utils';
import { TWENTY_MINS_IN_MS } from '$lib/constants';

export function initializeAuth() {
	const app = getApp(PUBLIC_APP_ID) || new App(PUBLIC_APP_ID);
	const user = app?.currentUser;
	console.log(app);

	if (user) {
		setAccessToken(user);
		const resetAccessToken = setInterval(async () => {
			await app?.currentUser?.refreshCustomData();
			setAccessToken(user);
		}, TWENTY_MINS_IN_MS);

		return () => clearInterval(resetAccessToken);
	}
	//Else log anonym
}

export function setAccessToken(user: User) {
	Cookies.set('accessToken', user?.accessToken as string, {
		path: '/',
		expires: createInTwentyMinutesTimestamp()
	});
}
