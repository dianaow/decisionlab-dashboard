<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleBack() {
    dispatch('back');
  }

  function handleDownload() {
    dispatch('download');
  }

  function handleShare() {
    dispatch('share');
  }
</script>

<header class="sticky top-24 z-50 bg-grey-darkgreen px-6 py-4 flex items-center justify-between">
  <div class="flex items-center space-x-3">
    <button 
      on:click={handleBack}
      class="text-white hover:text-gray-200 flex items-center"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span class="ml-2 text-sm">Back</span>
    </button>
    <div class='font-secondary text-[26px] leading-[39px] font-medium text-white'>Compare Data Results</div>
  </div>

  <!-- <div class="flex space-x-4">
    <button
      on:click={handleDownload}
      class="flex items-center px-4 py-2 text-sm text-white border border-white rounded hover:bg-white hover:bg-opacity-10 transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-4 w-4 mr-2" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      DOWNLOAD
    </button>
    <button
      on:click={handleShare}
      class="flex items-center px-4 py-2 text-sm text-white border border-white rounded hover:bg-white hover:bg-opacity-10 transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-4 w-4 mr-2" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
      SHARE
    </button>
  </div> -->
</header>

<style>
  /* Add any component-specific styles here */
  :global(.bg-grey-darkgreen) {
    background-color: #2d3b3d;
  }
</style>