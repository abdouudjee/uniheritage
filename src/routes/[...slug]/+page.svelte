<script lang="ts">
  import type { PageProps } from "./$types";
  import { page } from "$app/state";
  let { data }: PageProps = $props();
  let items = $derived(data.items);
  $effect(() => {
    console.log(page.url);
  });
</script>

<div class="flex gap-8">
  {#each items as item}
    {#if item.type === "folder"}
      <a
        href={page.url.pathname + "/" + item.name}
        data-sveltekit-preload-data="false"
      >
        <div class="flex flex-col items-center justify-between h-fit w-fit">
          <img src="/utils/folder.svg" alt="" class="size-15" />
          <p>{item.name}</p>
        </div>
      </a>
    {:else if item.type === "file"}
      <a
        href={"/reader/years" + page.url.pathname + "/" + item.name}
        data-sveltekit-preload-data="false"
      >
        <div class="flex flex-col items-center justify-between h-fit w-fit">
          <img src="/utils/pdf.svg" alt="" class="size-15" />
          <p>{item.name}</p>
        </div>
      </a>
    {/if}
  {/each}
</div>
