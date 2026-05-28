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
    credit = 2,
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
    let num = Number(String(value).replace(/^0+(?=\d)/, ""));

    if (isNaN(num)) return 0;

    return Math.min(20, Math.max(0, num));
  }
</script>

<div class="flex flex-col gap-2">
  <div class="inline-flex justify-between">
    <h3 class="text-lg font-semibold dark:text-white">{name}</h3>
    <div class="inline-flex gap-2">
      <p class="text-white">coef: {coef}</p>
      <p class="text-white">credit: {credit}</p>
    </div>
  </div>
  <div class="flex items-center justify-between gap-4">
    <div class="flex w-full items-center justify-between gap-4 bg-black">
      {#if d}
        <div class="flex w-full flex-col gap-2">
          <label for="" class="text-white">td</label>
          <input
            class=" w-full dark:bg-black dark:text-white rounded-lg border-2 border-white p-2 placeholder:pl-2 placeholder:text-white focus:ring-2 dark:ring-white"
            placeholder="td"
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
        <div class="flex w-full flex-col gap-2">
          <label for="" class="text-white">exam</label>
          <input
            class=" w-full rounded-lg dark:bg-black dark:text-white border-2 border-white p-2 placeholder:pl-2 placeholder:text-white focus:ring-2 dark:ring-white"
            placeholder="exam"
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
    <div class="flex flex-col gap-2">
      <label for="" class="text-white">Average</label>
      <input
        disabled={true}
        type="text"
        class="w-25 rounded-lg border-2 dark:bg-black dark:text-white border-white p-2 text-center placeholder:mx-auto placeholder:text-white focus:ring-2 dark:ring-white"
        value={isNaN(result) ? 0 : result.toFixed(2)}
      />
    </div>
  </div>
</div>
