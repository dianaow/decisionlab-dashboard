<script>
  export let title = '';
  export let showMenu = true;
</script>

<div class="bg-white p-4 sm:p-6 rounded-xl w-full">
  <header class="flex justify-between items-center mb-6">
    <h1 class="text-xl sm:text-2xl font-serif text-teal-dark">{title}</h1>
    {#if showMenu}
      <button class="text-gray-400 text-bold">•••</button>
    {/if}
  </header>
  <slot />
</div>
