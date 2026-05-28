import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ url }) => {
    const { pathname } = url;
    const currentPath = `${pathname}/s1`
    throw redirect(307, currentPath);
}
