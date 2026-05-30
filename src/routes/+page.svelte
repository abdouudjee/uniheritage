<script lang="ts">
  import { goto } from "$app/navigation";

  let searchQuery = $state("");

  function handleSearch(event: Event) {
    // Stops the browser from reloading the page natively
    event.preventDefault();

    if (searchQuery.trim().length >= 2) {
      // Fires an instant client-side redirect straight to your search layout page
      goto(`/archive/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }
</script>

<section class="max-w-4xl mx-auto px-6 py-16 text-center">
  <h1 class="text-5xl font-bold text-gray-900 mb-6">UniHeritage</h1>

  <p class="text-xl text-gray-600 mb-8">
    A large archive of university materials from previous years.
  </p>

  <p class="text-gray-500 mb-10">
    Browse courses, presentations, TDs, TPs, and Final Year Projects (FYP)
    organized by academic year and module.
  </p>

  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 mb-12">
    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">Computer science</div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">Mathimatics</div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
      Law and political scince
    </div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">Mines</div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">Commercial scince</div>
    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">Biologie</div>
  </div>
  <form onsubmit={handleSearch} class="w-full max-w-xl mx-auto mb-10">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search courses, modules..."
      class="w-full max-w-xl mx-auto mb-10 px-4 py-3 border rounded-lg"
    />
  </form>
  <div class="flex justify-center gap-4">
    <a
      href="/archive"
      class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
    >
      Browse Materials
    </a>

    <a
      href="https://github.com/abdouudjee/uniheritage"
      class="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
    >
      Contribute
    </a>
  </div>
</section>
<p class="text-center">
  try grades calculator <a href="/calc" class="underline t">here</a>
</p>
