import { json } from '@sveltejs/kit';
import fs from 'node:fs';
import path from 'node:path';
import type { RequestHandler } from './$types';
import walkAndSearch from '$lib/utils';

export const GET: RequestHandler = ({ url }) => {
	const query = url.searchParams.get('q')?.toLowerCase().trim() || '';

	// Optional matrix parameter filters sent from the front end view controls
	const univFilter = url.searchParams.get('univ')?.toLowerCase().trim() || null;
	const yearFilter = url.searchParams.get('year')?.toLowerCase().trim() || null;

	const baseDir = path.resolve('static/univs');

	if (!fs.existsSync(baseDir) || query.length < 2) {
		return json([]);
	}

	const results = walkAndSearch(baseDir, baseDir, query, univFilter, yearFilter);
	return json(results);
};
