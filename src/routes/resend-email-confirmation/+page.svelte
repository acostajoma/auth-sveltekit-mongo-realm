<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { emailSchema } from '$lib/forms/schemas';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		validationMethod: 'auto',
		validators: emailSchema
	});
</script>

<h1>El token de autenticación está expirado o es inválido.</h1>
<form method="POST" use:enhance>
	<label for="email"
		>Para recibir otro correo con un nuevo token de autenticación. Digite su correo:</label
	>
	<input
		type="email"
		name="email"
		id="email"
		bind:value={$form.email}
		aria-invalid={$errors.email ? 'true' : undefined}
	/>
	{#if $errors.email}
		<span>{$errors.email}</span>
	{/if}
	<button type="submit">Recibir otro codigo</button>
</form>

<SuperDebug data={$form} />
