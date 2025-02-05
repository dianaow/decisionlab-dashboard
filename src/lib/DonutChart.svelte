<script>
  export let percentage;
  export let color = '#6979F8';
  export let bgcolor = '#C6D0D0';
  export let size = 'large';
  export let label = '';
  export let showPercentages = true;
  export let showDonut = true;

  $: sizeClasses = size === 'large' 
    ? 'w-12 h-12 md:w-16 md:h-16 2xl:w-20 2xl:h-20' 
    : 'w-8 h-8 md:w-12 md:h-12 2xl:w-16 2xl:h-16';

  $: centerClasses = size === 'large'
    ? 'w-8 h-8 md:w-12 md:h-12 2xl:w-16 2xl:h-16'
    : 'w-6 h-6 md:w-9 md:h-9 2xl:w-12 2xl:h-12';

  $: fontSize = size === 'large'
    ? 'text-sm md:text-base 2xl:text-md'
    : 'text-xs md:text-xs 2xl:text-sm';
</script>

<div class="relative {sizeClasses}">
  <div
    class="absolute inset-0 rounded-full"
    style="background: conic-gradient({color} {percentage}%, {bgcolor} {percentage}% 20%)"
  />
  <div
    class="{showDonut? 'bg-background-dark' : ''} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {centerClasses} rounded-full flex items-center justify-center"
  >
  {#if showPercentages}
    <h3 class="{fontSize}">{percentage}%</h3>
  {/if}
  </div>
</div>