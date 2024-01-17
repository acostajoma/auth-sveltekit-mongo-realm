<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { registerSchema } from '$lib/forms/schemas';

	export let data: PageData;

	const { form, errors, enhance, allErrors } = superForm(data.form, {
		validationMethod: 'auto',
		validators: registerSchema
	});

	$: disabled =
		$form.email.length === 0 ||
		$form.password.length === 0 ||
		$form.passwordConfirmation.length === 0 ||
		$allErrors.length > 0;
</script>

<h1>Register</h1>

<form method="POST" use:enhance>
	<label for="email">Email:</label>
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

	<label for="password">Contraseña:</label>
	<input
		type="password"
		name="password"
		id="password"
		bind:value={$form.password}
		aria-invalid={$errors.password ? 'true' : undefined}
	/>
	{#if $errors.password}
		<span>{$errors.password}</span>
	{/if}

	<label for="password">Confirma tu contraseña:</label>
	<input
		type="password"
		name="passwordConfirmation"
		id="passwordConfirmation"
		bind:value={$form.passwordConfirmation}
		aria-invalid={$errors.passwordConfirmation ? 'true' : undefined}
	/>
	{#if $errors.passwordConfirmation}
		<span>{$errors.passwordConfirmation}</span>
	{/if}
	<button type="submit" {disabled}>Enviar</button>
</form>

<SuperDebug data={$form} />

<p>{JSON.stringify($form)}</p>
