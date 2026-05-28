<script lang="ts">
  import { page } from "$app/state";
  console.log(page.error);
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4"
>
  <div class="text-center">
    <h1 class="text-9xl font-extrabold text-zinc-300 dark:text-zinc-800">
      {page.status}
    </h1>

    <h2
      class="mt-4 text-2xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-4xl"
    >
      Page Not Found
    </h2>

    <p class="mt-4 text-base dark:text-white max-w-md mx-auto">
      {page.error?.message ?? "The page you are looking for doesn't exist."}
    </p>

    <div class="mt-6">
      <a
        href="/"
        class="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
      >
        Go back home
      </a>
    </div>
  </div>
</div>
