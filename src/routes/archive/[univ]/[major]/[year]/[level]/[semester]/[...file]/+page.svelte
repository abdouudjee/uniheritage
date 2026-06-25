<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	let { data }: PageProps = $props();
	let items = $derived(data.items);
</script>

{#if items?.length === 0}
	<div class="flex flex-col items-center justify-center py-24 text-center">
		<img src="/utils/icons/folder.svg" alt="" class="size-12 opacity-30 mb-4" />
		<p class="text-gray-400 text-sm">This folder is empty.</p>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 font-sans">
		<div class="max-w-4xl mx-auto px-6 py-12">
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{#each items as item}
					{#if item.type === 'folder'}
						<a
							href={page.url.pathname + '/' + item.name}
							data-sveltekit-preload-data="false"
							class="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-400 hover:shadow-sm transition-all group"
						>
							<img src="/utils/icons/folder.svg" alt="" class="size-10" />
							<p
								class="font-medium text-gray-700 text-center break-all leading-tight group-hover:text-gray-900"
							>
								{item.name}
							</p>
						</a>
					{:else if item.type === 'file'}
						<a
							href={'/reader' + data.webPathPrefix + item.name}
							data-sveltekit-preload-data="false"
							class="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-400 hover:shadow-sm transition-all group"
						>
							<img
								src="/utils/icons/{item.name.split('.').pop()?.toLowerCase() || 'file'}.svg"
								alt=""
								class="size-10"
							/>
							<p
								class="font-medium text-gray-700 text-center break-all leading-tight group-hover:text-gray-900"
							>
								{item.name}
							</p>
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
