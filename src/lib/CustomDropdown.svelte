<script>
  export let id = 'customDropdown';
  export let label = '';
  export let options = [];
  export let value = '';
  export let placeholder = 'Select an option';
  export let onChange = () => {};
  
  let isOpen = false;
  let dropdownRef;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectOption(option) {
    value = option;
    isOpen = false;
    onChange(option);
  }

  function handleClickOutside(event) {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      isOpen = false;
    }
  }
  
  // Determine if the current value is a placeholder
  $: isPlaceholderSelected = value === placeholder || value === '';
  
  // Get display text for currently selected value
  $: displayValue = value || placeholder;
</script>

<svelte:window on:click={handleClickOutside} />

<div class="mb-4">
  {#if label}
    <label class="block text-white mb-2">{label}</label>
  {/if}
  
  <div bind:this={dropdownRef} class="relative">
    <!-- Dropdown trigger button -->
    <button 
      type="button"
      on:click={toggleDropdown}
      class="w-full flex items-center justify-between px-4 py-2 rounded-md border-[0.77px] border-background-light {
        isOpen ? 'bg-white text-primary-green' : 
        (isPlaceholderSelected ? 'bg-grey-darkgreen text-white' : 'bg-white text-primary-green')
      }"
    >
      <span class="font-secondary text-xs font-bold">{displayValue}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 transition-transform {isOpen ? 'rotate-180' : ''}" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <!-- Dropdown menu -->
    {#if isOpen}
      <div class="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
        <ul class="py-1">
          {#each options as option}
            <li 
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer font-secondary text-xs font-bold {option === value ? 'text-primary-green' : 'text-grey-light'}"
              on:click={() => selectOption(option)}
            >
              {option}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
