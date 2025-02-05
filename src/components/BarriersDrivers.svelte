<script>
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';
  import BarChart from "../lib/BarChart.svelte";

  export let barriers, drivers;
</script>

<Card title="Barriers & Drivers">     
  <!-- <div class="bg-white grid md:grid-cols-2 gap-6">
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
  </div> -->

  <Container>
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