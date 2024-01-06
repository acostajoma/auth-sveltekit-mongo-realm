<script lang="ts">
	import { brands, models, currentYear, fuels, years } from '$lib/constants/forms';

	let anotherModel = false; // To control the visibility of the text input

	// Selected values
	let selectedBrand = brands[0];
	let selectedModel = models[0];
	let selectedYear = currentYear;
	let selectedFuel = fuels[0];
	let modelText = ''; // For the "Other" model

	// Function to handle selection of "Other" in model
	function handleModelChange() {
		anotherModel = selectedModel === 'Other';
	}
</script>

<!-- <form on:submit|preventDefault={handleSubmit}> -->
<form action="/search?/search" method="POST">
	<label for="brand">Brand:</label>
	<select id="brand" name="brand" bind:value={selectedBrand}>
		{#each brands as brand}
			<option value={brand}>{brand}</option>
		{/each}
	</select>

	<label for="model">Model:</label>
	<select id="model" name="model" bind:value={selectedModel} on:change={handleModelChange}>
		{#each models as model}
			<option value={model}>{model}</option>
		{/each}
	</select>

	{#if anotherModel}
		<input
			type="text"
			name="other-model"
			placeholder="Introduce the model"
			bind:value={modelText}
		/>
	{/if}

	<label for="year">Year:</label>
	<select id="year" name="year" bind:value={selectedYear}>
		{#each years as year}
			<option value={year}>{year}</option>
		{/each}
	</select>

	<label for="fuel">Fuel:</label>
	<select id="fuel" name="fuel" bind:value={selectedFuel}>
		{#each fuels as fuel}
			<option value={fuel}>{fuel}</option>
		{/each}
	</select>

	<button type="submit">Send</button>
</form>
