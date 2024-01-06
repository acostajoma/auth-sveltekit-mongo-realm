<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { setCookie } from '$lib/cookieUtils';
	import { appStore } from '$lib/appStore';
	import { type App, Credentials } from 'realm-web';
	import { browser } from '$app/environment';

	const TWENTY_MIN_MS = 1200000;
	let app: App | null;
	let interval: undefined | NodeJS.Timeout;

	// Subscribe to the store and update the app variable reactively
	const unsubscribe = appStore.subscribe((value: App) => {
		app = value;
	});

	onMount(async () => {
		if (app && !user) {
			const anonymousUser = Credentials.anonymous();
			await app.logIn(anonymousUser);
			user = app.currentUser;
		}
		if (app && user) {
			await user.refreshAccessToken();
		}
	});

	$: user = app?.currentUser;

	$: if (browser && app && user) {
		user = app?.currentUser;
		const accessToken = user?.accessToken as string;

		setCookie('accessToken', accessToken);
		clearInterval(interval);

		interval = setInterval(async () => {
			await user?.refreshCustomData();
			setCookie('accessToken', accessToken);
		}, TWENTY_MIN_MS);
	}

	// Cleanup interval when component is destroyed
	onDestroy(() => {
		clearInterval(interval);
		unsubscribe(); // Unsubscribe from store when component is destroyed
	});
</script>

<slot />
