import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dataRegistry } from '$lib/data';
export const load: PageServerLoad = async ({ params }) => {
	const { univ, major } = params;
	const registryKey = `${univ}/${major}`;
	const loadModule = dataRegistry[registryKey];

	if (!loadModule) {
		throw error(404, `Major configuration not found.`);
	}

	let subjectsModule;
	try {
		subjectsModule = await loadModule();
	} catch {
		throw error(500, `Failed to load data module.`);
	}

	// Get the top-level keys (e.g., ["l1", "l2", "l3-isil", "l3-si", "m1-sym"])
	const rawKeys = Object.keys(subjectsModule.data || {});

	if (rawKeys.length === 0) {
		throw error(404, `No academic years configured for this major.`);
	}

	// Map keys to cleanly separate the base year from any specialties
	const levels = rawKeys.map((key) => {
		const [year, spec] = key.split('-');
		return {
			id: key, // The exact data key (e.g., "l3-isil")
			year: year, // The base year (e.g., "l3")
			spec: spec ?? null // The specialty sub-track if it exists
		};
	});

	return {
		univ,
		major,
		levels
	};
};
