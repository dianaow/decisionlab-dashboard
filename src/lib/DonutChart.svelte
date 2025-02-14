<script>
  export let percentage;
  export let color = '#6979F8';
  export let bgcolor = '#C6D0D0';
  export let size = 'large';
  export let label = '';
  export let showPercentages = true;
  export let showDonut = true;
  export let selected = false;

  $: sizeClasses = {
    large: 'w-20 h-20 md:w-24 md:h-24 2xl:w-28 2xl:h-28',
    medium: 'w-16 h-16 md:w-20 md:h-20 2xl:w-24 2xl:h-24',
    small: 'w-8 h-8 md:w-12 md:h-12 2xl:w-16 2x;:h-16'
  }[size];

  $: centerClasses = {
    large: 'w-16 h-16 md:w-20 md:h-20 2xl:w-24 2xl:h-24',
    medium: 'w-12 h-12 md:w-16 md:h-16 2xl:w-20 2xl:h-20',
    small: 'w-6 h-6 md:w-10 md:h-10 2xl:w-14 2xl:h-14'
  }[size];

  $: fontSizeClasses = {
    large: 'text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl',
    medium: 'text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl',
    small: 'text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg'
  }[size];
</script>

<div class="relative {sizeClasses}">
  <div
    class="absolute inset-0 rounded-full"
    style="background: conic-gradient({color} {percentage}%, {bgcolor} {percentage}% 20%)"
  />
  <div
    class="{showDonut? 'bg-background-dark' : ''} {selected ? 'bg-primary-darkgreen' : ''} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {centerClasses} rounded-full flex items-center justify-center"
  >
  {#if showPercentages}
    <h3 class="{fontSizeClasses} {selected ? 'text-white' : ''}">{percentage}%</h3>
  {/if}
  </div>
</div>