<script lang="ts">
	import { page } from '$app/state';
</script>

<iframe
	title="reader"
	src={'' + page.url.pathname.replace('/reader', '/api/file')}
	frameborder="0"
	class="w-full h-screen"
></iframe>
