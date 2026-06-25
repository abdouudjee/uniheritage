import type { PageServerLoad } from './$types';
import { list } from '$lib/utils/actions';
export const load: PageServerLoad = async ({ platform, params }) => {
	// 1. Pull the catch-all "file" param alongside your explicit paths
	const { univ, major, year, level, semester } = params;

	const prefix = `${univ}/${major}/${year}/${level}/${semester}/`;

	const items = await list(platform!.env, prefix, '/');
	const materials = items.result.delimitedPrefixes.map((e) => {
		return { name: e.replace(prefix, '').replace('/', ''), type: 'folder' };
	});
	return {
		isFile: false,
		// Dynamically appends the deep folders to the web asset URL prefix
		webPathPrefix: `/${univ}/${major}/${year}/${level}/${semester}}`,
		meta: { univ, major, year, level, semester },
		items: materials
	};
};
