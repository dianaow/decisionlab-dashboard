<script>
  import "../../app.css";
  import DonutChart from "../../lib/DonutChart.svelte";
  import Demographics from "../../components/Demographics.svelte";
  import Attributes from "../../components/Attributes.svelte";
  import BarriersDrivers from "../../components/BarriersDrivers.svelte";
  import CurrentHousing from "../../components/CurrentHousing.svelte";
  import KeyCommunication from "../../components/KeyCommunication.svelte";
  import data from '../../data/data2.json';

  let selectedProvince = 'Select a Province';
  let selectedUrbanicity = 'Select an Urbanicity';
  let selectedInnovation = 'Select an Innovation';
  let selectedAdoption = 'Select an Adoption';
  let dataToShow

  // Extract unique list of provinces
  const provinces = ['Select a Province', ...new Set(Object.keys(data))];

  // Update Urbanicity dropdown based on selected province
  $: urbanicity = selectedProvince === 'Select a Province'
    ? ['Select an Urbanicity']
    : ['Select an Urbanicity', 'Urban', 'Rural'];

  function filterAndAggregateData(filters) {
    const filteredData = data.filter(d => {
      // Filter based on the values in the `filters` object
      return Object.entries(filters).every(([key, value]) =>
        value === 'Select' || d[key] === value
      );
    });

    const result = {};
    filteredData.forEach(item => {
      // Construct the key dynamically based on selected filters
      const key = Object.entries(filters)
        .filter(([_, value]) => value !== 'Select')  // Only include filters that are not 'Select'
        .map(([key, value]) => `${key}-${value}`)
        .join('-') + `-${item.attribute}-${item.index}`;

      if (!result[key]) {
        result[key] = { ...item };
      } else {
        result[key].value += item.value;
      }
    });
    console.log(result)

    return Object.values(result);
  }

  $: {
    // Map dropdown values to filter parameters, treat 'Select' as a special value
    const filters = {
      province: selectedProvince === 'Select a Province' ? 'Select' : selectedProvince,
      urbanicity: selectedUrbanicity === 'Select an Urbanicity' ? 'Select' : selectedUrbanicity,
      innovation: selectedInnovation === 'Select an Innovation' ? 'Select' : selectedInnovation,
      adoption: selectedAdoption === 'Select an Adoption' ? 'Select' : selectedAdoption
    };

    // Get the aggregated data based on the selected filters
    dataToShow = filterAndAggregateData(filters);
  }

  $: ({ gender, ageGroup, householdIncome, drivers, barriers, householdComposition } = dataToShow);


  const adoptionStats = [
    { title: "Adopted", count: 2345, percentage: 33, type: "homeowners", variant: "#2F4144" },
    { title: "High Capability,\nHigh Willingness", count: 226, percentage: 18, type: "homeowners", variant: "#00C2B2" },
    { title: "High Capability,\nLow Willingness", count: 138, percentage: 12, type: "homeowners", variant: "#00C2B2" },
    { title: "Low Capability,\nHigh Willingness", count: 1653, percentage: 7, type: "homeowners", variant: "#2F4144" },
    { title: "Low Capability,\nLow Willingness", count: 1214, percentage: 30, type: "homeowners", variant: "#6B7280" }
  ];

  const locationData = [
    { region: "Ontario", value: 32, color: "bg-[#2F4144]" },
    { region: "Quebec", value: 22, color: "bg-[#5CD5C4]" },
    { region: "British Columbia", value: 13, color: "bg-[#3D5D5B]" },
    { region: "Alberta", value: 10, color: "bg-[#94A3A8]" },
    { region: "Prairies", value: 8, color: "bg-[#467A76]" },
    { region: "Atlantic Canada", value: 8, color: "bg-[#69A6A1]" },
    { region: "Northern Territories", value: 8, color: "bg-[#D9E1E6]" }
  ];

  const housingTypes = [
    { label: "Renters", percentage: 80 },
    { label: "Owners", percentage: 65 },
    { label: "Type 3", percentage: 55 },
    { label: "Type 4", percentage: 35 },
    { label: "Type 5", percentage: 25 }
  ];

  const buildingTypes = [
    { label: "Single family home", percentage: 75 },
    { label: "Apartment (in a building with more than 12 units)", percentage: 65 },
    { label: "Duplex, triplex, fourplex", percentage: 45 },
    { label: "Accessory Dwelling Unit", percentage: 35 },
    { label: "Townhouse, row house or semi-detached house", percentage: 25 }
  ];

  const householdSize = [
    { label: "2 - 3 people", percentage: 85 },
    { label: "4 - 6 people", percentage: 65 },
    { label: "1 person", percentage: 45 },
    { label: "7 - 10", percentage: 35 },
    { label: "10 and more", percentage: 25 }
  ];

  const attributes = [
    { label: 'Household income', value: 'More than 130,000', percentage: 80 },
    { label: 'Household income', value: '100,001-130,000', percentage: 75 },
    { label: 'Age', value: '26-30', percentage: 60 },
    { label: 'Age', value: '31-40', percentage: 40 },
    { label: 'Gender', value: 'Men', percentage: 33 },
    { label: 'Household income', value: '70,001-100,000', percentage: 25 },
    { label: 'What is the relationship to you of the people living at your residence?', value: 'I live alone', percentage: 25 },
    { label: 'What is the relationship to you of the people living at your residence?', value: 'your spouse or common-law partner', percentage: 20 },
    { label: 'Gender', value: 'Women', percentage: 15 },
    { label: 'Household income', value: '40,001-70,000', percentage: 15 }
  ];
  
  const trustSources = [
    {
      label: "Information Verifiable through Other Sources",
      percentage: 90
    },
    {
      label: "Expert or Professional Driven Information",
      percentage: 75
    },
    {
      label: "Information from Non-Politically or Financially Motivated Orgs",
      percentage: 60
    },
    {
      label: "Information from Government Entities",
      percentage: 45
    },
    {
      label: "Professionally Presented Information",
      percentage: 30
    }
  ];

  const distrustSources = [
    {
      label: "Social Media (e.g. Facebook and Instagram)",
      percentage: 85
    },
    {
      label: "Online Marketplaces (e.g. FB Marketplace, Craigslist and Kijiji)",
      percentage: 70
    },
    {
      label: "Commercial Content (e.g. From Real Estate Firms & Influencers)",
      percentage: 55
    },
    {
      label: "Profit-Driven Companies",
      percentage: 40
    },
    {
      label: "Political Sources or Organizations with Ulterior Motives",
      percentage: 25
    }
  ];

  const channels = [
    {
      icon: "🌐",
      title: "Internet or Online Sources",
      description: "At vero eos et accusamus"
    },
    {
      icon: "💡",
      title: "Word-of-Mouth",
      description: "At vero eos et accusamus"
    },
    {
      icon: "📍",
      title: "Site Visits",
      description: "At vero eos et accusamus"
    },
    {
      icon: "📺",
      title: "Traditional Media",
      description: "At vero eos et accusamus"
    },
    {
      icon: "➕",
      title: "Other Sources",
      description: "At vero eos et accusamus"
    }
  ];
</script>

<div class="flex flex-col h-auto">

  <aside id='dropdownPanel' class="grid grid-cols-2 gap-6 w-full bg-grey-darkgreen p-6 text-white">    
    <div class="space-y-6">
      <h3 class='text-white mb-3'>Filters</h3>
      <div class='flex space-x-2'>
        <label>Location</label>
        <select bind:value={selectedProvince} class="flex-1">
          {#each provinces as province}
            <option>{province}</option>
          {/each}
        </select>
        <select bind:value={selectedUrbanicity} class="flex-1">
          {#each urbanicity as area}
            <option>{area}</option>
          {/each}
        </select>
      </div>

      <div class='flex'>
        <label>How would you describe yourself?</label>
        <select>
          <option>Select a descriptor</option>
        </select>
      </div>

      <div class='flex'>
        <label>Which innovation are you focused on?</label>
        <select>
          <option>Select an innovation</option>
        </select>
      </div>

      <div class='flex'>
        <label>Who are you looking to learn about?</label>
        <select>
          <option>Homeowners</option>
        </select>
      </div>
    </div>
    <div class="space-y-6">
      <h3 class='text-white mb-3'>Filters</h3>
      <div class='flex space-x-2'>
        <label>Location</label>
        <select bind:value={selectedProvince} class="flex-1">
          {#each provinces as province}
            <option>{province}</option>
          {/each}
        </select>
        <select bind:value={selectedUrbanicity} class="flex-1">
          {#each urbanicity as area}
            <option>{area}</option>
          {/each}
        </select>
      </div>

      <div class='flex'>
        <label>How would you describe yourself?</label>
        <select>
          <option>Select a descriptor</option>
        </select>
      </div>

      <div class='flex'>
        <label>Which innovation are you focused on?</label>
        <select>
          <option>Select an innovation</option>
        </select>
      </div>

      <div class='flex'>
        <label>Who are you looking to learn about?</label>
        <select>
          <option>Homeowners</option>
        </select>
      </div>
    </div>
  </aside>

 <div class='w-full bg-background-dark'> 
  <main class="grid grid-cols-2 gap-6 bg-background-dark px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div>
      <p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p>
      <div class="space-y-2 mt-3">
        {#each adoptionStats as stat}
          <div class="flex items-center justify-between border-t border-grey-linegreen">
            <div class='caption mt-5'>{stat.title}</div>          
            <div class="flex items-center gap-4">
              <span>
                <span class="body-s italic">{stat.count}</span>
                <span class="body-s italic"> homeowners</span>
              </span>
              
              <div class="w-32 flex items-center justify-end gap-2 mt-2">
                <h3>{stat.percentage}%</h3>
                <DonutChart percentage={stat.percentage} color={stat.variant} bgcolor='#C6D0D0' showPercentages={false} showDonut={false} />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div>
      <p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p>
      <div class="space-y-2 mt-3">
        {#each adoptionStats as stat}
          <div class="flex items-center justify-between border-t border-grey-linegreen">
            <div class='caption mt-5'>{stat.title}</div>          
            <div class="flex items-center gap-4">
              <span>
                <span class="body-s italic">{stat.count}</span>
                <span class="body-s italic"> homeowners</span>
              </span>
              
              <div class="w-32 flex items-center justify-end gap-2 mt-2">
                <h3>{stat.percentage}%</h3>
                <DonutChart percentage={stat.percentage} color={stat.variant} bgcolor='#C6D0D0' showPercentages={false} showDonut={false} />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>

  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6 mt-5">
      <Demographics
        gender={gender}
        ageGroup={ageGroup}
        householdIncome={householdIncome}
        locationData={locationData}
      />
      <Demographics
        gender={gender}
        ageGroup={ageGroup}
        householdIncome={householdIncome}
        locationData={locationData}
      />
    </div>
  </main>
   
  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6 mt-5">
      <Attributes data={attributes} />
      <Attributes data={attributes} />
    </div>
  </main>

  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6">
      <BarriersDrivers 
        barriers={barriers}
        drivers={drivers}
      />
      <BarriersDrivers 
        barriers={barriers}
        drivers={drivers}
      />
    </div>
  </main>

  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6">
      <CurrentHousing 
        housingTypes={housingTypes}
        buildingTypes={buildingTypes}
        householdSize={householdSize}
        householdComposition={householdComposition}
      />
      <CurrentHousing 
        housingTypes={housingTypes}
        buildingTypes={buildingTypes}
        householdSize={householdSize}
        householdComposition={householdComposition}
      />
    </div>
  </main>

  <main class="flex bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <KeyCommunication 
      channels={channels}
      trustSources={trustSources}
      distrustSources={distrustSources}
    />
    <KeyCommunication 
      channels={channels}
      trustSources={trustSources}
      distrustSources={distrustSources}
    />
  </main>
 </div>
</div>

<style>
 :global(body) {
   margin: 0;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
 }
</style>