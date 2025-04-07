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
  import { goto } from '$app/navigation';

  let adoptionTitleRef;
  let mapGeoJSON = { features: [] };
  let selectedProvinceObj = {}
  let selectedProvince = 'Select a Province'
  let selectedUrbanicity = 'Select an Urbanicity';
  let selectedInnovation = 'ADU';
  let selectedAdoption = 'Adopted';
  let selectedPersona = 'Homeowners';
  let dataToShow, gender, ageGroup, housingTypes, householdIncome, householdComposition, adoptionStats, barriers, drivers, locationData, keyInfo, provinces, urbanicity, innovation, attributes
  
  let isLoading = true;
  let personas = ['Homeowners', 'Residents'];
  let hoveredCard = null;
  let isLargeScreen = false;

  onMount(() => {
    // Check initial screen size
    isLargeScreen = window.innerWidth >= 1024;
    
    // Add resize listener
    const handleResize = () => {
      isLargeScreen = window.innerWidth >= 1024;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on component destroy
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  $: selectedAdoption = (selectedPersona === 'Residents' && selectedAdoption === 'Adopted') ? 'High Personal Support' : selectedAdoption

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

  function directToCompare() {
    goto('/compare')
  }

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
      "Adopted": "#319187",
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
        .filter(d => {
            return Object.entries(filters).every(([key, value]) => {
                return value === 'Select' || d[key] === value;
            })
        }
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
    if(selectedPersona === 'Homeowners') {
      attributes = attributes_homeowners.filter(d => d.innovation === filters.innovation && d.adoption === filters.adoption)
    } else {
      attributes = []
    }
    console.log(attributes)
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
  ? 'grid-cols-3 md: grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1' 
  : 'grid-cols-3 md: grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1';
</script>

<Header on:toggleMenu={handleMenuToggle} />

<div class="flex flex-col md:flex-row h-auto">
  <aside id='dropdownPanel' class="relative md:sticky top-0 md:h-[calc(100vh)] flex-shrink-0 flex w-full md:w-64 bg-grey-darkgreen p-4 md:p-6 text-white overflow-y-auto"> 
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
  
  <div class='w-full bg-background-dark pt-4'>
  <main class="hidden sm:block h-[calc(100vh-5.5rem)] bg-background-dark pb-3">
    <div class="relative h-full">
      {#if mapGeoJSON?.features?.length > 0}
        <Map bind:selectedProvince data={mapData} />
      {:else}
        <div class="caption flex items-center justify-center h-screen">Loading map data...</div>
      {/if}
      <div class="absolute top-2 left-6">
        <div class="text-white bg-white rounded-lg min-w-[220px]">
          <div class="bg-grey-darkgreen rounded-lg p-4">
            <h2 class="text-3xl font-medium text-white text-center">{selectedProvince === 'Select a Province' ? 'Canada' : selectedProvince}</h2>
          </div>
          <div class="space-y-3 p-4">
            <div class="flex space-x-3">
              <span class="caption1">Population</span>
              <span class="body-s">{selectedProvinceObj.population || "-"}</span>
            </div>
            <div class="flex space-x-3">
              <span class="caption1">Area</span>
              <span class="body-s">{selectedProvinceObj.area || "-"}</span>
            </div>
            <div class="flex space-x-3">
              <span class="caption1">Capital</span>
              <span class='body-s'>{selectedProvinceObj.capital || "-"}</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="absolute top-2 right-6">
            <div class="flex flex-col gap-4">
              <!-- <button class="px-2 py-2 border border-teal-500 text-teal-500 rounded-sm flex items-center gap-2">
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
              </button> -->
              <button on:click={directToCompare}>
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7964 2.85538L9.10753 1.16651C8.81451 0.873486 8.41708 0.708864 8.00268 0.708862H2.39988C1.56661 0.708862 0.885694 1.36112 0.839844 2.18293V12.7765C0.885226 13.5899 1.55277 14.2372 2.37441 14.2503L9.69155 14.2505C10.5545 14.2505 11.254 13.551 11.254 12.688V3.96023C11.254 3.54583 11.0894 3.1484 10.7964 2.85538ZM2.5952 12.688C2.5434 12.688 2.49372 12.6675 2.45709 12.6308C2.42046 12.5942 2.39988 12.5445 2.39988 12.4927V2.46667C2.39988 2.41487 2.42046 2.3652 2.45709 2.32857C2.49372 2.29194 2.5434 2.27136 2.5952 2.27136H6.04572V5.13595C6.04572 5.56742 6.39549 5.9172 6.82697 5.9172H9.69155V12.4927C9.69155 12.5445 9.67097 12.5942 9.63434 12.6308C9.59772 12.6675 9.54804 12.688 9.49624 12.688H2.5952ZM9.69155 4.3547H7.60822V2.27136H7.92176C7.97355 2.27136 8.02322 2.29194 8.05988 2.32856L9.63436 3.90304C9.65249 3.92117 9.66688 3.94271 9.67669 3.96641C9.6865 3.9901 9.69155 4.0155 9.69155 4.04115V4.3547Z" fill="#319187"/>
                  <path d="M6.39863 8.79666H4.21572C4.07839 8.79666 3.96705 8.908 3.96705 9.04533V9.60303C3.96705 9.74036 4.07839 9.8517 4.21572 9.8517H6.39863L6.37783 10.5556C6.37783 10.8879 6.77909 11.0538 7.01407 10.8188L8.24495 9.58794C8.39062 9.44227 8.39115 9.20662 8.24548 9.06095L7.0146 7.83007C6.77961 7.59508 6.37783 7.76151 6.37783 8.09384L6.39863 8.79666Z" fill="#319187"/>
                  <path d="M13.9407 13.4023H16.1236C16.261 13.4023 16.3723 13.291 16.3723 13.1536V12.5959C16.3723 12.4586 16.261 12.3473 16.1236 12.3473H13.9407L13.9615 11.6434C13.9615 11.3111 13.5603 11.1452 13.3253 11.3802L12.0944 12.611C11.9487 12.7567 11.9482 12.9924 12.0939 13.138L13.3248 14.3689C13.5597 14.6039 13.9615 14.4375 13.9615 14.1051L13.9407 13.4023Z" fill="#319187"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4993 4.85548L18.1882 6.54434C18.4812 6.83737 18.6458 7.2348 18.6458 7.64919V16.377C18.6458 17.24 17.9463 17.9395 17.0833 17.9395L9.76617 17.9393C8.94453 17.9262 8.27699 17.2788 8.23161 16.4654V13.3682H9.79165V16.1817C9.79165 16.2335 9.81222 16.2832 9.84885 16.3198C9.88548 16.3564 9.93516 16.377 9.98696 16.377H16.888C16.9398 16.377 16.9895 16.3564 17.0261 16.3198C17.0627 16.2832 17.0833 16.2335 17.0833 16.1817V9.60616H14.2187C13.7873 9.60616 13.4375 9.25639 13.4375 8.82491V5.96033H10.8317V4.55896H9.09978C9.30833 4.4558 9.54322 4.39783 9.79165 4.39783H15.3944C15.8088 4.39783 16.2063 4.56245 16.4993 4.85548ZM15 8.04366H17.0833V7.73012C17.0833 7.70447 17.0783 7.67907 17.0685 7.65537C17.0586 7.63167 17.0443 7.61014 17.0261 7.592L15.4516 6.01752C15.415 5.9809 15.3653 5.96033 15.3135 5.96033H15V8.04366Z" fill="#319187"/>
                  </svg>                  
                <span class="button-label">COMPARE</span>
              </button>
            </div>
      </div>

      <div class="adoption-title-wrapper" bind:this={adoptionTitleRef}>
        <p class="subtitle-s ml-8 mb-4">
          Adoption Potential 
          <span class="text-primary-green italic">
            for {selectedInnovation}
          </span>
        </p>
      </div>
      
      <div id="adoptionSection" class="sticky-panel w-full bg-background-dark">
        <div class={`grid ${gridColClass} px-3 sm:px-4 lg:px-6 py-2 sm:py-3`}>
          {#each adoptionStats as stat}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
              class="flex flex-col justify-between m-0.5 sm:m-1 xl:m-2 p-2 sm:p-3 lg:p-4 rounded-lg relative {
                  selectedAdoption === stat.title 
                      ? 'bg-primary-darkgreen border-transparent text-white' 
                      : 'bg-background-dark border border-grey-linegreen text-current hover:bg-white cursor-pointer'
              }"
              on:click={() => selectAdoption(stat)}
              on:mouseenter={() => selectedAdoption !== stat.title && (hoveredCard = stat.title)}
              on:mouseleave={() => selectedAdoption !== stat.title && (hoveredCard = null)}
            >
              <div class="caption {selectedAdoption === stat.title ? 'text-white !text-white' : ''}">{stat.title}</div>
              <div class="flex justify-between items-end">
                <div class="flex flex-col justify-end flex-shrink-0">
                  <div class="hidden xl:block">
                    <h4 class="{selectedAdoption === stat.title ? 'text-white' : ''}">{stat.count.toLocaleString()}</h4>
                  </div>
                  <div class="block xl:hidden">
                    <h4 class="{selectedAdoption === stat.title ? 'text-white' : ''}">{stat.count.toLocaleString()}</h4>
                  </div>          
                  <div class="body-s italic {selectedAdoption === stat.title ? 'text-white !text-white' : ''}"> homeowners</div>
                </div>
                <div class="hidden xl:block rounded-full transition-colors duration-200 ml-1 sm:ml-2">
                  <DonutChart 
                    size='large' 
                    percentage={stat.percentage} 
                    color={stat.variant} 
                    selected={selectedAdoption === stat.title ? true : false}
                    isHovered={hoveredCard === stat.title}
                  />
                </div>
                <div class="block xl:hidden rounded-full transition-colors duration-200 ml-1 sm:ml-2 transform scale-[0.6] sm:scale-75 md:scale-90 origin-right">
                  <DonutChart 
                    size='medium' 
                    percentage={stat.percentage} 
                    color={stat.variant} 
                    selected={selectedAdoption === stat.title ? true : false}
                    isHovered={hoveredCard === stat.title}
                  />
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </main>
  
  <main class="block sm:hidden bg-background-dark px-4 sm:px-8 py-3">
    <div id="mobileAdoptionSection">
      <p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for {selectedInnovation === 'Select an Innovation' ? '' : selectedInnovation}</span></p>
      <div class="mt-3">
        {#each adoptionStats as stat}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
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
                <div class="hover:bg-white rounded-full transition-colors duration-200">
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
          </div>
        {/each}
      </div>
    </div>
  </main>

  <main class="bg-background-light px-4 sm:px-8 py-3">
    <div class={`w-full mx-auto grid grid-cols-1 lg:grid-cols-${attributes.length > 0 ? 2 : 1} gap-4 sm:gap-6 mt-5`}>
      <Demographics
        gender={gender}
        ageGroup={ageGroup}
        householdIncome={householdIncome}
        locationData={locationData}
        format={attributes.length > 0 || !isLargeScreen ? 'block' : 'flex'}
      />
      {#if attributes.length > 0}
        <Attributes data={attributes} />
      {/if}
    </div>
  </main>
    
  <main class="min-h-screen bg-background-light px-4 sm:px-8 py-3">
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

  <main class="flex bg-background-light px-4 sm:px-8 py-3 pb-6">
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
    --adoption-height: 200px; /* Adjust this value based on your actual content height */
  }
  
  /* Sticky state: using CSS position: sticky */
  @media (min-width: 640px) { /* sm breakpoint */
    .sticky-panel.is-sticky {
      position: fixed;
      top: 0; /* Changed from var(--header-height) to 0 */
      bottom: auto;
      z-index: 20;
      background-color: #EBF0F0;
    }
  }

  .adoption-title-wrapper {
    position: absolute;
    top: calc(100vh - 320px);
    left: 0;
    width: 100%;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .button-label {
    font-family: Sailec;
    font-weight: 700;
    font-size: 14px;
    line-height: 143%;
    letter-spacing: 1px;
    vertical-align: middle;
    text-transform: uppercase;
    color: #319187;
  }
  
  button {
    display: flex;
    width: 164px;
    height: 44px;
    border-radius: 4px;
    border-width: 1px;
    gap: 10px;
    padding: 12px;
    background: #FFFFFF;
    border: 1px solid #C6D0D0;
    box-shadow: 0px 2px 4px 0px #14B5A433;
  }
</style>