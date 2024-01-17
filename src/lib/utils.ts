import { PUBLIC_APP_ID } from '$env/static/public';
import { App, getApp } from 'realm-web';

import { TWENTY_MINS_IN_MS } from './constants';

export const app = getApp(PUBLIC_APP_ID) || new App(PUBLIC_APP_ID);
export const createInTwentyMinutesTimestamp = () =>
	new Date(new Date().getTime() + TWENTY_MINS_IN_MS);
