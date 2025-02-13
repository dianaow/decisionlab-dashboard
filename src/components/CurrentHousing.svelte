<script>
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';
  import BarChart from "../lib/BarChart.svelte";

  export let housingTypes, householdComposition

  // const buildingTypes = [
  //   { label: "Single family home", percentage: 75 },
  //   { label: "Apartment (in a building with more than 12 units)", percentage: 65 },
  //   { label: "Duplex, triplex, fourplex", percentage: 45 },
  //   { label: "Accessory Dwelling Unit", percentage: 35 },
  //   { label: "Townhouse, row house or semi-detached house", percentage: 25 }
  // ];

  // const householdSize = [
  //   { label: "2 - 3 people", percentage: 85 },
  //   { label: "4 - 6 people", percentage: 65 },
  //   { label: "1 person", percentage: 45 },
  //   { label: "7 - 10", percentage: 35 },
  //   { label: "10 and more", percentage: 25 }
  // ];
</script>

<Card title="Current Housing Circumstance">
  <Container>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <p class='caption'>Type of housing</p>
        <BarChart
          data={housingTypes}
          labelSize="text-xs"
          spacing="space-y-3"
        />
      </div>
  
      <!-- <div>
        <p class='caption'>Type of building</p>
        <BarChart
          data={buildingTypes}
          labelSize="text-xs"
          spacing="space-y-3"
        />
      </div>
  
      <div>
        <p class='caption'>Household Size</p>
        <BarChart
          data={householdSize}
          labelSize="text-xs"
          spacing="space-y-3"
        />
      </div> -->
  
      <div>
        <p class='caption'>Household Composition</p>
        <BarChart
          data={householdComposition}
          labelSize="text-xs"
          spacing="space-y-3"
        />
      </div>
    </div>
  </Container>

  <div class="mt-8">
    <p class="body-l mb-3">Duis aute irure dolor in reprehenderit</p>
    <p class="text-grey-light">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
      veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  </div>
</Card>