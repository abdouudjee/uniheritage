<script>
  import { page } from "$app/state";
  let { data } = $props();
</script>

choose a level

{#each data.levels as level}
  <br />
  <a
    href="/calc/{page.params.univ}/{page.params.major}/{level.id}/s1"
    class="underline mx-4 capitalize">{level.year} {level.spec ? "- " + level.spec : ""}</a
  >
{/each}
