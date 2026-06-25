<script lang="ts">
	type Props = {
		d?: boolean;
		ex?: boolean;
		name: string;
		examRatio?: number;
		coef?: number;
		credit?: number;
		result: number;
	};
	let {
		d = true,
		ex = true,
		name,
		result = $bindable(0),
		examRatio = 0.6,
		coef = 1,
		credit = 2
	}: Props = $props();
	let td = $state();
	let exam = $state();

	$effect(() => {
		if (!ex) {
			// td only
			result = Number(td);
		} else if (!d) {
			result = Number(exam);
		}
		//   td  exam
		else {
			result = Number(td) * (1 - examRatio) + Number(exam) * examRatio;
		}
	});
	function sanitizeGrade(value: string | number) {
		let num = Number(String(value).replace(/^0+(?=\d)/, ''));

		if (isNaN(num)) return 0;

		return Math.min(20, Math.max(0, num));
	}
</script>

<div class="flex flex-col gap-3">
	<div class="flex justify-between items-center">
		<h3 class="text-base font-semibold text-gray-900">{name}</h3>
		<div class="flex gap-2">
			<span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">coef: {coef}</span>
			<span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">credit: {credit}</span>
		</div>
	</div>

	<div class="flex items-end gap-3">
		<div class="flex flex-1 gap-3">
			{#if d}
				<div class="flex flex-col gap-1 flex-1">
					<label for="" class="text-xs font-medium text-gray-500 uppercase tracking-wide">TD</label>
					<input
						class="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
						placeholder="0–20"
						bind:value={td}
						min={0}
						max={20}
						oninput={(e) => {
							td = sanitizeGrade(e.currentTarget.value);
						}}
					/>
				</div>
			{/if}

			{#if ex}
				<div class="flex flex-col gap-1 flex-1">
					<label for="" class="text-xs font-medium text-gray-500 uppercase tracking-wide"
						>Exam</label
					>
					<input
						class="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
						placeholder="0–20"
						bind:value={exam}
						min={0}
						max={20}
						oninput={(e) => {
							exam = sanitizeGrade(e.currentTarget.value);
						}}
					/>
				</div>
			{/if}
		</div>

		<div class="flex flex-col gap-1">
			<label for="" class="text-xs font-medium text-gray-500 uppercase tracking-wide">Average</label
			>
			<input
				disabled={true}
				type="text"
				class="w-20 rounded-lg border border-gray-200 bg-gray-100 text-gray-900 p-2 text-center font-semibold focus:ring-2 focus:ring-black"
				value={isNaN(result) ? 0 : result.toFixed(2)}
			/>
		</div>
	</div>
</div>
