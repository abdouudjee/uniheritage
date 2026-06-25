import type { PageServerLoad } from './$types';
import { dataRegistry } from '$lib/data';
export const load: PageServerLoad = async () => {
	const keys = Object.keys(dataRegistry);

	// Extract the university part before the "/"
	const univs = keys.map((key) => key.split('/')[0]);
	return {
		data: [...new Set(univs)]
	};
};
