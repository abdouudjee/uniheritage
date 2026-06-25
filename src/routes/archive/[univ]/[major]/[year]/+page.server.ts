import { list } from '$lib/utils/actions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, params }) => {
	const { univ, major, year } = params;

	const prefix = `${univ}/${major}/${year}/`;

	const items = await list(platform!.env, prefix, '/');
	const levels = items.result.delimitedPrefixes.map((e) => e.replace(prefix, '').replace('/', ''));

	return {
		univ,
		major,
		year,
		// Gather all academic level folders (e.g., 'l1', 'm1')
		levels
	};
};
