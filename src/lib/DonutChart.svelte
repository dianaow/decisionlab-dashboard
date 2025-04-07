<script>
  export let percentage;
  export let color = '#6979F8';
  export let bgcolor = '#C6D0D0';
  export let size = 'large';
  export let label = '';
  export let showPercentages = true;
  export let showDonut = true;
  export let selected = false;
  export let isHovered = false;

  // Simplified size classes to maintain perfect circles
  $: sizeClasses = {
    large: 'w-20 h-20',
    medium: 'w-16 h-16',
    small: 'w-12 h-12'
  }[size];

  $: centerClasses = {
    large: 'w-16 h-16',
    medium: 'w-12 h-12',
    small: 'w-10 h-10'
  }[size];

  $: fontSizeClasses = {
    large: 'text-base',
    medium: 'text-sm',
    small: 'text-xs'
  }[size];
</script>

<div class="relative {sizeClasses} aspect-square">
  <div
    class="absolute inset-0 rounded-full"
    style="background: conic-gradient({color} {percentage}%, {bgcolor} {percentage}% 100%)"
  />
  <div
    class="{showDonut ? 'bg-background-dark' : ''} {selected ? 'bg-primary-darkgreen' : ''} {isHovered && !selected ? 'bg-white' : ''} 
           absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {centerClasses} 
           rounded-full flex items-center justify-center"
  >
    {#if showPercentages}
      <h3 class="{fontSizeClasses} {selected ? 'text-white' : ''}">{percentage}%</h3>
    {/if}
  </div>
</div>