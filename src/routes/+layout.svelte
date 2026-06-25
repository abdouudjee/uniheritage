<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="useful resources for college students." />
	<title>Heritage - your academic arsenal</title>
</svelte:head>
{@render children()}
