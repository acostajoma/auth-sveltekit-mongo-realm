<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;

	$: ({ CarsById } = data);
</script>

{JSON.stringify($CarsById.data?.car)}
