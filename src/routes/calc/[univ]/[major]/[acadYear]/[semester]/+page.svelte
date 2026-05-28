<script lang="ts">
  import Subject from "$lib/components/ui/subject.svelte";
  import type { PageProps } from "./$types";
  import { page } from "$app/state";
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
  let { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let subjects = $state<subject[]>(data?.data ?? []);
  $effect.pre(() => {
    subjects = data?.data ?? [];
  });

  let totalPoints = $derived({
    score: subjects.reduce(
      (sum, s) => sum + (Number(s.result) || 0) * s.coefficient,
      0,
    ),
    coefficients: subjects.reduce((sum, s) => sum + s.coefficient, 0),
  });

  let average = $derived(
    totalPoints.coefficients > 0
      ? totalPoints.score / totalPoints.coefficients
      : 0,
  );
</script>

<div class="min-h-screen w-full bg-zinc-50 font-sans dark:bg-black">
  <nav class="flex flex-col justify-center gap-2 py-4 items-center">
    <h1
      class="text-center text-4xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50"
    >
      Gradges calculator
    </h1>
    <div class="flex items-center">
      <a
        href="/calc/{page.params.univ}/{page.params.major}/{page.params
          .acadYear}/s1"
        class={[
          ,
          "size-10 flex items-center justify-center border border-white ",
          page.params.semester == "s1"
            ? "bg-black text-white"
            : "bg-white text-black",
        ]}>s1</a
      >
      <a
        href="/calc/{page.params.univ}/{page.params.major}/{page.params
          .acadYear}/s2"
        class={[
          ,
          "size-10 flex items-center justify-center border border-white ",
          page.params.semester == "s2"
            ? "bg-black text-white"
            : "bg-white text-black",
        ]}>s2</a
      >
    </div>
  </nav>
  <main
    class="flex h-full w-full flex-col items-center px-4 justify-start dark:bg-black gap-4"
  >
    <form action="" class="grid grid-cols-2 gap-x-4 gap-y-4 dark:bg-black">
      {#each subjects as subject, i}
        <div class="flex flex-col gap-2">
          <Subject
            bind:result={subject.result}
            name={subject.name}
            d={subject.td}
            ex={subject.exam}
            coef={subject.coefficient}
            credit={subject.credit}
            examRatio={subject.examRatio}
          />
          <hr class="text-white" />
        </div>
      {/each}
    </form>

    <div class="flex items-center gap-2">
      <label for="" class="text-white">Average</label>
      <input
        disabled={true}
        type="text"
        class="w-25 rounded-lg border-2 dark:bg-black dark:text-white border-white p-2 text-center placeholder:mx-auto placeholder:text-white focus:ring-2 dark:ring-white"
        value={isNaN(average) ? 0 : average.toFixed(2)}
      />
    </div>
  </main>
</div>
