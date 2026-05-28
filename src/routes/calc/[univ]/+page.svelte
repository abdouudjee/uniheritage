<script>
  import { page } from "$app/state";
  let { data } = $props();
</script>

choose a major
<br />

{#each data.data as major}
  <a href="/calc/{page.params.univ}/{major}" class="underline mx-4">{major}</a>
  <br />
{/each}
