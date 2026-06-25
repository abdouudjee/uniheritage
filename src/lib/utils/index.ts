import fs from 'node:fs';
import path from 'node:path';

type Match = {
	name: string;
	univ: string;
	major: string;
	year: string;
	level: string;
	semester: string;
	remainingPath: string;
	archiveUrl: string;
	isFolder: boolean;
	matchType: string;
};

export default function walkAndSearch(
	dir: string,
	baseDir: string,
	query: string,
	univFilter: string | null,
	yearFilter: string | null
): Match[] {
	const keywords = query
		.toLowerCase()
		.split(/\s+/)
		.filter((w) => w.length > 0);

	const matches: Match[] = [];

	function walk(currentDir: string) {
		const items = fs.readdirSync(currentDir, { withFileTypes: true });

		for (const item of items) {
			if (item.name.startsWith('.')) continue;

			const fullPath = path.join(currentDir, item.name);
			const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
			const segments = relativePath.split('/');

			if (item.isDirectory()) {
				walk(fullPath);
			}

			if (segments.length < 6) continue;

			const univ = segments[0];
			const major = segments[1];
			const year = segments[2];
			const level = segments[3];
			const semester = segments[4];
			const remainingPath = segments.slice(5).join('/');

			if (univFilter && univ.toLowerCase() !== univFilter) continue;
			if (yearFilter && year.toLowerCase() !== yearFilter) continue;

			const targetText =
				`${univ} ${major} ${year} ${level} ${semester} ${remainingPath} ${item.name}`
					.replace(/[-/]/g, ' ')
					.toLowerCase();

			const isMatch = keywords.every((kw) => targetText.includes(kw));
			if (!isMatch) continue;

			// Strip everything after the match point
			// Walk segments and find the first one that contains a keyword
			const allSegments = [univ, major, year, level, semester, ...segments.slice(5)];
			const fullText = allSegments.join('/').replace(/[-]/g, ' ').toLowerCase();

			// Find the position of the last keyword match in the string
			let lastMatchEnd = 0;
			for (const kw of keywords) {
				const idx = fullText.lastIndexOf(kw);
				if (idx !== -1) {
					lastMatchEnd = Math.max(lastMatchEnd, idx + kw.length);
				}
			}

			// Find which segment that position falls in
			let charCount = 0;
			let matchDepth = allSegments.length;
			for (let i = 0; i < allSegments.length; i++) {
				charCount += allSegments[i].length + 1; // +1 for the "/"
				if (charCount >= lastMatchEnd) {
					matchDepth = i + 1;
					break;
				}
			}
			const trimmedSegments = allSegments.slice(0, matchDepth);
			const archiveUrl = '/archive/' + trimmedSegments.join('/');

			matches.push({
				name: trimmedSegments[trimmedSegments.length - 1],
				univ: trimmedSegments[0] ?? '',
				major: trimmedSegments[1] ?? '',
				year: trimmedSegments[2] ?? '',
				level: trimmedSegments[3] ?? '',
				semester: trimmedSegments[4] ?? '',
				remainingPath: trimmedSegments.slice(5).join('/'),
				archiveUrl,
				isFolder: matchDepth < allSegments.length,
				matchType: matchDepth < allSegments.length ? 'folder' : 'file'
			});
		}
	}

	walk(dir);

	// Deduplicate by archiveUrl
	const seen = new Set<string>();
	return matches.filter((m) => {
		if (seen.has(m.archiveUrl)) return false;
		seen.add(m.archiveUrl);
		return true;
	});
}
