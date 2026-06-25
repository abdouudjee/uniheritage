<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 font-sans p-4">
	<div class="text-center">
		<h1 class="text-9xl font-extrabold text-gray-300">
			{page.status}
		</h1>

		<h2 class="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Page not found</h2>

		<p class="mt-4 text-base text-gray-500 max-w-md mx-auto">
			The page you are looking for doesn't exist.
		</p>

		<div class="mt-8">
			<a
				href="/"
				class="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
			>
				Go back home
			</a>
		</div>
	</div>
</div>
