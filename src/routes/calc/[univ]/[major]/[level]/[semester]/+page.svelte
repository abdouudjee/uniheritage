<script lang="ts">
	import Subject from '$lib/components/ui/subject.svelte';
	import type { PageProps } from './$types';
	type subject = {
		id: number;
		name: string;
		td: boolean;
		exam: boolean;
		examRatio: number;
		coefficient: number;
		credit: number;
		result: number;
	};
	let { data, params }: PageProps = $props();
	// svelte-ignore state_referenced_locally
	let subjects = $state<subject[]>(data?.data ?? []);
	$effect.pre(() => {
		subjects = data?.data ?? [];
	});

	let totalPoints = $derived({
		score: subjects.reduce((sum, s) => sum + (Number(s.result) || 0) * s.coefficient, 0),
		coefficients: subjects.reduce((sum, s) => sum + s.coefficient, 0)
	});

	let average = $derived(
		totalPoints.coefficients > 0 ? totalPoints.score / totalPoints.coefficients : 0
	);
</script>

<div class="min-h-screen w-full bg-gray-50 font-sans">
	<nav class="flex flex-col justify-center gap-3 py-8 items-center">
		<h1 class="text-center text-4xl font-bold tracking-tight text-gray-900">Grades calculator</h1>
		<div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
			<a
				href="/calc/{params.univ}/{params.major}/{params.level}/s1"
				class={[
					'px-6 py-2 text-sm font-medium transition',
					params.semester == 's1'
						? 'bg-black text-white'
						: 'bg-white text-gray-700 hover:bg-gray-50'
				]}>s1</a
			>
			<a
				href="/calc/{params.univ}/{params.major}/{params.level}/s2"
				class={[
					'px-6 py-2 text-sm font-medium transition',
					params.semester == 's2'
						? 'bg-black text-white'
						: 'bg-white text-gray-700 hover:bg-gray-50'
				]}>s2</a
			>
		</div>
	</nav>
	<main class="flex h-full w-full flex-col items-center px-6 justify-start gap-6 pb-12">
		<form action="" class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
			{#each subjects as subject, i (i)}
				<div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
					<Subject
						bind:result={subject.result}
						name={subject.name}
						d={subject.td}
						ex={subject.exam}
						coef={subject.coefficient}
						credit={subject.credit}
						examRatio={subject.examRatio}
					/>
				</div>
			{/each}
		</form>

		<div
			class="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm"
		>
			<label for="" class="text-sm text-gray-500 font-medium">Overall average</label>
			<input
				disabled={true}
				type="text"
				class="w-24 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 p-2 text-center font-semibold text-lg focus:ring-2 focus:ring-black"
				value={isNaN(average) ? 0 : average.toFixed(2)}
			/>
		</div>
	</main>
</div>
