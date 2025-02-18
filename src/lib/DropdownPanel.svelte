<script>
  export let id = 'dropdownPanel';
  export let data = [];
  export let selectedValues = {
    province: 'Ontario',
    urbanicity: 'Select an Urbanicity',
    innovation: 'ADU',
    audience: 'Homeowners'
  };

  // Create derived lists for dropdowns
  $: provinces = ['Select a Province', ...new Set(data.map(d => d.province))];
  $: urbanicity = ['Select an Urbanicity', ...new Set(data.map(d => d.urbanicity))];
  $: innovation = ['Select an Innovation', ...new Set(data.map(d => d.innovation))];

  // Handle value changes
  function handleChange(field, value) {
    selectedValues = { ...selectedValues, [field]: value };
    dispatch('change', selectedValues);
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<aside {id} class="w-full bg-grey-darkgreen p-4 text-white">
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-white text-lg font-medium">Filter #1</h3>
      <div class="flex space-x-4">
        <button class="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <button class="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button class="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block mb-2">Location</label>
        <div class="flex space-x-2">
          <select 
            value={selectedValues.province}
            on:change={e => handleChange('province', e.target.value)}
            class="w-full bg-transparent border border-white rounded px-3 py-2 text-white"
          >
            {#each provinces as province}
              <option>{province}</option>
            {/each}
          </select>
          <select 
            value={selectedValues.urbanicity}
            on:change={e => handleChange('urbanicity', e.target.value)}
            class="w-full bg-transparent border border-white rounded px-3 py-2 text-white"
          >
            {#each urbanicity as area}
              <option>{area}</option>
            {/each}
          </select>
        </div>
      </div>

      <div>
        <label class="block mb-2">Which innovation are you focused on?</label>
        <select 
          value={selectedValues.innovation}
          on:change={e => handleChange('innovation', e.target.value)}
          class="w-full bg-transparent border border-white rounded px-3 py-2 text-white"
        >
          {#each innovation as i}
            <option>{i}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block mb-2">Who are you looking to learn about?</label>
        <select
          value={selectedValues.audience}
          on:change={e => handleChange('audience', e.target.value)}
          class="w-full bg-transparent border border-white rounded px-3 py-2 text-white"
        >
          <option>Homeowners</option>
        </select>
      </div>
    </div>
  </div>
</aside>

<style>
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  select option {
    background-color: #2d3b3d;
    color: white;
  }
</style>