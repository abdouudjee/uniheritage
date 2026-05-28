<script>
  import Tree from "$lib/components/tree.svelte";
  import Open from "$lib/assets/folder-open.svg";
  import Close from "$lib/assets/folder-closed.svg";
  import File from "$lib/assets/pdf.svg";
  let { root } = $props();
  let isOpen = $state(false);

  const isLeaf = !root.children || root.children.length === 0;
</script>

{#if isLeaf}
  <div
    class="flex items-center gap-2 py-1.5 px-2 rounded-md text-sm text-zinc-700"
  >
    <img src={File} alt="" class="w-4 h-4 shrink-0" />
    <span class="font-medium tracking-tight">{root.label}</span>
  </div>
{:else}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <details class="group">
    <summary
      onclick={() => (isOpen = !isOpen)}
      class="flex items-center gap-2 cursor-pointer select-none
             py-1.5 px-2 rounded-md text-sm text-zinc-700
             hover:bg-zinc-100 hover:text-zinc-900
             transition-colors duration-150 list-none"
    >
      <img src={isOpen ? Open : Close} alt="" class="w-4 h-4 shrink-0" />
      <span class="font-medium tracking-tight">{root.label}</span>
    </summary>

    <div class="mt-0.5 ml-2.25 border-l border-zinc-200">
      {#each root.children as child}
        <div class="pl-3">
          <Tree root={child} />
        </div>
      {/each}
    </div>
  </details>
{/if}
