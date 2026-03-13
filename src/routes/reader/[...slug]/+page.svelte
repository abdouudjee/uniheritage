<script lang="ts">
  import { page } from "$app/state";
  $effect(() => {
    console.log(page.url);
  });
</script>

<iframe title="reader" src={"" + page.url.pathname.replace("/reader","")} frameborder="0"
class="w-full min-h-screen"
></iframe>
