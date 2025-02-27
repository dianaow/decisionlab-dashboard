<script>
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';
  //import BarChart from "../lib/BarChart.svelte";

  export let barriers, drivers;

  const descriptions = [
    {
        "header": "Construction Anxiety",
        "description": "The building process would be stressful or disruptive"
    },
    {
        "header": "Unclear ROI",
        "description": "The potential returns are not worth the investment"
    },
    {
        "header": "Inconsistent Vision",
        "description": "It doesn't align with my plan and vision for my property or future property"
    },
    {
        "header": "Neighborhood Objections",
        "description": "People in my neighbourhood would object"
    },
    {
        "header": "Tenant Anxiety",
        "description": "Finding and managing tenants puts me off building an ADU on my property"
    },
    {
        "header": "Privacy Concerns",
        "description": "It would not give me enough privacy"
    },
    {
        "header": "Space Constraints",
        "description": "It would leave me with too little outdoor space"
    },
    {
        "header": "Property Value Concerns",
        "description": "It would negatively impact the value of my property"
    },
    {
        "header": "Personal Shame",
        "description": "I would feel a sense of shame or disappointment in myself"
    },
    {
        "header": "Social Consequences",
        "description": "People I care about would think less of me"
    },
    {
        "header": "Lack of Affordability",
        "description": "I would not be able to afford it within the next 5 years"
    },
    {
        "header": "Unclear Financing",
        "description": "There are no financing options that would allow me to borrow money"
    },
    {
        "header": "Inappropriate Property",
        "description": "My property would not be suitable for it"
    },
    {
        "header": "Regulatory Uncertainty",
        "description": "I don't know what the local regulations are about it"
    },
    {
        "header": "Regulatory Barriers",
        "description": "Local regulations do not allow me to build it"
    },
    {
        "header": "Increased Property Value",
        "description": "It would increase the value of my property"
    },
    {
        "header": "Increased Capacity",
        "description": "It would help me accommodate my growing family"
    },
    {
        "header": "Multi-Generational Living",
        "description": "It would enable me to take care of older family members while maintaining our privacy"
    },
    {
        "header": "Accomodate Guests",
        "description": "It would allow me to accommodate guests"
    },
    {
        "header": "Professional Utility",
        "description": "It would provide space for a home office"
    },
    {
        "header": "Personal Utility",
        "description": "It would provide extra space for hobbies"
    },
    {
        "header": "Sustainability",
        "description": "It adheres to my goal of living sustainably"
    },
    {
        "header": "Address Housing Crisis",
        "description": "It would contribute to improving housing availability in my area"
    },
    {
        "header": "Financial Benefit",
        "description": "It would provide extra income"
    },
    {
        "header": "Perceived Simplicity",
        "description": "It would be simple"
    },
    {
        "header": "Market Demand - Short Term",
        "description": "There is high demand for short-term rentals in my area"
    },
    {
        "header": "Market Demand - Long Term",
        "description": "There is high demand for long-term rentals in my area"
    },
    {
        "header": "Incentives",
        "description": "I have access to incentive programs (e.g. federal, provincial or municipal) to build an ADU"
    },
    {
        "header": "Financing Availability",
        "description": "I have access to other financing opportunities (e.g. contributions from family) to build an ADU"
    },
    {
        "header": "Aging in Place",
        "description": "It would allow me to both downsize and continue living here as I grow older"
    },
    {
        "header": "Lack of Knowledge",
        "description": "I find it difficult to understand how to invest in community bonds"
    },
    {
        "header": "Complex Process",
        "description": "The process would be complicated"
    },
    {
        "header": "Reduced Returns",
        "description": "The potential returns would be worse than the potential return from traditional investments (e.g., mutual funds, stocks, Exchange-Traded Funds)"
    },
    {
        "header": "Increased Risk",
        "description": "They are more risky than traditional investments (e.g., mutual funds, stocks, Exchange-Traded Funds)"
    },
    {
        "header": "Misalignment with Financial Goals",
        "description": "It does not align with my financial goals"
    },
    {
        "header": "Less Control",
        "description": "It would not give me a greater sense of control over the impact of my investment compared to traditional investments (e.g., mutual funds, stocks, Exchange-Traded Funds)"
    },
    {
        "header": "Lack of Opportunity",
        "description": "To my knowledge, there are limited or no opportunities to invest in community bonds in my area"
    },
    {
        "header": "Support Local Economy",
        "description": "It would allow me to support local economic development"
    },
    {
        "header": "Strengthen Community",
        "description": "It would give me a stronger sense of community"
    },
    {
        "header": "Increased Returns",
        "description": "It would be more financially beneficial than traditional investments (e.g., mutual funds, stocks, Exchange-Traded Funds)"
    },
    {
        "header": "Increased Control",
        "description": "It would give me a greater sense of control over my investments than traditional investments (e.g., mutual funds, stocks, Exchange-Traded Funds)"
    },
    {
        "header": "Community Benefit",
        "description": "It would improve access to affordable housing in my community"
    },
    {
        "header": "Aligned with Personal Goals",
        "description": "It would be compatible with my personal goals"
    },
    {
        "header": "Prices Accessibility",
        "description": "The price would be more accessible for me than the price of traditional investments (e.g., mutual funds, stocks, Exchange-Traded Funds)"
    },
    {
        "header": "Complex Process",
        "description": "It would be more complicated or take longer than purchasing a traditionally built home."
    },
    {
        "header": "Less Affordable",
        "description": "It would be less affordable than homes built using traditional methods"
    },
    {
        "header": "Uncertain Returns",
        "description": "The potential financial returns are lower or less certain than the returns from purchasing a traditionally built home."
    },
    {
        "header": "Lack of Customizability",
        "description": "It lacks the customization, individuality or look and feel that I would seek in a home"
    },
    {
        "header": "Inferior Quality",
        "description": "It would be inferior in quality or durability compared to traditional building methods"
    },
    {
        "header": "Social Stigma",
        "description": "There is a stigma around it that would make me reluctant to purchase one"
    },
    {
        "header": "Neighborhood Character",
        "description": "It takes away from the character or sense of history in the area"
    },
    {
        "header": "Sense of Shame",
        "description": "I would feel a sense of shame or disappointment in myself if I purchased it rather than a traditionally built home"
    },
    {
        "header": "Peer Perceptions",
        "description": "People I care about would think less of me if I purchased it rather than a traditionally built home."
    },
    {
        "header": "Value for Money",
        "description": "They would be better value for money than traditionally built homes"
    },
    {
        "header": "Faster Construction",
        "description": "They would be constructed faster than traditionally built homes"
    },
    {
        "header": "Reduced Stress",
        "description": "The construction would be less stressful than traditional construction"
    },
    {
        "header": "Greater Quality",
        "description": "The quality and durability would be just as good or better than a traditionally built home"
    },
    {
        "header": "Addresses Challenges",
        "description": "It would be an ideal solution to the remoteness or other challenges of the area where I would like to buy"
    },
    {
        "header": "Increased Customizability",
        "description": "It would allow me to customize more options in the home"
    },
    {
        "header": "Enhanced Sustainability",
        "description": "It would be a more environmentally-friendly option than traditional construction"
    },
    {
        "header": "Energy Efficiency",
        "description": "It means that the home would be more energy efficient than a traditionally built home"
    },
    {
        "header": "Aligns with Lifestyle",
        "description": "It aligns with my family situation and lifestyle"
    },
    {
        "header": "Lack of Affordability",
        "description": "I cannot afford to purchase a prefabricated or modular home within the next 5 years"
    },
    {
        "header": "Unclear Financing",
        "description": "There are no financing options that allow me to borrow money to purchase a prefabricated or modular home"
    },
    {
        "header": "No Availability",
        "description": "Prefabricated or modular homes are not available for purchase where I live"
    },
    {
        "header": "Perceived Stress",
        "description": "The process of converting would be stressful or disruptive"
    },
    {
        "header": "Misaligned with Personal Goals",
        "description": "It does not align with my goals and objectives"
    },
    {
        "header": "Tenant Anxiety",
        "description": "Finding and managing tenants puts me off converting a home into middle housing"
    },
    {
        "header": "Property Value Concerns",
        "description": "It would negatively impact the value of the property"
    },
    {
        "header": "Increased Property Value",
        "description": "It would increase the value of the property"
    },
    {
        "header": "New Income Stream",
        "description": "It would create a new source of income"
    },
    {
        "header": "Aging in Place",
        "description": "It would allow me to continue living here as I grow older"
    },
    {
        "header": "Increased Capacity",
        "description": "It would allow me to house and/or support family members while maintaining our privacy"
    },
    {
        "header": "Address Housing Crisis",
        "description": "It would contribute to improving housing availability"
    },
    {
        "header": "Strengthen Community",
        "description": "It would increase my sense of community"
    },
    {
        "header": "Property Appeal",
        "description": "It would increase the appeal of my property if I sell it in the future"
    },
    {
        "header": "Availibility of Trades",
        "description": "I have access to reliable builders or contractors who would simplify the conversion process"
    },
    {
        "header": "Incentives",
        "description": "I have access to incentive programs (e.g. federal, provincial or municipal) to do it"
    },
    {
        "header": "Financing Availability",
        "description": "I have access to or other financing opportunities (e.g. contributions from family) to do it"
    },
    {
        "header": "Community Momentum",
        "description": "Many other homes in my community are being converted into middle housing"
    },
    {
        "header": "Market Demand - Short Term",
        "description": "There is high short-term rental demand in my area"
    },
    {
        "header": "Market Demand - Long Term",
        "description": "There is high long-term rental demand in my area"
    },
    {
        "header": "Lack of Financing",
        "description": "There are no financing options that allow me to borrow money to do it"
    },
    {
        "header": "Lack of Affordability",
        "description": "I cannot afford to do it within the next 5 years"
    },
    {
        "header": "Property Not Suitable",
        "description": "My property is not suitable to do it"
    },
    {
        "header": "Regulatory Uncertainty",
        "description": "I don't know what the local regulations are in my area around it"
    },
    {
        "header": "Regulatory Constraints",
        "description": "Local regulations do not allow me to do it"
    },
    {
        "header": "Increased Complexity",
        "description": "It would be more complicated than purchasing a different type of home."
    },
    {
        "header": "Less Financial Benefit",
        "description": "It would be less financially beneficial than purchasing a different type of home"
    },
    {
        "header": "Inconsistent Vision",
        "description": "It is not compatible with my plans and vision for a home"
    },
    {
        "header": "Neighbor Anxiety",
        "description": "Living next to neighbours in other units in middle housing buildings puts me off living in a unit in a middle housing building"
    },
    {
        "header": "Lack of Space",
        "description": "It would not give me enough space"
    },
    {
        "header": "Personal Shame",
        "description": "I would feel a sense of shame or disappointment in myself if I purchased a unit in a middle housing building rather than a single-family home"
    },
    {
        "header": "Social Stigma",
        "description": "People I care about would think less of me if I purchased a unit in a middle housing building rather than a single-family home"
    },
    {
        "header": "Financial Benefit",
        "description": "It would be more financially beneficial than purchasing a different type of home or staying in my current home"
    },
    {
        "header": "More Affordable",
        "description": "It would be a more affordable option for me compared to purchasing another type of home"
    },
    {
        "header": "Matches Lifestyle",
        "description": "It would be more suited to my family situation and lifestyle than my current home"
    },
    {
        "header": "Strengthen Community",
        "description": "It would give me a greater sense of community"
    },
    {
        "header": "Downize Appeal",
        "description": "It would allow me to downsize while staying in the neighbourhood"
    },
    {
        "header": "Neighborhood Quality",
        "description": "It would allow me to live in a more convenient or desirable location (e.g. more walkable, better access to public transport)"
    },
    {
        "header": "Easier to maintain",
        "description": "It would mean spending less time and money maintaining a property"
    },
    {
        "header": "Consistent with Values",
        "description": "It would mean supporting more sustainable housing options"
    },
    {
        "header": "Positive Social Influence",
        "description": "People I know enjoy living in units in middle housing buildings"
    },
    {
        "header": "Lack of Affordability",
        "description": "I cannot afford to purchase a unit in a middle housing building within the next 5 years"
    },
    {
        "header": "Financing Availability",
        "description": "There are no financing options that allow me to borrow money to purchase a unit in a middle housing building"
    },
    {
        "header": "Availability",
        "description": "Units in middle housing buildings are not available for purchase where I live"
    },
    {
        "header": "Sense of Safety",
        "description": "It might attract new residents who could disrupt neighbourhood safety or harmony."
    },
    {
        "header": "Disrupted Aesthetics",
        "description": "It could disrupt the aesthetics of my neighbourhood."
    },
    {
        "header": "Inferior Quality",
        "description": "I am concerned about its structural integrity compared to the other buildings in my neighbourhood."
    },
    {
        "header": "Inferior Durability",
        "description": "It would be less durable and less able to withstand severe weather compared to traditional homes."
    },
    {
        "header": "Neighborhood Capacity",
        "description": "It could help accommodate my neighbourhood\u2019s growing population."
    },
    {
        "header": "Economic Opportunity",
        "description": "It could drive economic opportunities in my neighbourhood."
    },
    {
        "header": "Housing Affordability",
        "description": "It could bring more affordable housing to my neighbourhood."
    },
    {
        "header": "Housing Desirability",
        "description": "It could provide more desirable housing in my neighbourhood."
    },
    {
        "header": "Consistent with Neighborhood",
        "description": "It could seamlessly integrate with the look of my neighbourhood"
    },
    {
        "header": "Less disruption",
        "description": "It could reduce disruptions and nuisance from construction (e.g., noise, road blockages, dust) compared to traditional construction"
    },
    {
        "header": "Sustainability",
        "description": "It is more environmentally responsible than traditional housing."
    },
    {
        "header": "Traffic & Parking",
        "description": "It could affect traffic and parking in my neighbourhood."
    },
    {
        "header": "Increased Density",
        "description": "It could increase the density of my neighbourhood."
    },
    {
        "header": "Suitability Concerns",
        "description": "I believe they are unsuitable to live in and would oppose them in my neighbourhood to protect potential tenants."
    },
    {
        "header": "Reduced Privacy",
        "description": "It would reduce my privacy."
    },
    {
        "header": "Reduced Quality of Life",
        "description": "It could lower my quality of life with noise or other disruptions."
    },
    {
        "header": "Insufficient Space",
        "description": "There is not enough space in my neighbourhood or in dwellings within my neighbourhood."
    },
    {
        "header": "Blocked View",
        "description": "It may block my view."
    },
    {
        "header": "Maximize Land Use",
        "description": "It would help maximize the use of land in my neighbourhood."
    },
    {
        "header": "Economic Opportunity",
        "description": "It could drive economic opportunities in my neighbourhood (e.g., more support for local businesses)."
    },
    {
        "header": "Increased Inclusivity",
        "description": "It would make the neighbourhood more inclusive by creating more diverse housing options."
    },
    {
        "header": "Increased Diversity",
        "description": "It would attract more diverse residents and create a more vibrant community."
    },
    {
        "header": "Address Housing Crisis",
        "description": "It can help address housing shortages while preserving the character of my neighbourhood by offering an alternative to large-scale developments."
    },
    {
        "header": "Sustainability",
        "description": "It is a more environmentally responsible way to address housing shortages than traditional single family homes."
    },
    {
        "header": "Aging in Place",
        "description": "It provides options for elderly people who are looking to downsize, without requiring them to leave the neighbourhood."
    },
    {
        "header": "Improved Sense of Safety",
        "description": "It would improve my sense of safety in my neighbourhood."
    },
    {
        "header": "Tenant Anxiety",
        "description": "Current laws would make it difficult for landlords to evict unpleasant tenants."
    },
    {
        "header": "Increased Density",
        "description": "It would increase the density of my neighbourhood."
    },
    {
        "header": "Address Housing Crisis",
        "description": "It could increase the housing supply while preserving the character of my neighbourhood."
    },
    {
        "header": "Maximize Land Use",
        "description": "It could help maximize the use of land in my neighbourhood."
    },
    {
        "header": "Increased Comfort",
        "description": "It could provide more comfortable housing in my neighbourhood."
    },
    {
        "header": "More Options",
        "description": "I would like to have the option to convert my own home into middle housing."
    },
    {
        "header": "Sense of Safety",
        "description": "It might attract residents who could disrupt neighbourhood safety or harmony."
    },
    {
        "header": "Management Anxiety",
        "description": "It could be poorly managed (e.g., due to funding or staffing shortages)."
    },
    {
        "header": "Lack of Effect",
        "description": "I do not believe that supportive housing is an effective way to provide housing or support to people."
    },
    {
        "header": "Benefit Vulnerable Populations",
        "description": "It could benefit vulnerable populations."
    },
    {
        "header": "Address Social Issues",
        "description": "It could help to address social issues I see in my neighbourhood (e.g., homelessness)."
    },
    {
        "header": "Increased Safety",
        "description": "It could make my neighbourhood safer by providing stable housing and services to at-risk people."
    },
    {
        "header": "Increased Diversity",
        "description": "It could bring more diversity to my neighbourhood."
    },
    {
        "header": "Indirect Benefit",
        "description": "It could attract other social services (e.g. healthcare services) to my neighbourhood."
    },
    {
        "header": "Economic Opportunity",
        "description": "It could drive economic opportunities in my neighbourhood (e.g., creating jobs, improving conditions for local businesses)."
    },
    {
        "header": "Aligns with Values",
        "description": "It aligns with my values."
    }
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
  <div class="@container">
    <div class="bg-white grid grid-cols-1 @md:grid-cols-2 gap-6">
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
  </div>   
</Card>