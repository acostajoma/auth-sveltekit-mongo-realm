import { redirect } from '@sveltejs/kit';
import { type Actions } from '@sveltejs/kit';
import { generateQueryParam } from '$lib/queryUtils';

export const actions: Actions = {
    search: async ({request}) => {
        const data = await request.formData()
        const entries = [...data.entries()]
        const queryParams = generateQueryParam(entries)
        redirect(302, `/search/${queryParams}`);
    }
};