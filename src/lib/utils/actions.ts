export async function list(env: Env, prefix: string | undefined, delimiter: string | undefined) {
	const result = await env.univs.list({ prefix, delimiter });
	return {
		result
	};
}
