import type { PageServerLoad } from './$types';
import { dataRegistry } from '$lib/data';
export const load: PageServerLoad = async ({ params }) => {
    const { univ } = params;
    const keys = Object.keys(dataRegistry);
    const lowerUniv = univ.toLowerCase();

    // Filter keys that match "univ/" and grab the major part
    const majors = keys
        .filter(key => key.startsWith(`${lowerUniv}/`))
        .map(key => key.split('/')[1]);
    return {
        data: majors
    }
};