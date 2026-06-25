import { list } from '$lib/utils/actions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, params }) => {
	const { univ } = params;
	const prefix = `${univ}/`;

	const items = await list(platform!.env, prefix, '/');
	const majors = items.result.delimitedPrefixes.map((e) => e.replace(prefix, '').replace('/', ''));

	return {
		univ,
		// Gather all directory names inside the university folder (these are the majors)
		majors
	};
};
