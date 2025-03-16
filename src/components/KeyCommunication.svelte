<script>
  import BarChart from "../lib/BarChart.svelte";
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';

  export let keyInfo, trustSources, distrustSources
</script>

<Card title="Key Communication Considerations">  
  <div class="@container">
    <div class="grid grid-cols-1 @[800px]:grid-cols-2 gap-6">
      <Container>
        <p class='caption'>Key Pieces of Information</p>
        <BarChart
          data={keyInfo}
        />
      </Container>

      <Container>
        <div class="grid grid-cols-1 @[400px]:grid-cols-2 gap-6">
          <div>
            <p class='caption'>Sources of Trust</p>
            <BarChart
              data={trustSources}
            />
          </div>
          
          <div class="relative pl-6 @[400px]:pl-6 @[400px]:border-l border-grey-linegreen">
            <p class='caption'>Sources of Distrust</p>
            <BarChart
              data={distrustSources}
            />
          </div>
        </div>
      </Container>
    </div>
  </div>

  <div class="mt-8">
    <p class='body-l mb-3'>Lorem ipsum dolor sit amet, consectetur</p>
    <p class="text-grey-light">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
      sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    </p>
  </div>
</Card>