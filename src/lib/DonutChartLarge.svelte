<script>
  export let segments = [];
  export let thickness = '15%';
  export let showPercentages = true;
  export let showBorder = true;
  export let backgroundColor = '#ffffff';
  
  // Define gap between slices
  const gapWidth = 2; // Width of the gap between slices in pixels
  
  // Calculate positions for segments and create individual pie slices
  $: segmentsWithPaths = calculateSegments(segments, thickness, gapWidth);
  
  function calculateSegments(segments, thickness, gapWidth) {
    let currentAngle = 0;
    const calculatedSegments = [];
    
    segments.forEach((segment) => {
      const angle = (segment.percentage / 100) * 360;
      const midAngle = currentAngle + (angle / 2);
      
      // Calculate outer arc points
      // SVG arc starts at 3 o'clock and goes clockwise, so we subtract 90 degrees
      const startAngle = (currentAngle - 90) * (Math.PI / 180);
      const endAngle = (currentAngle + angle - 90) * (Math.PI / 180);
      
      // Add a small gap by reducing the end angle slightly
      const gapAngle = (gapWidth / 50) * (Math.PI / 180); // Convert gap width to radians
      const adjustedEndAngle = endAngle - gapAngle;
      
      // Outer radius is 50 (as the chart is 100x100)
      const outerRadius = 50;
      // Calculate inner radius - convert percentage to actual size
      // If thickness is provided as '15%', we use 0.15 of the outer radius
      // This makes the donut much thicker
      const thicknessValue = parseFloat(thickness) / 100;
      const innerRadius = 50 * (1 - thicknessValue * 2);
      
      // Calculate points for the arc
      const x1 = 50 + outerRadius * Math.cos(startAngle);
      const y1 = 50 + outerRadius * Math.sin(startAngle);
      const x2 = 50 + outerRadius * Math.cos(adjustedEndAngle);
      const y2 = 50 + outerRadius * Math.sin(adjustedEndAngle);
      
      // Calculate inner arc points
      const x3 = 50 + innerRadius * Math.cos(adjustedEndAngle);
      const y3 = 50 + innerRadius * Math.sin(adjustedEndAngle);
      const x4 = 50 + innerRadius * Math.cos(startAngle);
      const y4 = 50 + innerRadius * Math.sin(startAngle);
      
      // Calculate label position
      const labelRadius = (outerRadius + innerRadius) / 2;
      const labelX = 50 + labelRadius * Math.cos(midAngle * (Math.PI / 180) - Math.PI/2);
      const labelY = 50 + labelRadius * Math.sin(midAngle * (Math.PI / 180) - Math.PI/2);
      
      // Create path for the donut slice
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Path: Move to outer start, arc to outer end, line to inner end, arc back to inner start, close
      const path = [
        `M ${x1} ${y1}`, // Move to outer start point
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
        `L ${x3} ${y3}`, // Line to inner end
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc (reverse direction)
        'Z' // Close path
      ].join(' ');
      
      calculatedSegments.push({
        ...segment,
        path,
        labelX,
        labelY,
        midAngle
      });
      
      currentAngle += angle;
    });
    
    return calculatedSegments;
  }
</script>

<div class="donut-chart-wrapper">
  <svg viewBox="0 0 100 100" class="donut-chart">
    {#each segmentsWithPaths as segment, i}
      <path
        d={segment.path}
        fill={segment.color}
        stroke="#ffffff"
        stroke-width={showBorder ? "1.5" : 0}
      />
    {/each}
    
    <!-- White center circle to create the donut hole -->
    <circle 
      cx="50" 
      cy="50" 
      r={50 * (1 - parseFloat(thickness) / 100 * 2)}
      fill={backgroundColor} 
    />
    
    <!-- Show percentages on the chart -->
    {#if showPercentages}
      {#each segmentsWithPaths as segment, i}
        <text
          x={segment.labelX}
          y={segment.labelY}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="white"
          font-size="5"
          font-weight="bold"
        >
          {segment.percentage}%
        </text>
      {/each}
    {/if}
  </svg>
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
</style>