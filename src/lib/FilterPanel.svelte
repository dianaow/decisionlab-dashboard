<script>
  import CustomDropdown from './CustomDropdown.svelte';
  
  export let id = 'dropdownPanel';
  export let data = [];
  export let selectedValues = {
    province: 'Alberta',
    urbanicity: 'Select an Urbanicity',
    innovation: 'Select an Innovation',
    adoption: 'Select an Adoption',
    persona: 'Homeowners'
  };

  // Create derived lists for dropdowns
  $:provinces = ['Select a Province', ...new Set(data.map(d => d.province))]
  $:urbanicity = ['Select an Urbanicity', ...new Set(data.map(d => d.urbanicity))]
  $:innovation = ['Select an Innovation', ...new Set(data.map(d => d.innovation))]
  
  let personas = ['Homeowners', 'Residents'];

  // Handle value changes
  function handleChange(field, value) {
    selectedValues = { ...selectedValues, [field]: value };
    dispatch('change', selectedValues);
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<aside {id} class="w-full bg-grey-darkgreen p-6 text-white">
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-white text-lg font-medium">Filters</h3>
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
      </div>
    </div>

    <div class="space-y-6">
      <div>
        <label class="block mb-2">Location</label>
        <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <div class="w-full">
            <CustomDropdown 
              options={provinces}
              value={selectedValues.province}
              placeholder="Select a Province"
              onChange={(value) => handleChange('province', value)}
            />
          </div>
          <div class="w-full">
            <CustomDropdown 
              options={urbanicity}
              value={selectedValues.urbanicity}
              placeholder="Select an Urbanicity"
              onChange={(value) => handleChange('urbanicity', value)}
            />
          </div>
        </div>
      </div>

      <div class="w-1/2">
        <CustomDropdown 
          label="Which innovation are you focused on?"
          options={innovation}
          value={selectedValues.innovation}
          placeholder="Select an Innovation"
          onChange={(value) => handleChange('innovation', value)}
        />
      </div>

      <div class="w-1/2">
        <CustomDropdown 
          label="Who are you looking to learn about?"
          options={personas}
          value={selectedValues.persona}
          placeholder="Select a Persona"
          onChange={(value) => handleChange('persona', value)}
        />
      </div>
    </div>
  </div>
</aside>