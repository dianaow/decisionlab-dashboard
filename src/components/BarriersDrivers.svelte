<script>
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';
  //import BarChart from "../lib/BarChart.svelte";

  export let barriers, drivers;

  const descriptions = [
    {"header": "Complex Permitting", "description": "Getting a permit would be complicated"},
    {"header": "Construction Anxiety", "description": "The building process would be stressful or disruptive"},
    {"header": "Unclear ROI", "description": "The potential returns are not worth the investment"},
    {"header": "Inconsistent Vision", "description": "It doesn't align with my plan and vision for my property or future property"},
    {"header": "Neighborhood Objections", "description": "People in my neighbourhood would object"},
    {"header": "Tenant Anxiety", "description": "Finding and managing tenants puts me off building an ADU on my property"},
    {"header": "Privacy Concerns", "description": "It would not give me enough privacy"},
    {"header": "Space Constraints", "description": "It would leave me with too little outdoor space"},
    {"header": "Property Value Concerns", "description": "It would negatively impact the value of my property"},
    {"header": "Personal Shame", "description": "I would feel a sense of shame or disappointment in myself"},
    {"header": "Social Consequences", "description": "People I care about would think less of me"},
    {"header": "Lack of Affordability", "description": "I would not be able to afford it within the next 5 years"},
    {"header": "Unclear Financing", "description": "There are no financing options that would allow me to borrow money"},
    {"header": "Inappropriate Property", "description": "My property would not be suitable for it"},
    {"header": "Regulatory Uncertainty", "description": "I don't know what the local regulations are about it"},
    {"header": "Regulatory Barriers", "description": "Local regulations do not allow me to build it"},
    {"header": "Increased Property Value", "description": "It would increase the value of my property"},
    {"header": "Increased Capacity", "description": "It would help me accommodate my growing family"},
    {"header": "Multi-Generational Living", "description": "It would enable me to take care of older family members while maintaining our privacy"},
    {"header": "Accommodate Guests", "description": "It would allow me to accommodate guests"},
    {"header": "Professional Utility", "description": "It would provide space for a home office"},
    {"header": "Personal Utility", "description": "It would provide extra space for hobbies"},
    {"header": "Sustainability", "description": "It adheres to my goal of living sustainably"},
    {"header": "Address Housing Crisis", "description": "It would contribute to improving housing availability in my area"},
    {"header": "Financial Benefit", "description": "It would provide extra income"},
    {"header": "Perceived Simplicity", "description": "It would be simple"},
    {"header": "Market Demand - Short Term", "description": "There is high demand for short-term rentals in my area"},
    {"header": "Market Demand - Long Term", "description": "There is high demand for long-term rentals in my area"},
    {"header": "Incentives", "description": "I have access to incentive programs (e.g. federal, provincial or municipal) to build an ADU"},
    {"header": "Family Contributions", "description": "I have access to other financing opportunities (e.g. contributions from family) to build an ADU"},
    {"header": "Aging in Place", "description": "It would allow me to both downsize and continue living here as I grow older"}
  ]

  $: {
    barriers.forEach(d => {
      const item = descriptions.find(el => el.description === d.index)
      d.header = item ? item.header : ""
    })
    drivers.forEach(d => {
      const item = descriptions.find(el => el.description === d.index)
      d.header = item ? item.header : ""
    })
  }
</script>

<Card title="Barriers & Drivers">     
  <div class="bg-white grid md:grid-cols-2 gap-6">
    
    <Container>
      <div class="space-y-4">
        <p class="caption">Adoption Barriers</p>
        {#each barriers as barrier}
          <div class="bg-primary-darkgreen bg-opacity-10 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-6 h-6 bg-grey-dark rounded-full flex items-center justify-center caption">
                <div class='text-white'>{barrier.number}</div>
              </div>
              <div>
                <p class="caption">{barrier.header}</p>
                <p class="body-s">{barrier.index}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </Container>
    <Container>
      <div class="space-y-4">
        <p class="caption">Adoption Drivers</p>
        {#each drivers as driver}
          <div class="bg-primary-green bg-opacity-10 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center text-sm text-teal-600">
                <div class='text-white'>{driver.number}</div>
              </div>
              <div>
                <p class="font-secondary text-xs leading-[16.08px] font-bold mb-3 text-primary-green">{driver.header}</p>
                <p class="font-secondary text-xs leading-[18px] font-medium text-primary-green">{driver.index}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </Container>
  </div>

  <!-- <Container>
    <div class="grid md:grid-cols-2 gap-6">
      <BarChart
        data={barriers}
        labelSize="text-xs"
        spacing="space-y-3"
      />
      <BarChart
        data={drivers}
        labelSize="text-xs"
        spacing="space-y-3"
      />           
    </div>
  </Container> -->

  <div class="mt-8">
    <p class="body-l mb-3">Duis aute irure dolor in reprehenderit</p>
    <p class="text-grey-light">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
      veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  </div>
</Card>