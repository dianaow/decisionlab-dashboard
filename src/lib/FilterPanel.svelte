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
4
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

<aside {id} class="w-full bg-grey-darkgreen px-6 pb-4 text-white">
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
</aside>