<script>
   import "./app.css";
   import DonutChart from "./lib/DonutChart.svelte";
   import DonutChartLarge from "./lib/DonutChartLarge.svelte";

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

  const genderData = [
    { label: "Male", value: 65, color: "bg-[#2F4144]" },
    { label: "Female", value: 35, color: "bg-[#5CD5C4]" }
  ];

  const ageGroups = [
    { range: "26 - 30", male: 7, female: 5, total: 12 },
    { range: "31 - 40", male: 12, female: 10, total: 22 },
    { range: "41 - 50", male: 14, female: 12, total: 26 },
    { range: "51 - 60", male: 9, female: 6, total: 15 },
    { range: "61 - 70", male: 5, female: 3, total: 8 },
    { range: "71 - 80", male: 8, female: 6, total: 14 },
    { range: "81 - 90", male: 2, female: 1, total: 3 }
  ];

  const incomeData = [
    { range: "More than $130,000", value: 18, color: "bg-[#5CD5C4]" },
    { range: "$100,001 - $130,000", value: 15, color: "bg-[#5CD5C4]" },
    { range: "$70,001 - $100,000", value: 20, color: "bg-[#5CD5C4]" },
    { range: "$40,001 - $70,000", value: 22, color: "bg-[#E5F6F4]" },
    { range: "Less than $40,000", value: 16, color: "bg-[#E5F6F4]" }
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

  const attributes = [
    { label: 'Household income', value: 'More than 130,000', width: 'w-4/5' },
    { label: 'Household income', value: '100,001-130,000', width: 'w-3/4' },
    { label: 'Age', value: '26-30', width: 'w-3/5' },
    { label: 'Age', value: '31-40', width: 'w-2/5' },
    { label: 'Gender', value: 'Men', width: 'w-1/3' },
    { label: 'Household income', value: '70,001-100,000', width: 'w-1/4' },
    { label: 'What is the relationship to you of the people living at your residence?', value: 'I live alone', width: 'w-1/4' },
    { label: 'What is the relationship to you of the people living at your residence?', value: 'your spouse or common-law partner', width: 'w-1/5' },
    { label: 'Gender', value: 'Women', width: 'w-1/6' },
    { label: 'Household income', value: '40,001-70,000', width: 'w-1/6' }
  ];

  const barriers = [
    {
      number: 1,
      title: "Minimize Outdoor space",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    },
    {
      number: 2,
      title: "Permit / Regulatory Complexity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    },
    {
      number: 3,
      title: "Traffic and Parking Concerns",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    }
  ];

  const drivers = [
    {
      number: 1,
      title: "Benefits Vulnerable Population",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    },
    {
      number: 2,
      title: "Addresses Community Social Issues like Homelessness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    },
    {
      number: 3,
      title: "Brings More Affordable Housing to Community",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    }
  ];

  const housingTypes = [
    { label: "Renters", value: 80 },
    { label: "Owners", value: 65 },
    { label: "Type 3", value: 55 },
    { label: "Type 4", value: 35 },
    { label: "Type 5", value: 25 }
  ];

  const buildingTypes = [
    { label: "Single family home", value: 75 },
    { label: "Apartment (in a building with more than 12 units)", value: 65 },
    { label: "Duplex, triplex, fourplex", value: 45 },
    { label: "Accessory Dwelling Unit", value: 35 },
    { label: "Townhouse, row house or semi-detached house", value: 25 }
  ];

  const householdSize = [
    { label: "2 - 3 people", value: 85 },
    { label: "4 - 6 people", value: 65 },
    { label: "1 person", value: 45 },
    { label: "7 - 10", value: 35 },
    { label: "10 and more", value: 25 }
  ];

  const householdComposition = [
    { label: "Spouse or common-law partner", value: 75 },
    { label: "Multiple of children (birth, adopted, step or foster)", value: 65 },
    { label: "Parent(s) (including in-laws)", value: 45 },
    { label: "Child (birth, adopted, step or foster)", value: 35 },
    { label: "Grandparent(s) (including in-laws)", value: 25 }
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

  const trustSources = [
    {
      text: "Information Verifiable through Other Sources",
      value: 90
    },
    {
      text: "Expert or Professional Driven Information",
      value: 75
    },
    {
      text: "Information from Non-Politically or Financially Motivated Orgs",
      value: 60
    },
    {
      text: "Information from Government Entities",
      value: 45
    },
    {
      text: "Professionally Presented Information",
      value: 30
    }
  ];

  const distrustSources = [
    {
      text: "Social Media (e.g. Facebook and Instagram)",
      value: 85
    },
    {
      text: "Online Marketplaces (e.g. FB Marketplace, Craigslist and Kijiji)",
      value: 70
    },
    {
      text: "Commercial Content (e.g. From Real Estate Firms & Influencers)",
      value: 55
    },
    {
      text: "Profit-Driven Companies",
      value: 40
    },
    {
      text: "Political Sources or Organizations with Ulterior Motives",
      value: 25
    }
  ];
</script>

<div class="flex h-auto bg-gray-100">
  <aside id='dropdownPanel' class="w-64 bg-slate-700 p-6 text-white">
    <h2 class="text-xl mb-6">Filters</h2>
    
    <div class="space-y-6">
      <div>
        <label class="block mb-2">Location</label>
        <select class="w-full bg-slate-600 p-2 rounded">
          <option>Select a Province</option>
        </select>
        <select class="w-full bg-slate-600 p-2 rounded mt-2">
          <option>Select an Urbanicity</option>
        </select>
      </div>

      <div>
        <label class="block mb-2">How would you describe yourself?</label>
        <select class="w-full bg-slate-600 p-2 rounded">
          <option>Select a descriptor</option>
        </select>
      </div>

      <div>
        <label class="block mb-2">Which innovation are you focused on?</label>
        <select class="w-full bg-slate-600 p-2 rounded">
          <option>Select an innovation</option>
        </select>
      </div>

      <div>
        <label class="block mb-2">Who are you looking to learn about?</label>
        <select class="w-full bg-white p-2 rounded text-slate-700">
          <option>Homeowners</option>
        </select>
      </div>
    </div>
  </aside>

  <div class='w-full'>
    <main class="h-screen">
      <div class="map relative h-full">
        <!-- Canada Stats Card -->
        <div class="absolute top-8 left-8 bg-white p-4 rounded-lg shadow-sm">
          <h2 class="text-3xl mb-4">Canada</h2>
          <div class="space-y-2">
            <div class="flex gap-4">
              <span class="text-gray-500">Population</span>
              <span>{canadaStats.population}</span>
            </div>
            <div class="flex gap-4">
              <span class="text-gray-500">Area</span>
              <span>{canadaStats.area}</span>
            </div>
            <div class="flex gap-4">
              <span class="text-gray-500">Capital</span>
              <span>{canadaStats.capital}</span>
            </div>
          </div>
        </div>
  
        <!-- Action Buttons -->
         <div class="absolute top-8 right-8">
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
  
        <!-- Adoption Potential Section -->
        <div class="absolute bottom-8 w-full">
          <h2 class="text-xl ml-6 mb-6">Adoption Potential</h2>
          <div class="grid grid-flow-col justify-stretch ">
            {#each adoptionStats as stat}
              <div class="bg-white m-4 p-4 rounded-lg shadow-sm relative">
                <p class="text-black mb-4">{stat.title}</p>
                <div class="flex justify-between items-end">
                  <div class="flex flex-col justify-end">
                    <span class="text-2xl font-semibold">{stat.count}</span>
                    <span class="text-xs text-italic text-gray-500">{stat.type}</span>
                  </div>
                  <DonutChart percentage={stat.percentage} color={stat.variant} />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </main>
  
    <main class="min-h-screen flex bg-gray-50 pt-8 px-8">
      <div class="w-1/2 mx-auto p-3">
        <div class='bg-white p-6 rounded-lg'>
          <header class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-serif text-teal-dark">Demographics</h1>
            <button class="text-gray-400">•••</button>
          </header>
          
          <div class="bg-white border border-customGray-100 rounded-3xl p-6 mb-6">
            <div class="grid grid-cols-2 gap-12">
              <!-- Gender Section -->
              <div class="flex flex-col">
                <p class="text-sm font-bold text-teal-dark mb-4">Gender</p>
                <div class="flex gap-8 mb-4">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-3 bg-teal-dark rounded-full"></div>
                    <span class="text-sm text-teal-dark">Male</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-3 bg-teal-light rounded-full"></div>
                    <span class="text-sm text-teal-dark">Female</span>
                  </div>
                </div>
                <div class="flex-1 w-5/6">
                  <DonutChartLarge
                    segments={[
                      { percentage: 65, color: '#2F4858' },
                      { percentage: 35, color: '#4ECDC4' }
                    ]}
                    thickness="25%"
                    showPercentages={true}
                  />
                </div>
              </div>
      
              <!-- Age Groups Section -->
              <div>
                <p class="text-sm font-bold text-teal-dark mb-4">Age Group</p>
                <div class="space-y-2">
                  {#each ageGroups as group}
                    <div class="flex items-center gap-3">
                      <span class="w-16 text-sm text-teal-dark">{group.range}</span>
                      <div class="flex-1 h-4 relative"> <!-- Container for overlapping bars -->
                        <!-- Male bar (bottom) -->
                        <div 
                          class="absolute top-0 left-0 h-full bg-teal-dark rounded-full" 
                          style="width: {group.male + group.female}%"
                        ></div>
                        <!-- Female bar (top) -->
                        <div 
                          class="absolute top-0 left-0 h-full bg-teal-light rounded-full" 
                          style="width: {group.female}%"
                        ></div>
                      </div>
                      <!-- Label positioned relative to container -->
                      <span 
                        class="w-8 text-sm text-teal-light"
                        style="margin-left: {group.female - 8}%"
                      >{group.total}%</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <!-- Household Income Section -->
            <div class="bg-white border border-customGray-100 rounded-3xl p-6">
              <p class="text-sm font-medium text-teal-dark mb-6">Household Income</p>
              <div class="space-y-2">
                {#each incomeData as { range, value, color }}
                  <div class="space-y-1">
                    <div class="flex items-center gap-3">
                      <div class="h-4 flex-1 rounded-full {color}"></div>
                      <span class="text-sm text-teal-dark font-medium">{value}%</span>
                    </div>
                    <div class="text-xs text-gray-500">{range}</div>
                  </div>
                {/each}
              </div>
            </div>
      
            <!-- Geographic Location Section -->
            <div class="bg-white border border-customGray-100 rounded-3xl shadow-sm p-6">
              <p class="text-sm font-medium text-[#2F4144] flex items-baseline gap-1">
                Geographic Location
                <span class="text-xs italic text-gray-500">by Province</span>
              </p>
              
              <div class="mt-4">
                <div class="flex justify-center">
                  <div class="mb-6 w-1/2">
                    <DonutChartLarge
                      segments={locationData.map(loc => ({
                        percentage: loc.value,
                        color: loc.color.replace('bg-[', '').replace(']', '')
                      }))}
                      thickness="25%"
                      showPercentages={false}
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-x-6 gap-y-1">
                  {#each locationData as { region, value, color }}
                    <div class="flex items-center gap-2">
                      <div class="w-5 h-2.5 rounded-full {color}"></div>
                      <span class="text-xs text-[#2F4144]">{region}</span>
                      <span class="text-xs text-[#2F4144] font-medium ml-auto">{value}%</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="w-1/2 mx-auto p-3">
        <div class='bg-white p-6 rounded-lg'>
          <header class="flex justify-between items-center mb-6">
            <h1 class="text-2xl text-teal-dark">Attributes</h1>
            <button class="text-gray-400">•••</button>
          </header>
  
          <div class="bg-white p-6 border border-customGray-100 rounded-3xl">
            <div class="space-y-4">
              {#each attributes as attr, index}
              <div class="w-full">
                <div class="text-sm text-gray-600 mb-1">
                  {attr.label}: <span class="italic">{attr.value}</span>
                </div>
                <div class="h-4 bg-gray-100 rounded-full w-full">
                  <div class="h-full bg-teal-400 rounded-full {attr.width}"></div>
                </div>
              </div>
            {/each}
            </div>
          </div>
    
          <div class="mt-8">
            <h2 class="text-lg text-gray-800 mb-2">
              At vero eos et accusamus et iusto odio dignissimos
            </h2>
            <p class="text-sm text-gray-500">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
              illum qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </main>
    
    <main class="min-h-screen flex bg-gray-50 px-8">
      <div class="w-1/2 mx-auto p-3">
        <div class="bg-white p-6 rounded-lg">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl text-teal-dark">Barriers & Drivers</h1>
            <button class="text-gray-400">•••</button>
          </div>
        
          <div class="bg-white grid md:grid-cols-2 gap-6">
            <!-- Barriers Column -->
            <div class="space-y-4">
              {#each barriers as barrier}
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600">
                      {barrier.number}
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800 mb-1">{barrier.title}</h3>
                      <p class="text-gray-600 text-sm">{barrier.description}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
        
            <!-- Drivers Column -->
            <div class="space-y-4">
              {#each drivers as driver}
                <div class="bg-teal-50 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-sm text-teal-600">
                      {driver.number}
                    </div>
                    <div>
                      <h3 class="font-medium text-teal-700 mb-1">{driver.title}</h3>
                      <p class="text-teal-600 text-sm">{driver.description}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Duis aute irure dolor in reprehenderit</h3>
            <p class="text-gray-500 text-sm">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>
      <div class="w-1/2 mx-auto p-3">
        <div class="bg-white p-6 rounded-lg">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl text-teal-dark">Current Housing Circumstance</h1>
            <button class="text-gray-400">•••</button>
          </div>
        
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Type of housing -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">Type of housing</h3>
              <div class="space-y-3">
                {#each housingTypes as item}
                  <div>
                    <div class="text-sm text-gray-600 mb-1">{item.label}</div>
                    <div class="h-4 bg-gray-100 rounded-full">
                      <div class="h-full bg-gray-400 rounded-full" style="width: {item.value}%"></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
        
            <!-- Type of building -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">Type of building</h3>
              <div class="space-y-3">
                {#each buildingTypes as item}
                  <div>
                    <div class="text-sm text-gray-600 mb-1">{item.label}</div>
                    <div class="h-4 bg-gray-100 rounded-full">
                      <div class="h-full bg-gray-400 rounded-full" style="width: {item.value}%"></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
        
            <!-- Household Size -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">Household Size</h3>
              <div class="space-y-3">
                {#each householdSize as item}
                  <div>
                    <div class="text-sm text-gray-600 mb-1">{item.label}</div>
                    <div class="h-4 bg-gray-100 rounded-full">
                      <div class="h-full bg-gray-400 rounded-full" style="width: {item.value}%"></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
        
            <!-- Household Composition -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-4">Household Composition</h3>
              <div class="space-y-3">
                {#each householdComposition as item}
                  <div>
                    <div class="text-sm text-gray-600 mb-1">{item.label}</div>
                    <div class="h-4 bg-gray-100 rounded-full">
                      <div class="h-full bg-gray-400 rounded-full" style="width: {item.value}%"></div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Duis aute irure dolor in reprehenderit</h3>
            <p class="text-gray-500 text-sm">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>
    </main>

    <main class="flex bg-gray-50 px-8 py-3">
      <div class="bg-white rounded-lg mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl text-teal-dark">Key Communication Considerations</h1>
          <button class="text-gray-400">•••</button>
        </div>
      
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Primary Channels -->
          <div class="bg-white border border-customGray-100 rounded-3xl p-4">
            <h3 class="text-base font-medium text-gray-800 mb-4">Primary Channels for Housing Information</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              {#each channels as channel}
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="text-2xl mb-2">{channel.icon}</div>
                  <h4 class="text-sm font-medium text-gray-700 mb-1">{channel.title}</h4>
                  <p class="text-xs text-gray-500">{channel.description}</p>
                </div>
              {/each}
            </div>
          </div>
      
          <!-- Trust and Distrust -->
          <div class="bg-white border border-customGray-100 rounded-3xl p-4">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Sources of Trust -->
              <div>
                <h3 class="text-base font-medium text-gray-800 mb-4">Sources of Trust</h3>
                <div class="space-y-4">
                  {#each trustSources as source}
                    <div>
                      <div class="text-sm text-gray-600 mb-2">{source.text}</div>
                      <div class="h-2 bg-gray-100 rounded-full">
                        <div class="h-full bg-teal-400 rounded-full" style="width: {source.value}%"></div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
      
              <!-- Sources of Distrust -->
              <div>
                <h3 class="text-base font-medium text-gray-800 mb-4">Sources of Distrust</h3>
                <div class="space-y-4">
                  {#each distrustSources as source}
                    <div>
                      <div class="text-sm text-gray-600 mb-2">{source.text}</div>
                      <div class="h-2 bg-gray-100 rounded-full">
                        <div class="h-full bg-gray-400 rounded-full" style="width: {source.value}%"></div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-800 mb-2">Lorem ipsum dolor sit amet, consectetur</h3>
          <p class="text-gray-500 text-sm">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </div>
    </main>

    
    
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
</style>