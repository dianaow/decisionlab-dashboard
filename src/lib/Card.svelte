<script>
  export let title = '';
  export let showMenu = true;
</script>

<div class="bg-white p-4 sm:p-6 rounded-xl w-full">
  <header class="flex justify-between items-center mb-3">
    <h3>{title}</h3>
    {#if showMenu}
      <button class="text-grey-light font-bold">•••</button>
    {/if}
  </header>
  <slot />
</div>
