<script>
  import "../app.css";
  import Map from "../lib/Map.svelte";
  import DonutChart from "../lib/DonutChart.svelte";
  import Demographics from "../components/Demographics.svelte";
  import Attributes from "../components/Attributes.svelte";
  import BarriersDrivers from "../components/BarriersDrivers.svelte";
  import CurrentHousing from "../components/CurrentHousing.svelte";
  import KeyCommunication from "../components/KeyCommunication.svelte";
  import data from '../data/data.json';

  let selectedProvince = 'Select a Province';
  let selectedUrbanicity = 'Select an Urbanicity';
  let filteredData

  // Extract unique list of provinces
  const provinces = ['Select a Province', ...new Set(Object.keys(data))];

  // Update Urbanicity dropdown based on selected province
  $: urbanicity = selectedProvince === 'Select a Province'
    ? ['Select an Urbanicity']
    : ['Select an Urbanicity', 'Urban', 'Rural'];

  $: {
    if (selectedProvince === 'Select a Province' && selectedUrbanicity === 'Select an Urbanicity') {
      filteredData = data['Total']['Total'];
    } else if (selectedProvince !== 'Select a Province' && selectedUrbanicity === 'Select an Urbanicity') {
      filteredData = data[selectedProvince]['Total'];
    } else {
      filteredData = data[selectedProvince][selectedUrbanicity];
    }
  }

  $: ({ gender, ageGroup, householdIncome, drivers, barriers, householdComposition } = filteredData);

  const canadaStats = {
    population: "40.1 million",
    area: "9.985 million km²",
    capital: "Ottawa"
  };

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

<div class="flex flex-col md:flex-row h-auto">

  <aside id='dropdownPanel' class="flex w-full md:w-64 bg-grey-darkgreen p-6 text-white">    
    <div class="space-y-6">
      <h3 class='text-white mb-3'>Filters</h3>
      <div class='flex md:block space-x-2 md:space-x-0'>
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

      <div class='flex md:block'>
        <label>How would you describe yourself?</label>
        <select>
          <option>Select a descriptor</option>
        </select>
      </div>

      <div class='flex md:block'>
        <label>Which innovation are you focused on?</label>
        <select>
          <option>Select an innovation</option>
        </select>
      </div>

      <div class='flex md:block'>
        <label>Who are you looking to learn about?</label>
        <select>
          <option>Homeowners</option>
        </select>
      </div>
    </div>
  </aside>

 <div class='w-full bg-background-dark'>
  <main class="hidden sm:block h-screen bg-background-dark px-4 sm:px-8 pb-2 my-3 sm:my-0">
    <div class="relative h-full">
      <Map bind:selectedProvince />
      <div class="absolute top-2 left-0 bg-white p-4 rounded-lg">
         <h2 class="mb-4">{selectedProvince === 'Select a Province' ? 'Canada' : selectedProvince}</h2>
         <div class="space-y-2">
           <div class="flex gap-4">
             <span class="caption mb-0">Population</span>
             <span class='body-s'>{canadaStats.population}</span>
           </div>
           <div class="flex gap-4">
             <span class="caption mb-0">Area</span>
             <span class='body-s'>{canadaStats.area}</span>
           </div>
           <div class="flex gap-4">
             <span class="caption mb-0">Capital</span>
             <span class='body-s'>{canadaStats.capital}</span>
           </div>
         </div>
      </div>
 
      <div class="absolute top-2 right-0">
           <div class="flex flex-col gap-4">
             <button class="px-2 py-2 border border-teal-500 text-teal-500 rounded-sm flex items-center gap-2">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
               </svg>
               DOWNLOAD
             </button>
             <button class="px-2 py-2 border border-teal-500 text-teal-500 rounded-sm flex items-center gap-2">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
               </svg>
               SHARE
             </button>
             <button class="px-2 py-2 border border-teal-500 text-teal-500 rounded-sm flex items-center gap-2">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
               </svg>
               COMPARE
             </button>
           </div>
      </div>
 
      <div class="absolute bottom-0 w-full">
        <p class="subtitle-s ml-2 mb-3">Adoption Potential</p>
        <div class="grid grid-flow-col justify-stretch">
          {#each adoptionStats as stat}
            <div class="border border-grey-linegreen m-2 p-4 rounded-lg relative">
              <p class="caption">{stat.title}</p>
              <div class="flex justify-between items-end">
                <div class="flex flex-col justify-end">
                  <h4>{stat.count}</h4>
                  <span class="body-s italic"> homeowners</span>
                </div>
                <DonutChart percentage={stat.percentage} color={stat.variant} />
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </main>
 
  <main class="block sm:hidden bg-background-dark px-4 sm:px-8 py-2 my-3 sm:my-0">
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
  </main>

  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-5">
      <Demographics
        gender={gender}
        ageGroup={ageGroup}
        householdIncome={householdIncome}
        locationData={locationData}
      />
      <Attributes data={attributes} />
    </div>
  </main>
   
  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <BarriersDrivers 
        barriers={barriers}
        drivers={drivers}
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
  </main>
 </div>
</div>

<style>
 :global(body) {
   margin: 0;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
 }
</style>