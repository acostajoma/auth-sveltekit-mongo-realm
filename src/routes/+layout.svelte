<script lang="ts">
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user';

	let userStore;
	const unsubscribe = user.subscribe((value) => (userStore = value));

	onDestroy(unsubscribe);
</script>

<button type="button" on:click={() => goto('/register')}>Register</button>
<button type="button" on:click={() => goto('/login')}>Login</button>
<slot />
