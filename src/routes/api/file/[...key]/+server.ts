export const GET = async ({ params, platform }) => {
	const key = params.key;
	const object = await platform!.env.univs.get(key);

	if (!object) {
		return new Response('No file found', { status: 404 });
	}

	const headers = new Headers();

	headers.set('etag', object.httpEtag);

	const contentType = object.httpMetadata?.contentType;
	if (contentType) {
		headers.set('content-type', contentType);
	}

	return new Response(object.body, { headers });
};
