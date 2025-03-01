<script>
  import { onMount, onDestroy } from 'svelte';
  import "../app.css";
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import CustomDropdown from '../lib/CustomDropdown.svelte';
  import Map from "../lib/Map.svelte";
  import DonutChart from "../lib/DonutChart.svelte";
  import Demographics from "../components/Demographics.svelte";
  import Attributes from "../components/Attributes.svelte";
  import BarriersDrivers from "../components/BarriersDrivers.svelte";
  import CurrentHousing from "../components/CurrentHousing.svelte";
  import KeyCommunication from "../components/KeyCommunication.svelte";
  import data_homeowners from '../data/data_homeowners.json';
  import data_residents from '../data/data_residents.json';
  import attributes_homeowners from '../data/attributes_homeowners.json';
  
  let mapGeoJSON = { features: [] };
  let selectedProvinceObj = {}
  let selectedProvince = 'Select a Province'
  let selectedUrbanicity = 'Select an Urbanicity';
  let selectedInnovation = 'ADU';
  let selectedAdoption = 'Select an Adoption';
  let selectedPersona = 'Homeowners';
  let dataToShow, gender, ageGroup, housingTypes, householdIncome, householdComposition, adoptionStats, barriers, drivers, locationData, keyInfo, provinces, urbanicity, innovation, attributes
  
  let isLoading = true;
  let personas = ['Homeowners', 'Residents'];

  onMount(() => {
    const header = document.querySelector('header');
    const adoptionSection = document.getElementById('adoptionSection');
    const mainContainer = document.querySelector('.w-full.bg-background-dark');
    
    if (header) {
      // Set header height CSS variable
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      
      if (adoptionSection && mainContainer) {
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.style.display = 'none';
        placeholder.style.height = `${adoptionSection.offsetHeight}px`;
        placeholder.id = 'adoptionPlaceholder';
        adoptionSection.parentNode.insertBefore(placeholder, adoptionSection);
        
        // Calculate initial position
        const initialPosition = adoptionSection.getBoundingClientRect().top + window.scrollY;
        
        // Get initial container dimensions and inner content
        const containerPadding = parseInt(window.getComputedStyle(mainContainer).paddingLeft) + 
                              parseInt(window.getComputedStyle(mainContainer).paddingRight);
        
        // Find the .grid element inside adoptionSection
        const gridElement = adoptionSection.querySelector('.grid');
        
        window.addEventListener('scroll', () => {
          if (window.scrollY > initialPosition - headerHeight) {
            if (!adoptionSection.classList.contains('is-sticky')) {
              // Add fixed positioning
              adoptionSection.classList.add('is-sticky');
              
              // Get container width and account for the padding of the parent container
              const containerWidth = mainContainer.clientWidth - containerPadding;
              
              // Set width to containerWidth minus any padding
              adoptionSection.style.width = `${containerWidth}px`;
              
              // For the grid layout, calculate the available space minus padding/margins
              if (gridElement) {
                // Ensure the grid gets full width minus any margins or padding
                gridElement.style.width = '100%';
                gridElement.style.maxWidth = '100%';
              }
              
              // Find the exact left position to align with original container
              const containerLeft = mainContainer.getBoundingClientRect().left;
              adoptionSection.style.left = `${containerLeft + parseInt(window.getComputedStyle(mainContainer).paddingLeft)}px`;
              
              // Show placeholder
              placeholder.style.display = 'block';
            }
          } else {
            if (adoptionSection.classList.contains('is-sticky')) {
              // Return to original positioning
              adoptionSection.classList.remove('is-sticky');
              adoptionSection.style.width = '';
              adoptionSection.style.left = '';
              
              // Reset grid styles
              if (gridElement) {
                gridElement.style.width = '';
                gridElement.style.maxWidth = '';
              }
              
              // Hide placeholder
              placeholder.style.display = 'none';
            }
          }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
          if (adoptionSection.classList.contains('is-sticky')) {
            // Get updated container width
            const containerWidth = mainContainer.clientWidth - containerPadding;
            adoptionSection.style.width = `${containerWidth}px`;
            
            // Update left position
            const containerLeft = mainContainer.getBoundingClientRect().left;
            adoptionSection.style.left = `${containerLeft + parseInt(window.getComputedStyle(mainContainer).paddingLeft)}px`;
          }
          
          // Update placeholder height
          placeholder.style.height = `${adoptionSection.offsetHeight}px`;
        });
      }
      
    }
  });

  onMount(async () => {
    try {
      const response = await fetch('/data/canada_provinces.geojson');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      mapGeoJSON = await response.json();
      isLoading = false;
    } catch (error) {
      console.error('Error loading GeoJSON:', error);
      isLoading = false;
    }
  });

  function selectAdoption(stat) {
    selectedAdoption = stat.title;
  }
  
  function calculateAdoptionStats(data, filters) {
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
      "High Perceived Neighbors' Support": "#6B7280",
      "Low Perceived Neighbors' Support": "#6B7280",
      "Adopted": "#2F4144",
      "High Willingness, High Capability": "#00C2B2",
      "High Willingness, Low Capability": "#00C2B2",
      "Low Willingness, High Capability": "#6B7280",
      "Low Willingness, Low Capability": "#6B7280",
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

  function getProvinceStats(data, filters) {
    const filteredData = data.filter(d =>
      Object.entries(filters).every(([key, value]) =>
        value === 'Select' || d[key] === value
      )
    );

    const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);

    const provinceSums = filteredData.reduce((acc, item) => {
      acc[item.province] = (acc[item.province] || 0) + item.value;
      return acc;
    }, {});

    const colorMap = {
      Ontario : "#319187",
      Quebec: "#23CEBC",
      "British Columbia": "#E38730",
      Alberta: "#F5AC91",
      Prairies: "#4598BC",
      "Atlantic Canada": "#8CC7D3",
      North : "#C6D0D0"
    };

    // Convert to an array with percentage calculation
    return Object.entries(provinceSums).map(([province, sum]) => ({
      index: province,
      value: sum,
      percentage: totalValue > 0 ? parseFloat(((sum / totalValue) * 100).toFixed(2)) : 0,
      color: colorMap[province]
    }));
  };

  function getBarriersDriversStats(data, filters, attr) {
    let filteredData = filterAndAggregateData(data.filter(d => d.attribute === attr), filters)
    filteredData.sort((a, b) => b.percentage - a.percentage)
    filteredData.forEach((d,i) => {
      d.number = i + 1
      d.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    })
    filteredData = filteredData.filter(d => d.description !== 'None of the above')
    return filteredData.slice(0,3)
  }

  function filterAndAggregateData(data, filters) {
    const filteredData = data
      .filter(d =>
      Object.entries(filters).every(([key, value]) =>
        value === 'Select' || d[key] === value
      )
    );

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
    const attributeTotal = filteredData.filter(d => d.attribute === 'Gender').reduce((sum, item) => sum + item.value, 0);

    // const groupedByAttribute = {};

    // Object.values(result).forEach(item => {
    //   const groupKey = `${item.level}-${item.province}-${item.urbanicity}-${item.innovation}-${item.adoption}-${item.attribute}`;

    //   if (!groupedByAttribute[groupKey]) {
    //     groupedByAttribute[groupKey] = 0;
    //   }
    //   groupedByAttribute[groupKey] += item.value;
    // });

    // Step 3: Assign attributeTotal and recalculate percentage
    return Object.values(result).map(item => {
      //const groupKey = `${item.level}-${item.province}-${item.urbanicity}-${item.innovation}-${item.adoption}-${item.attribute}`;
      //const attributeTotal = groupedByAttribute[groupKey];

      return {
        ...item,
        attributeTotal,
        percentage: attributeTotal > 0 ? parseFloat(((item.value / attributeTotal) * 100).toFixed(2)) : 0
      };
    });
  }

  $: {
    const data = selectedPersona === 'Homeowners' ? data_homeowners : data_residents

    provinces = ['Select a Province', ...new Set(data.map(d => d.province))]
    urbanicity = ['Select an Urbanicity', ...new Set(data.map(d => d.urbanicity))]
    innovation = ['Select an Innovation', ...new Set(data.map(d => d.innovation))]

    const filters = {
      province: selectedProvince === 'Select a Province' ? 'Select' : selectedProvince,
      urbanicity: selectedUrbanicity === 'Select an Urbanicity' ? 'Select' : selectedUrbanicity,
      innovation: selectedInnovation === 'Select an Innovation' ? 'Select' : selectedInnovation,
      adoption: selectedAdoption === 'Select an Adoption' ? 'Select' : selectedAdoption
    };

    dataToShow = filterAndAggregateData(data, filters);
    
    gender = dataToShow.filter(d => d.attribute === 'Gender')
    ageGroup = dataToShow.filter(d => d.attribute === 'Age Group')
    housingTypes = dataToShow.filter(d => d.attribute === 'Type of Housing')
    householdIncome = dataToShow.filter(d => d.attribute === 'Household Income')
    householdComposition = dataToShow.filter(d => d.attribute === 'Household Composition')
    keyInfo = dataToShow.filter(d => d.attribute === 'Key Pieces of Information')

    barriers = getBarriersDriversStats(data, filters, 'Barriers')
    drivers = getBarriersDriversStats(data, filters, 'Drivers')
    
    locationData = getProvinceStats(data.filter(d => d.attribute === 'Gender'), {...filters, province: 'Select'})

    if (!isLoading && mapGeoJSON?.features) {
      selectedProvinceObj = mapGeoJSON.features.find(d => d.properties.name === selectedProvince)?.properties 
        || {
          name: 'Select a Province',
          population: "40.1 million",
          area: "9.985 million",
          capital: "Ottawa"
        };
    }

    const filters1 = {
      province: selectedProvince === 'Select a Province' ? 'Select' : selectedProvince,
      urbanicity: selectedUrbanicity === 'Select an Urbanicity' ? 'Select' : selectedUrbanicity,
      innovation: selectedInnovation === 'Select an Innovation' ? 'Select' : selectedInnovation,
      adoption: 'Select' // Ignore adoption filter since we are calculating its stats
    };

    adoptionStats = calculateAdoptionStats(data, filters1);
    attributes = attributes_homeowners.filter(d => d.innovation === filters.innovation && d.adoption === filters.adoption)
    console.log(adoptionStats)
  }

  $: mapData = mapGeoJSON;
  
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

  function handleMenuToggle() {
    // Handle menu open/close logic
  }

  // Compute the grid class based on the persona
  $: gridColClass = selectedPersona === 'Homeowners' 
  ? 'grid-cols-2 lg:grid-cols-5 gap-0 xl:gap-4' 
  : 'grid-cols-2 lg:grid-cols-4 gap-0 xl:gap-4';
</script>

<Header on:toggleMenu={handleMenuToggle} />

<div class="flex flex-col md:flex-row h-auto">
  <aside id='dropdownPanel' class="relative md:sticky top-24 md:h-[calc(100vh-5rem)] flex-shrink-0 flex w-full md:w-64 bg-grey-darkgreen p-4 md:p-6 text-white overflow-y-auto">  
    <div class="space-y-2">
      <h3 class='text-white mb-8'>Filters</h3>
        <label class="block">Location</label>
        <div class="space-y-8">
          <div class="w-full flex md:block space-x-4 md:space-x-0">
            <CustomDropdown 
              options={provinces}
              value={selectedProvince}
              placeholder="Select a Province"
              onChange={(value) => selectedProvince = value}
            />
            <CustomDropdown 
              options={urbanicity}
              value={selectedUrbanicity}
              placeholder="Select an Urbanicity"
              onChange={(value) => selectedUrbanicity = value}
            />
          </div>

          <div class="w-full">
            <CustomDropdown 
              label="Which innovation are you focused on?"
              options={innovation}
              value={selectedInnovation}
              placeholder="Select an Innovation"
              onChange={(value) => selectedInnovation = value}
            />
          </div>

          <div class="w-full">
            <CustomDropdown 
              label="Who are you looking to learn about?"
              options={personas}
              value={selectedPersona}
              placeholder="Select a Persona"
              onChange={(value) => selectedPersona = value}
            />
          </div>
        </div>
      
    </div>
  </aside>
  
  <div class='w-full bg-background-dark pt-28'>
  <main class="hidden sm:block h-[calc(100vh-5.5rem)] bg-background-dark px-3 sm:px-6 pb-2 my-3 sm:my-0">
    <div class="relative h-full">
      {#if mapGeoJSON?.features?.length > 0}
        <Map bind:selectedProvince data={mapData} />
      {:else}
        <div class="caption flex items-center justify-center h-screen">Loading map data...</div>
      {/if}
      <div class="absolute top-2 left-0 bg-white p-4 rounded-lg min-w-50">
          <h2 class="mb-4">{selectedProvince === 'Select a Province' ? 'Canada' : selectedProvince}</h2>
          <div class="space-y-2">
            <div class="flex gap-4">
              <span class="caption1">Population</span>
              <span class='body-s'>{selectedProvinceObj.population || "-"}</span>
            </div>
            <div class="flex gap-4">
              <span class="caption1">Area</span>
              <span class='body-s'>{selectedProvinceObj.area || "-" + " km²"}</span>
            </div>
            <div class="flex gap-4">
              <span class="caption1">Capital</span>
              <span class='body-s'>{selectedProvinceObj.capital || "-"}</span>
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

      <div id="adoptionSection" class="sticky-panel w-full">
        <p class="subtitle-s ml-2 mb-3">Adoption Potential</p>
        <div class={`grid ${gridColClass}`}>
          {#each adoptionStats as stat}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
              class="flex flex-col justify-between m-1 xl:m-2 p-4 rounded-lg relative cursor-pointer {
                  selectedAdoption === stat.title 
                      ? 'bg-primary-darkgreen border-transparent text-white' 
                      : 'bg-background-dark border border-grey-linegreen text-current'
              }"
              on:click={() => selectAdoption(stat)}
            >
              <p class="mb-2 {selectedAdoption === stat.title ? 'text-white' : ''}">{stat.title}</p>
              <div class="flex justify-between items-end">
                <div class="flex flex-col justify-end">
                  <div class="hidden xl:block">
                    <h4 class="{selectedAdoption === stat.title ? 'text-white' : ''}">{stat.count.toLocaleString()}</h4>
                  </div>
                  <div class="block xl:hidden">
                    <h4 class="font-secondary text-base leading-[18px] font-medium {selectedAdoption === stat.title ? 'text-white' : ''}">{stat.count.toLocaleString()}</h4>
                  </div>
                                    
                  <span class="font-secondary text-xs leading-[18px] font-medium italic {selectedAdoption === stat.title ? 'text-white' : 'text-primary-darkgreen'}"> homeowners</span>
                </div>
                <div class="hidden xl:block">
                  <DonutChart size='large' percentage={stat.percentage} color={stat.variant} selected={selectedAdoption === stat.title ? true : false} />
                </div>
                <div class="block xl:hidden">
                  <DonutChart size='medium' percentage={stat.percentage} color={stat.variant} selected={selectedAdoption === stat.title ? true : false} />
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </main>
  
  <main class="block sm:hidden bg-background-dark px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div id="mobileAdoptionSection">
      <p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p>
      <div class="mt-3">
        {#each adoptionStats as stat}
          <div 
            class="flex items-center justify-between border-t border-grey-linegreen cursor-pointer p-2 rounded-md transition-colors duration-200 {
              selectedAdoption === stat.title 
                ? 'bg-white shadow-sm text-primary-darkgreen' 
                : 'hover:bg-gray-50'
            }" 
            on:click={() => selectAdoption(stat)}
          >
            <div class='caption mt-5'>{stat.title}</div>          
            <div class="flex items-center gap-4">
              <span>
                <span class="body-s italic">{stat.count}</span>
                <span class="body-s italic"> homeowners</span>
              </span>
              
              <div class="w-32 flex items-center justify-end gap-2 mt-2">
                <h3>{stat.percentage}%</h3>
                <DonutChart 
                  size='small' 
                  percentage={stat.percentage} 
                  color={stat.variant} 
                  bgcolor={selectedAdoption === stat.title ? '#FFFFFF' : '#C6D0D0'} 
                  showPercentages={false} 
                  showDonut={false} 
                />
              </div>
            </div>
          </div>
        {/each}
      </div>
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
      {#if selectedPersona == 'Homeowners' && attributes.length > 0}
        <Attributes data={attributes} />
      {/if}
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
        householdComposition={householdComposition}
      />
    </div>
  </main>

  <main class="flex bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <KeyCommunication 
      keyInfo={keyInfo}
      trustSources={trustSources}
      distrustSources={distrustSources}
    />
  </main>
  </div>
</div>

<Footer />

<style>
 :global(body) {
   margin: 0;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
 }

  /* Normal state: at the bottom of the map */
  .sticky-panel {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  /* Sticky state: using CSS position: sticky */
  @media (min-width: 640px) { /* sm breakpoint */
    .sticky-panel.is-sticky {
      position: fixed;
      top: var(--header-height, 95px); /* Fallback value */
      bottom: auto;
      z-index: 20;
      padding: 0px 24px;
      background-color: #EBF0F0;
    }
  }
</style>