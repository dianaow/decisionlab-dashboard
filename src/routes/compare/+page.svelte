<script>
  import "../../app.css";
  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import CompareHeader from '../../components/CompareHeader.svelte';
  import FilterPanel from '../../lib/FilterPanel.svelte';
  import DonutChart from "../../lib/DonutChart.svelte";
  import Demographics from "../../components/Demographics.svelte";
  import Attributes from "../../components/Attributes.svelte";
  import BarriersDrivers from "../../components/BarriersDrivers.svelte";
  import CurrentHousing from "../../components/CurrentHousing.svelte";
  import KeyCommunication from "../../components/KeyCommunication.svelte";
  import data_homeowners from '../../data/data_homeowners.json';
  import data_residents from '../../data/data_residents.json';
  import attributes_homeowners from '../../data/attributes_homeowners.json';

  // Initial states for both panels
  let panel1Values = {
    province: 'Alberta',
    urbanicity: 'Select an Urbanicity',
    innovation: 'ADU',
    adoption: 'Select an Adoption',
    persona: 'Homeowners'
  };
   
  let panel2Values = {
    province: 'Ontario',
    urbanicity: 'Select an Urbanicity',
    innovation: 'ADU',
    adoption: 'Select an Adoption',
    persona: 'Homeowners'
  };

  let data1, data2, dataAll1, dataAll2

  // Handle changes from each panel
  function handlePanel1Change(event) {
    panel1Values = event.detail;
  }

  function handlePanel2Change(event) {
    panel2Values = event.detail;
  }

  function selectAdoption1(stat) {
    panel1Values.adoption = stat.title;
  }

  function selectAdoption2(stat) {
    panel2Values.adoption = stat.title;
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
    const filteredData = filterAndAggregateData(data.filter(d => d.attribute === attr), filters)
    filteredData.sort((a, b) => b.percentage - a.percentage)
    filteredData.forEach((d,i) => {
      d.number = i + 1
      d.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    })
    return filteredData.slice(0,3)
  }

  function filterAndAggregateData(data, filters) {
    const filteredData = data
      .filter(d => {
        return Object.entries(filters).every(([key, value]) => {
          if(key === 'persona') return true; // Skip persona check
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

    // Step 3: Assign attributeTotal and recalculate percentage
    return Object.values(result).map(item => {
      return {
        ...item,
        attributeTotal,
        percentage: attributeTotal > 0 ? parseFloat(((item.value / attributeTotal) * 100).toFixed(2)) : 0
      };
    });
  }

  function filterAllData(data, filters) {
    filters = {
      province: filters.province === 'Select a Province' ? 'Select' : filters.province,
      urbanicity: filters.urbanicity === 'Select an Urbanicity' ? 'Select' : filters.urbanicity,
      innovation: filters.innovation === 'Select an Innovation' ? 'Select' : filters.innovation,
      adoption: filters.adoption === 'Select an Adoption' ? 'Select' : filters.adoption
    };

    const dataToShow = filterAndAggregateData(data, filters);
    const gender = dataToShow.filter(d => d.attribute === 'Gender')
    const ageGroup = dataToShow.filter(d => d.attribute === 'Age Group')
    const housingTypes = dataToShow.filter(d => d.attribute === 'Type of Housing')
    const householdIncome = dataToShow.filter(d => d.attribute === 'Household Income')
    const householdComposition = dataToShow.filter(d => d.attribute === 'Household Composition')
    const keyInfo = dataToShow.filter(d => d.attribute === 'Key Pieces of Information')

    const barriers = getBarriersDriversStats(data, filters, 'Barriers')
    const drivers = getBarriersDriversStats(data, filters, 'Drivers')
    
    const locationData = getProvinceStats(data.filter(d => d.attribute === 'Gender'), {...filters, province: 'Select'})
    const adoptionStats = calculateAdoptionStats(data, {...filters, adoption: 'Select'});
    const attributes = attributes_homeowners.filter(d => d.innovation === filters.innovation && d.adoption === filters.adoption)

    return {gender, ageGroup, housingTypes, householdIncome, householdComposition, keyInfo, barriers, drivers, locationData, adoptionStats, attributes}
  }

  $: {
    dataAll1 = panel1Values.persona === 'Homeowners' ? data_homeowners : data_residents
    dataAll2 = panel2Values.persona === 'Homeowners' ? data_homeowners : data_residents
    data1 = filterAllData(dataAll1, panel1Values)
    data2 = filterAllData(dataAll2, panel2Values)
    console.log(panel1Values, data1)
  }

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

  function handleBack() {
    // Handle back navigation
  }

  function handleDownload() {
    // Handle download action
  }

  function handleShare() {
    // Handle share action
  }

  function handleMenuToggle() {
    // Handle menu open/close logic
  }
</script>
<div class="flex flex-col h-auto">
  <Header on:toggleMenu={handleMenuToggle} />
  <CompareHeader 
    on:back={handleBack}
    on:download={handleDownload}
    on:share={handleShare}
  />
  <aside id='dropdownPanel' class="mt-6 grid grid-cols-2 gap-6 w-full bg-grey-darkgreen px-6 text-white">    
    <div>
      <FilterPanel 
        id="panel1"
        data={dataAll1}
        selectedValues={panel1Values}
        on:change={handlePanel1Change}
      />
    </div>
    <div>
      <FilterPanel 
        id="panel2"
        data={dataAll2}
        selectedValues={panel2Values}
        on:change={handlePanel2Change}
      />
    </div>
  </aside>

 <div class='w-full bg-background-dark'> 
  <main class="grid grid-cols-2 gap-6 bg-background-dark px-4 sm:px-8 py-3 my-3 sm:my-0">
    <div>
      <p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p>
      <div class="space-y-2 mt-3">
        {#each data1.adoptionStats as stat}
          <div 
            class="flex items-center justify-between border-t border-grey-linegreen cursor-pointer p-2 rounded-md transition-colors duration-200 {
              panel1Values.adoption === stat.title 
                ? 'bg-white shadow-sm text-primary-darkgreen' 
                : 'hover:bg-gray-50'
            }" 
            on:click={() => selectAdoption1(stat)}
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
                  bgcolor={'#C6D0D0'} 
                  showPercentages={false} 
                  showDonut={false} 
                />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <div>
      <p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p>
      <div class="space-y-2 mt-3">
        {#each data2.adoptionStats as stat}
          <div 
            class="flex items-center justify-between border-t border-grey-linegreen cursor-pointer p-2 rounded-md transition-colors duration-200 {
              panel2Values.adoption === stat.title 
                ? 'bg-white shadow-sm text-primary-darkgreen' 
                : 'hover:bg-gray-50'
            }" 
            on:click={() => selectAdoption2(stat)}
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
                  bgcolor={'#C6D0D0'} 
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
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6 mt-5">
      <Demographics
        gender={data1.gender}
        ageGroup={data1.ageGroup}
        householdIncome={data1.householdIncome}
        locationData={data1.locationData}
      />
      <Demographics
        gender={data2.gender}
        ageGroup={data2.ageGroup}
        householdIncome={data2.householdIncome}
        locationData={data2.locationData}
      />
    </div>
  </main>
   
  <main class="bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6 mt-5">
      {#if panel1Values.persona == 'Homeowners' && data1.attributes.length > 0}
        <Attributes data={data1.attributes} />
      {/if}
      {#if panel2Values.persona == 'Homeowners' && data2.attributes.length > 0}
        <Attributes data={data2.attributes} />
      {/if}
    </div>
  </main>

  <main class="bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6">
      <BarriersDrivers 
        barriers={data1.barriers}
        drivers={data1.drivers}
      />
      <BarriersDrivers 
        barriers={data2.barriers}
        drivers={data2.drivers}
      />
    </div>
  </main>

  <main class="bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6">
      <CurrentHousing 
        housingTypes={data1.housingTypes}
        householdComposition={data1.householdComposition}
      />
      <CurrentHousing 
        housingTypes={data2.housingTypes}
        householdComposition={data2.householdComposition}
      />
    </div>
  </main>

  <main class="flex bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">
    <KeyCommunication 
      keyInfo={data1.keyInfo}
      trustSources={trustSources}
      distrustSources={distrustSources}
    />
    <KeyCommunication 
      keyInfo={data2.keyInfo}
      trustSources={trustSources}
      distrustSources={distrustSources}
    />
  </main>
 </div>
 <Footer />
</div>

<style>
 :global(body) {
   margin: 0;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
 }
</style>