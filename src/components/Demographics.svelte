<script>
  import DonutChartLarge from "../lib/DonutChartLarge.svelte";
  import Card from '../lib/Card.svelte';
  import Container from '../lib/Container.svelte';

  export let gender, ageGroup, householdIncome, locationData

  const order = ['Man', 'Non-binary', 'Woman', 'Prefer not to answer'];
  const colorMap = {
    "Man": "#334445",
    "Woman": "#23CEBC",
    "Non-binary": "#849AA8",
    "Prefer not to answer": "#718593"
  };
  let sortedGender

  $: {
    // Sorting needs to assign a new array for reactivity
    sortedGender = [...gender].sort((x, y) => order.indexOf(x.index) - order.indexOf(y.index));

    // Assign colors dynamically
    sortedGender = sortedGender.map(item => ({
      ...item,
      color: colorMap[item.index]
    }));
  }
</script>

<Card title="Demographics">
  <div class='space-y-4 sm:space-y-6 @container'>
    <Container>
      <div class="grid grid-cols-1 gap-8 sm:gap-12 @sm:grid-cols-2">
        <div class="flex flex-col">
          <p class='caption'>Gender</p>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex items-center gap-2">
              <div class="w-5 h-2.5 bg-primary-darkgreen rounded-full"></div>
              <p>Male</p>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-5 h-2.5 bg-primary-teal rounded-full"></div>
              <p>Female</p>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-5 h-2.5 bg-grey-light rounded-full"></div>
                <p>Non-binary</p>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-2.5 bg-grey-dark rounded-full"></div>
                <p>Prefer not to answer</p>
              </div>
          </div>
          <div class="flex justify-center w-1/2 @sm:w-full @md:w-3/4 mx-auto mt-3">
            <DonutChartLarge
              segments={sortedGender}
              thickness="25%"
              showPercentages={true}
            />
          </div>
        </div>

        <div>
          <p class='caption'>Age Group</p>
          <div class="space-y-3">
            {#each ageGroup as group}
              <div class="flex items-center gap-3">
                <p class="w-20">{group.index}</p>
                  <div class="h-4 bg-primary-darkgreen rounded-full" 
                      style="width: {group.percentage}%"
                  ></div>
                  <div class="body-s">{group.percentage}%</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </Container>
    
    <div class="grid grid-cols-1 gap-6 @sm:grid-cols-2">
      <Container>
        <p class='caption'>Household Income</p>
        <div class="space-y-3">
          {#each householdIncome as { index, percentage }}
            <div class="flex">
              <div class='w-3/4'>
                <div class="flex items-center gap-3">
                  <div class="h-4 rounded-full bg-primary-teal"
                      style="width: {percentage === 0 ? 1 : percentage}%"
                  ></div>
                </div>
                <p>{index}</p>
              </div>
              <div class="w-1/4 pl-3 body-s">{percentage}%</div>
            </div>
          {/each}
        </div>
      </Container>
      <Container>
        <p class='caption'>
          Geographic Location
          <span class="caption font-normal italic">by Province</span>
        </p>
        
        <div class="mt-4">
          <div class="flex justify-center">
            <div class="mb-6 w-1/2">
              <DonutChartLarge
                segments={locationData}
                thickness="25%"
                showPercentages={false}
              />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-x-6 gap-y-1">
            {#each locationData as { index, percentage, color }}
              <div class="flex items-center gap-2">
                <div class="w-5 h-2.5 rounded-full" style={`background-color: ${color}`}></div>
                <p>{index}</p>
                <p class='body-s'>{percentage}%</p>
              </div>
            {/each}
          </div>
        </div>
      </Container>
    </div>
  </div>
</Card>
