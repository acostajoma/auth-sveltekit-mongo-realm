import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$houdini: path.resolve('.', '$houdini')
		}
	},
	preprocess: vitePreprocess()
};
export default config;
