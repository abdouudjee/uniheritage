<script>
  let { data } = $props();
</script>

choose a university
<br />
{#each data.data as uni}
  <a href="/calc/{uni}" class="underline mx-4">{uni}</a>
{/each}
