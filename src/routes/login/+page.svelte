<script lang="ts">
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { user } from '$lib/stores/user';
	import { loginSchema } from '$lib/forms/schemas';
	import { loginEmailPassword, loginWithGoogle } from '$lib/auth';
	import { getApplication } from '$lib/utils';
	import { User } from 'realm-web';
	import { goto } from '$app/navigation';

	const { form, errors, allErrors, message } = superForm(superValidateSync(loginSchema), {
		SPA: true,
		validationMethod: 'auto',
		validators: loginSchema
	});

	let errorMessage: undefined | string;
	const handleLogin = async () => {
		const app = getApplication();
		const {
			valid,
			user: newUser,
			message
		} = await loginEmailPassword($form.email, $form.password, app);
		if (valid) {
			await user.changeUser(newUser as User);
		} else {
			errorMessage = message;
		}
	};

	const handleGoogleLogin = async () => {
		const newUser = await loginWithGoogle();
		await user.changeUser(newUser as User);
	};

	$: disabled = $allErrors.length > 0; // $form.email.length === 0 || $form.password.length === 0 ||
</script>

<h1>login</h1>
{#if $user.currentUser?.providerType !== 'anon-user'}
	<p>Ya estas loggeado</p>
{:else}
	<form on:submit|preventDefault={handleLogin}>
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

		<button type="submit" {disabled}>Enviar</button>
	</form>

	<button on:click={handleGoogleLogin}>Auth google</button>
	{#if errorMessage}
		<p>{errorMessage}</p>
	{/if}
{/if}
