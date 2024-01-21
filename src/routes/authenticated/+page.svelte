<script lang="ts">
	import { handleAuthRedirect } from 'realm-web';
	import { onMount } from 'svelte';

	onMount(() => handleAuthRedirect());
</script>

<p>Authenticated</p>
