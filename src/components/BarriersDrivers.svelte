<script>
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';
  import BarChart from "../lib/BarChart.svelte";

  export let barriers, drivers;
</script>

<Card title="Barriers & Drivers">     
  <div class="bg-white grid md:grid-cols-2 gap-6">
    <div class="space-y-4">
      {#each barriers as barrier}
        <div class="bg-primary-darkgreen bg-opacity-10 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 bg-grey-dark rounded-full flex items-center justify-center caption">
              <div class='text-white'>{barrier.number}</div>
            </div>
            <div>
              <p class="caption">{barrier.index}</p>
              <p class="body-s">{barrier.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="space-y-4">
      {#each drivers as driver}
        <div class="bg-primary-green bg-opacity-10 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center text-sm text-teal-600">
              <div class='text-white'>{driver.number}</div>
            </div>
            <div>
              <p class="font-secondary text-xs leading-[16.08px] font-bold mb-3 text-primary-green">{driver.index}</p>
              <p class="font-secondary text-xs leading-[18px] font-medium text-primary-green">{driver.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
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