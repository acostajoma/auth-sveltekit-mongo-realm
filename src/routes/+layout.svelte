<script lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { initializeAuth } from '$lib/auth';

	onMount(() => {
		console.log('mounted');
		const cleanup = initializeAuth();
		return cleanup;
	});
</script>

<button type="button" on:click={() => goto('/register')}>Register</button>
<button type="button" on:click={() => goto('/login')}>Login</button>
<slot />
