import { list } from '$lib/utils/actions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, params }) => {
	const { univ, major } = params;
	const prefix = `${univ}/${major}/`;

	const items = await list(platform!.env, prefix, '/');
	const years = items.result.delimitedPrefixes.map((e) => e.replace(prefix, '').replace('/', ''));

	return {
		univ,
		major,
		years
	};
};
