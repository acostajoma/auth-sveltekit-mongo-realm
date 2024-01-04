<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { app } from '$lib/constants';
	import authenticateAnonym from '$lib/auth/authenthicateAnonym';
	import {} from '$app/stores';

	onMount(async () => {
		if (app.currentUser) {
		} else {
			authenticateAnonym();
		}
	});
</script>

<slot />
