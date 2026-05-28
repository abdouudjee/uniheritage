import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dataRegistry } from '$lib/data';
export const load: PageServerLoad = async ({ params }) => {
    const { univ, major, level,semester } = params;
    const registryKey = `${univ}/${major}`;
    const loadModule = dataRegistry[registryKey];
    if (!loadModule) {
        throw error(404, `The data for ${major} at university ${univ} does not exist.`);
    }

    let subjects;
    try {
        subjects = await loadModule();
    }
    catch (err) {
        throw error(500, "this major doesn't exist")
    }
    const data = subjects.data?.[level]?.[semester];
    if (!data) {
        throw error(404, `Academic year "${level}" not found for ${major}.`);
    }
    return {
        data: data
    }

};