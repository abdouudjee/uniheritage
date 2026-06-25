<script>
	let { params } = $props();
</script>

<div class="min-h-screen bg-gray-50 font-sans">
	<div class="max-w-2xl mx-auto px-6 py-16">
		<h1 class="text-4xl font-bold text-gray-900 mb-2">Archive</h1>
		<p class="text-gray-500 mb-10">Choose a semester.</p>

		<div class="flex flex-col gap-3">
			{#each [1, 2] as semester}
				<a
					href="/archive/{params.univ}/{params.major}/{params.year}/{params.level}/s{semester}"
					class="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:border-gray-400 hover:shadow-md transition-all group"
				>
					<span class="text-gray-900 font-medium uppercase">
						s{semester}
					</span>
					<svg
						class="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6" />
					</svg>
				</a>
			{/each}
		</div>
	</div>
</div>
