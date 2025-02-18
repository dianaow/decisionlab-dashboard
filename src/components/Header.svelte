<!-- Header.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleMenuClick() {
    dispatch('toggleMenu');
  }
</script>

<header class="w-full bg-white shadow-sm">
  <div class="container mx-auto px-4 py-2 flex justify-between items-center">
    <div class="flex items-center space-x-3">
      <!-- Logo -->
      <svg 
        class="w-12 h-12" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M24 4L4 14V34L24 44L44 34V14L24 4Z" 
          fill="#4FA89D"
          stroke="#4FA89D"
          stroke-width="2"
        />
        <path 
          d="M24 14L14 19V29L24 34L34 29V19L24 14Z" 
          fill="white"
          stroke="#4FA89D"
          stroke-width="2"
        />
      </svg>
      
      <!-- Title -->
      <div>
        <h1 class="text-gray-800 text-lg font-medium leading-tight">
          Canadian Unified Building
        </h1>
        <h2 class="text-gray-800 text-lg font-medium leading-tight">
          & Innovation Dashboard
        </h2>
      </div>
    </div>

    <!-- Menu Button -->
    <button 
      on:click={handleMenuClick}
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Toggle menu"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 text-gray-600" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
</header>

<style>
  /* Add any component-specific styles here */
  header {
    border-bottom: 1px solid #E5E7EB;
  }
</style>