<script lang="ts">
  import { page } from "$app/state";
</script>
<button>xxx</button>
<iframe title="reader" src={"" + page.url.pathname.replace("/reader","")} frameborder="0"
class="w-full h-screen "
></iframe>
