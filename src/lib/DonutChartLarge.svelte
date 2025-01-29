<script>
  export let segments = [];
  export let thickness = '15%';
  export let showPercentages = true;
  export let backgroundColor = '#ffffff';

  // Calculate positions for labels
  $: segmentsWithPositions = segments.reduce((acc, segment, index) => {
    const startAngle = acc.currentAngle;
    const angle = (segment.percentage / 100) * 360;
    const midAngle = startAngle + (angle / 2);
    
    // Calculate position using trigonometry
    // Radius is 50 (as the chart is 100x100), subtract a bit to position within the donut
    const radius = 38;
    const x = Math.cos((midAngle - 90) * (Math.PI / 180)) * radius + 50;
    const y = Math.sin((midAngle - 90) * (Math.PI / 180)) * radius + 50;
    
    acc.segments.push({
      ...segment,
      x,
      y,
      midAngle
    });
    
    acc.currentAngle += angle;
    return acc;
  }, { segments: [], currentAngle: 0 }).segments;
  
  // Calculate segment offsets for the conic gradient
  $: segmentGradient = segments
    .reduce((acc, segment, index) => {
      const startPercentage = acc.currentPercentage;
      const endPercentage = startPercentage + segment.percentage;
      
      acc.gradient.push(`${segment.color} ${startPercentage}% ${endPercentage}%`);
      acc.currentPercentage = endPercentage;
      
      return acc;
    }, { gradient: [], currentPercentage: 0 })
    .gradient.join(', ');
</script>

<div class="donut-chart-wrapper">
  <div 
    class="donut-chart"
    style:--donut-thickness={thickness}
    style:--background-color={backgroundColor}
  >
    <div 
      class="donut"
      style:background="conic-gradient({segmentGradient})"
    >
      {#if showPercentages}
        {#each segmentsWithPositions as segment}
          <div 
            class="percentage-label"
            style:left="{segment.x}%"
            style:top="{segment.y}%"
            style:transform="translate(-50%, -50%)"
            style:color="white"
          >
            {segment.percentage}%
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .donut-chart-wrapper {
    width: 100%;
    position: relative;
  }

  .donut-chart-wrapper::before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  .donut-chart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .donut {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
  }

  .donut::after {
    content: '';
    position: absolute;
    top: var(--donut-thickness);
    right: var(--donut-thickness);
    bottom: var(--donut-thickness);
    left: var(--donut-thickness);
    background-color: var(--background-color);
    border-radius: 50%;
  }

  .percentage-label {
    position: absolute;
    z-index: 1;
    font-weight: bold;
    font-size: clamp(0.575rem, 1.8vw, 0.8rem);
    pointer-events: none;
  }
</style>