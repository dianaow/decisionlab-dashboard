<script>
  export let data = [];
  export let color = "bg-grey-light";
  export let height = "h-4";
  export let labelSize = "text-xs";
  export let spacing = 'space-y-4'
</script>

<div class={`${spacing}`}>
  {#each data as source}
    <div>
      <p class={`${labelSize} mb-2`}>{source.index}</p>
      <div class='flex'>
        <div class={`bg-grey-linegreen bg-opacity-20 rounded-full ${height} w-full`}>
          <div class={`h-full ${color} rounded-full`} style="width: {source.percentage}%"></div>
        </div>
        <p class='ml-3'>{source.percentage}%</p>
      </div>
    </div>
  {/each}
</div>