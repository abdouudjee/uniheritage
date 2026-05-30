<script lang="ts">
  import { goto } from "$app/navigation";

  let searchQuery = $state("");

  function handleSearch(event: Event) {
    event.preventDefault();
    if (searchQuery.trim().length >= 2) {
      goto(`/archive/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }
  let { data } = $props();
  //@ts-ignore
  function getBreadcrumbs(result) {
    const parts = [
      result.univ,
      result.major,
      result.year,
      result.level,
      result.semester,
      ...result.remainingPath.split("/").filter(Boolean),
    ];

    let path = "/archive";

    return parts.map((part) => {
      path += `/${part}`;

      return {
        label: part,
        href: path,
      };
    });
  }
</script>

<div class="min-h-screen bg-gray-50 font-sans">
  <div class="max-w-2xl mx-auto px-6 py-12">
    <form onsubmit={handleSearch} class="mb-8 flex items-center gap-4">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search courses, modules..."
        class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >search</button
      >
    </form>

    {#if data.empty}
      <div class="flex flex-col items-center justify-center py-24 text-center">
        <p class="text-gray-400 text-sm">Nothing here yet.</p>
      </div>
    {:else if data.results.length === 0}
      <div class="flex flex-col items-center justify-center py-24 text-center">
        <p class="text-gray-400 text-sm">No results for that query.</p>
      </div>
    {:else}
      <div class="flex flex-col gap-3">
        {#each data.results as result}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            onclick={() => goto(result.archiveUrl)}
            class="group hover:cursor-pointer flex items-center justify-start gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all hover:border-gray-400 hover:shadow-sm"
          >
            <img
              src="/utils/icons/{result.isFolder
                ? 'folder'
                : result.name.split('.').pop()?.toLowerCase() || 'file'}.svg"
              alt=""
              class="size-8"
            />

            <div>
              <h2 class="font-medium text-gray-900 w-full">
                {result.name}
              </h2>

              <p class="mt-1 flex flex-wrap gap-1 text-sm text-gray-400">
                {#each getBreadcrumbs(result) as crumb, i}
                  {#if crumb.label !== ""}
                    <span>/</span>
                    <a
                      href={crumb.href}
                      class="hover:text-gray-700 hover:underline hover:cursor-default"
                    >
                      {crumb.label}
                    </a>
                  {/if}
                {/each}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
