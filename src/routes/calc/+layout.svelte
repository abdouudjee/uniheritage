<script>
	let { children } = $props();
</script>

<div class="h-10 flex items-center bg-gray-50 px-4">
	<a href="/" class="font-medium text-gray-900 hover:text-gray-600 transition text-lg">
		Heritage
	</a>
</div>
{@render children()}
