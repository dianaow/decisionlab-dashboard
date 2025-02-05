<script>
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';

  export let data
</script>

<Card title="Attributes">
  <Container>
    <div class="space-y-4">
      {#each data as attr, index}
      <div class="w-full">
        <p class="mb-1">
          {attr.label}: <span class="body-s italic">{attr.value}</span>
        </p>
        <div class="bg-grey-linegreen bg-opacity-20 rounded-full h-4 ">
          <div class="h-full bg-primary-teal rounded-full" style="width: {attr.percentage}%"></div>
        </div>
      </div>
    {/each}
    </div>
  </Container>
  <div class="mt-8">
    <p class="body-l mb-3">At vero eos et accusamus et iusto odio dignissimos</p>
    <p class="text-grey-light">
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
      reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
      illum qui dolorem eum fugiat quo voluptas nulla pariatur.
    </p>
  </div>
</Card>