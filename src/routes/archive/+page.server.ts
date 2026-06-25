import { list } from '$lib/utils/actions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	// top level folders
	const items = await list(platform!.env, undefined, '/');
	const univs = items.result.delimitedPrefixes.map((e) => e.replace('/', ''));
	return {
		univs
	};
};
