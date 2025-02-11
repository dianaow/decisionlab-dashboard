<script>
  import "../app.css";
  import Map from "../lib/Map.svelte";
  import DonutChart from "../lib/DonutChart.svelte";
  import Demographics from "../components/Demographics.svelte";
  import Attributes from "../components/Attributes.svelte";
  import BarriersDrivers from "../components/BarriersDrivers.svelte";
  import CurrentHousing from "../components/CurrentHousing.svelte";
  import KeyCommunication from "../components/KeyCommunication.svelte";
  import data from '../data/data2.json';

  let selectedProvince = 'Select a Province';
  let selectedUrbanicity = 'Select an Urbanicity';
  let selectedInnovation = 'Select an Innovation';
  let selectedAdoption = 'Select an Adoption';
  let dataToShow, gender, ageGroup, housingTypes, householdIncome, householdComposition, adoptionStats

  const provinces = ['Select a Province', ...new Set(data.filter(d => d.level === 'level4').map(d => d.province))]
  const urbanicity = ['Select an Urbanicity', ...new Set(data.filter(d => d.level === 'level3').map(d => d.urbanicity))]
  const innovation = ['Select an Innovation', ...new Set(data.filter(d => d.level === 'level2').map(d => d.innovation))]

  function calculateAdoptionStats(filters) {
    // Step 1: Filter data based on selected dropdowns
    const filteredData = data.filter(d =>
      Object.entries(filters).every(([key, value]) =>
        value === 'Select' || d[key] === value
      )
    );

    // Step 2: Aggregate counts by `adoption`
    const adoptionCounts = {};

    filteredData.forEach(item => {
      if(item.adoption) {
        if (!adoptionCounts[item.adoption]) {
          adoptionCounts[item.adoption] = 0;
        }
        adoptionCounts[item.adoption] += item.value; // Assuming `value` represents count
      }
    });

    // Step 3: Calculate total count after filtering
    const totalCount = Object.values(adoptionCounts).reduce((sum, count) => sum + count, 0);

    const colorMap = {
      "High Personal Support": "#00C2B2",
      "Low Personal Support": "#00C2B2",
      "High Perceived Neighbors' Support": "#2F4144",
      "Low Perceived Neighbors' Support": "#6B7280"
    };

    // Step 4: Construct adoptionStats array
    return Object.entries(adoptionCounts)
      .map(([title, count]) => ({
      title,
      count,
      percentage: totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0,
      variant: colorMap[title]
    }));
  }

  $: {
    const filters = {
      province: selectedProvince === 'Select a Province' ? 'Select' : selectedProvince,
      urbanicity: selectedUrbanicity === 'Select an Urbanicity' ? 'Select' : selectedUrbanicity,
      innovation: selectedInnovation === 'Select an Innovation' ? 'Select' : selectedInnovation,
      adoption: 'Select' // Ignore adoption filter since we are calculating its stats
    };

    adoptionStats = calculateAdoptionStats(filters);
    console.log(adoptionStats)
  }

  function filterAndAggregateData(filters) {
    const filteredData = data
      .filter(d => d.level === 'level0')
      .filter(d =>
      Object.entries(filters).every(([key, value]) =>
        value === 'Select' || d[key] === value
      )
    );
    console.log(filteredData)
    const result = {};

    // Step 1: Aggregate data by key
    filteredData.forEach(item => {
      const key = Object.entries(filters)
        .filter(([_, value]) => value !== 'Select') // Include only selected filters
        .map(([key, value]) => `${key}-${value}`)
        .join('-') + `-${item.attribute}-${item.index}`;

      if (!result[key]) {
        result[key] = { ...item };
      } else {
        result[key].value += item.value;
      }
    });

    // Step 2: Compute attributeTotal per group (group by attribute)
    const groupedByAttribute = {};

    Object.values(result).forEach(item => {
      const groupKey = `${item.level}-${item.province}-${item.urbanicity}-${item.innovation}-${item.adoption}-${item.attribute}`;

      if (!groupedByAttribute[groupKey]) {
        groupedByAttribute[groupKey] = 0;
      }
      groupedByAttribute[groupKey] += item.value;
    });

    // Step 3: Assign attributeTotal and recalculate percentage
    return Object.values(result).map(item => {
      const groupKey = `${item.level}-${item.province}-${item.urbanicity}-${item.innovation}-${item.adoption}-${item.attribute}`;
      const attributeTotal = groupedByAttribute[groupKey];

      return {
        ...item,
        attributeTotal,
        percentage: attributeTotal > 0 ? parseFloat(((item.value / attributeTotal) * 100).toFixed(2)) : 0
      };
    });
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
    
    gender = dataToShow.filter(d => d.attribute === 'Gender')
    ageGroup = dataToShow.filter(d => d.attribute === 'Age Group')
    housingTypes = dataToShow.filter(d => d.attribute === 'Type of Housing')
    householdIncome = dataToShow.filter(d => d.attribute === 'Household Income')
    householdComposition = dataToShow.filter(d => d.attribute === 'Household Composition')
    console.log(gender, ageGroup, housingTypes, householdIncome, householdComposition)
  }

  function selectAdoption(stat) {
    selectedAdoption = stat.title;
  }

  const canadaStats = {
    population: "40.1 million",
    area: "9.985 million km²",
    capital: "Ottawa"
  };

  const locationData = [
    { region: "Ontario", value: 32, color: "bg-[#2F4144]" },
    { region: "Quebec", value: 22, color: "bg-[#5CD5C4]" },
    { region: "British Columbia", value: 13, color: "bg-[#3D5D5B]" },
    { region: "Alberta", value: 10, color: "bg-[#94A3A8]" },
    { region: "Prairies", value: 8, color: "bg-[#467A76]" },
    { region: "Atlantic Canada", value: 8, color: "bg-[#69A6A1]" },
    { region: "Northern Territories", value: 8, color: "bg-[#D9E1E6]" }
  ];

  const attributes = [
    { index: 'Household income', value: 'More than 130,000', percentage: 80 },
    { index: 'Household income', value: '100,001-130,000', percentage: 75 },
    { index: 'Age', value: '26-30', percentage: 60 },
    { index: 'Age', value: '31-40', percentage: 40 },
    { index: 'Gender', value: 'Men', percentage: 33 },
    { index: 'Household income', value: '70,001-100,000', percentage: 25 },
    { index: 'What is the relationship to you of the people living at your residence?', value: 'I live alone', percentage: 25 },
    { index: 'What is the relationship to you of the people living at your residence?', value: 'your spouse or common-law partner', percentage: 20 },
    { index: 'Gender', value: 'Women', percentage: 15 },
    { index: 'Household income', value: '40,001-70,000', percentage: 15 }
  ];
  
  const trustSources = [
    {
      index: "Information Verifiable through Other Sources",
      percentage: 90
    },
    {
      index: "Expert or Professional Driven Information",
      percentage: 75
    },
    {
      index: "Information from Non-Politically or Financially Motivated Orgs",
      percentage: 60
    },
    {
      index: "Information from Government Entities",
      percentage: 45
    },
    {
      index: "Professionally Presented Information",
      percentage: 30
    }
  ];

  const distrustSources = [
    {
      index: "Social Media (e.g. Facebook and Instagram)",
      percentage: 85
    },
    {
      index: "Online Marketplaces (e.g. FB Marketplace, Craigslist and Kijiji)",
      percentage: 70
    },
    {
      index: "Commercial Content (e.g. From Real Estate Firms & Influencers)",
      percentage: 55
    },
    {
      index: "Profit-Driven Companies",
      percentage: 40
    },
    {
      index: "Political Sources or Organizations with Ulterior Motives",
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
        <select bind:value={selectedInnovation} class="flex-1">
          {#each innovation as i}
            <option>{i}</option>
          {/each}
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
            <div class="m-2 p-4 rounded-lg relative cursor-pointer {selectedAdoption === stat.title ? 'bg-primary-darkgreen border-transparent' : 'border border-grey-linegreen'}"
                on:click={() => selectAdoption(stat)}
             >
              <p class="{selectedAdoption === stat.title ? 'text-white' : ''}">{stat.title}</p>
              <div class="flex justify-between items-end">
                <div class="flex flex-col justify-end">
                  <h4 class="{selectedAdoption === stat.title ? 'text-white' : ''}">{stat.count.toLocaleString()}</h4>
                  <span class="italic {selectedAdoption === stat.title ? 'text-white' : ''}"> homeowners</span>
                </div>
                <DonutChart percentage={stat.percentage} color={stat.variant} selected={selectedAdoption === stat.title ? true : false} />
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
        <div class="flex items-center justify-between border-t border-grey-linegreen cursor-pointer" on:click={() => selectAdoption(stat)}>
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
      <!-- <BarriersDrivers 
        barriers={barriers}
        drivers={drivers}
      /> -->
      <CurrentHousing 
        housingTypes={housingTypes}
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