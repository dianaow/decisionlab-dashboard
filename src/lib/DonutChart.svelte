<script>
  export let percentage;
  export let color = '#6979F8';
  export let size = 'large';
  export let label = '';
  export let showLabel = true;

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
    style="background: conic-gradient({color} {percentage}%, #C6D0D0 {percentage}% 100%)"
  />
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {centerClasses} bg-white rounded-full flex items-center justify-center"
  >
    <h2 class="{fontSize}">{percentage}%</h2>
  </div>
  {#if showLabel && label}
    <div class="absolute -bottom-6 left-0 right-0 text-center">
      <span class="text-gray-400 text-xs md:text-sm 2xl:text-base">{label}</span>
    </div>
  {/if}
</div>