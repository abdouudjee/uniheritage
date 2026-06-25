import { list } from '$lib/utils/actions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, params }) => {
	const { univ, major, year, level, semester, file } = params;
	const prefix = `${univ}/${major}/${year}/${level}/${semester}/${file}/`;

	const items = await list(platform!.env, prefix, '/');
	const folders = items.result.delimitedPrefixes.map((e) => {
		return { name: e.replace(prefix, '').replace('/', ''), type: 'folder' };
	});
	const files = items.result.objects
		.map((e) => {
			return {
				name: e.key.replace(prefix, '').replace('/', 'replaceValue') ?? '',
				type: 'file'
			};
		})
		.filter((item) => item.name);

	return {
		isFile: false,
		// Dynamically appends the deep folders to the web asset URL prefix
		webPathPrefix: `/${univ}/${major}/${year}/${level}/${semester}/${file ? file + '/' : ''}`,
		meta: { univ, major, year, level, semester, file },
		items: [...folders, ...files]
	};
};
