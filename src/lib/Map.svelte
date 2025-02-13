<script>
  import { onMount, onDestroy } from 'svelte';
  import { select } from 'd3-selection';
  import { geoMercator, geoPath } from 'd3-geo';
  import { zoom, zoomIdentity } from 'd3-zoom';
  import { transition } from 'd3-transition';
  import { fade } from 'svelte/transition';

  export let data
  export let selectedProvince = '';

  let width;
  let height;
  let resizeObserver;
  let container, svg, mapGroup;
  let tooltipContent = "";
  let tooltipX = 0, tooltipY = 0;
  let tooltipVisible = false;
  let currentTransform = zoomIdentity; // Store current transform
  let previousProvince = ''; // Track previous selection
  let isInternalUpdate = false; // Flag for internal updates

  const projection = geoMercator()
    .center([-96, 60.5]);
    
  const path = geoPath().projection(projection);

  const mapZoom = zoom()
    .scaleExtent([1, 6])
    .on('zoom', (event) => {
      currentTransform = event.transform; // Update current transform
      select(mapGroup).attr('transform', event.transform);
      
      // Update tooltip position if visible
      if (tooltipVisible) {
        updateTooltipPosition();
      }
    });

  function updateTooltipPosition() {
    const matchingPolygons = select(mapGroup)
      .selectAll('path')
      .filter(p => p.properties.name === tooltipContent.split('>')[1].split('<')[0].trim());

    const centroids = matchingPolygons.nodes().map(node => {
      const polygon = select(node).datum();
      return path.centroid(polygon);
    });

    const avgX = centroids.reduce((sum, c) => sum + c[0], 0) / centroids.length;
    const avgY = centroids.reduce((sum, c) => sum + c[1], 0) / centroids.length;

    // Apply current transform to tooltip coordinates
    tooltipX = currentTransform.applyX(avgX);
    tooltipY = currentTransform.applyY(avgY) - 60 * currentTransform.k; // Scale offset with zoom
  }
    
  function updateDimensions() {
    if (container) {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      projection
        .scale(Math.min(width, height) * 0.6)
        .translate([width / 2, height / 2]);
        
      if (svg) {
        select(svg)
          .attr('width', width)
          .attr('height', height)
          .attr('viewBox', `0 0 ${width} ${height}`);
          
        select(mapGroup)
          .selectAll('path')
          .transition()
          .duration(300)
          .attr('d', path);

        if (tooltipVisible) {
          updateTooltipPosition();
        }
      }
    }
  }

  onMount(async () => {
    console.log('map', data)
    resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    
    updateDimensions();
    
    const svgElement = select(svg);
    const g = select(mapGroup);
    
    svgElement.call(mapZoom);
    
    // try {
    //   const response = await fetch('src/data/canada_provinces.geojson');
    //   const data = await response.json();
      
      g.selectAll('path')
        .data(data.features)
        .join('path')
        .attr('d', path)
        .attr('class', 'province')
        .attr('fill', d => d.properties.name === selectedProvince ? '#718593' : '#E3E2E2')
        .attr('stroke', '#EBF0F0')
        .attr('stroke-width', '1')
        .on('click', (event, d) => {
          isInternalUpdate = true;
          selectedProvince = d.properties.name;
          zoomToProvince(d);
        })
        .on('mouseover', function(event, d) {
          const matchingPolygons = g.selectAll('path')
            .filter(p => p.properties.name === d.properties.name);

          matchingPolygons.attr('fill', '#999');

          const centroids = matchingPolygons.nodes().map(node => {
            const polygon = select(node).datum();
            return path.centroid(polygon);
          });

          const avgX = centroids.reduce((sum, c) => sum + c[0], 0) / centroids.length;
          const avgY = centroids.reduce((sum, c) => sum + c[1], 0) / centroids.length;

          tooltipContent = `
            <h3 class="mb-3">${d.properties.name}</h3>
            <div class="space-y-2">
              <div class="flex gap-4">
                <span class="caption1">Population</span>
                <span class='body-s'>${d.properties.population || "-"}</span>
              </div>
              <div class="flex gap-4">
                <span class="caption1">Area</span>
                <span class='body-s'>${d.properties.area || "-"} km²</span>
              </div>
              <div class="flex gap-4">
                <span class="caption1">Capital</span>
                <span class='body-s'>${d.properties.capital || "-"}</span>
              </div>
            </div>
          `;

          // Apply current transform to tooltip coordinates
          tooltipX = currentTransform.applyX(avgX);
          tooltipY = currentTransform.applyY(avgY) - 60 * currentTransform.k;
          tooltipVisible = true;
        })
        .on('mouseout', function(event, d) {
          g.selectAll('path')
            .filter(p => p.properties.name === d.properties.name)
            .attr('fill', p => p.properties.name === selectedProvince ? '#718593' : '#E3E2E2');

          tooltipVisible = false;
        });
    // } catch (error) {
    //   console.error('Error loading map data:', error);
    // }
  });

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  $: if (mapGroup && selectedProvince !== previousProvince) {
    previousProvince = selectedProvince;
    
    select(mapGroup)
      .selectAll('.province')
      .transition()
      .duration(300)
      .attr('fill', d => d.properties.name === selectedProvince ? '#718593' : '#E3E2E2');

    // Only trigger zoom if the change came from outside
    if (!isInternalUpdate) {
      const selectedFeatures = select(mapGroup)
        .selectAll('.province')
        .filter(d => d.properties.name === selectedProvince)
        .data();

      if (selectedFeatures.length > 0) {
        zoomToProvince(selectedFeatures);
      }
    }
    
    isInternalUpdate = false; // Reset the flag
  }

  function zoomToProvince(features) {
    const featureArray = Array.isArray(features) ? features : [features];
  
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    featureArray.forEach(feature => {
      const bounds = path.bounds(feature);
      minX = Math.min(minX, bounds[0][0]);
      minY = Math.min(minY, bounds[0][1]);
      maxX = Math.max(maxX, bounds[1][0]);
      maxY = Math.max(maxY, bounds[1][1]);
    });

    const dx = maxX - minX;
    const dy = maxY - minY;
    const x = (minX + maxX) / 2;
    const y = (minY + maxY) / 2;
    const scale = Math.max(1, 0.5 / Math.max(dx / width, dy / height));
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    select(svg)
      .transition()
      .duration(750)
      .call(mapZoom.transform, zoomIdentity
        .translate(translate[0], translate[1])
        .scale(scale));
      
    tooltipVisible = false;
  }

  function resetZoom() {
    select(svg)
      .transition()
      .duration(750)
      .call(mapZoom.transform, zoomIdentity);
  }
</script>

<div 
  class="map-container" 
  bind:this={container}
>
  <svg 
    bind:this={svg}
  >
    <g bind:this={mapGroup}></g>
  </svg>

  {#if tooltipVisible}
    <div 
      class="tooltip" 
      style="left: {tooltipX}px; top: {tooltipY}px;"
      transition:fade
    >
      {@html tooltipContent}
      <div class="tooltip-arrow"></div>
    </div>
  {/if}
</div>

<style>
  .map-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #EBF0F0;
  }
  
  :global(.province) {
    cursor: pointer;
  }
  
  :global(.province:hover) {
    fill: #999;
  }

  .tooltip {
    position: absolute;
    background: #fff;
    border-radius: 8px;
    border: #C6D0D0;
    padding: 16px;
    pointer-events: none;
    transform: translate(-50%, -100%);
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
  }

  .tooltip-arrow {
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #fff;
    transform: translateX(-50%);
  }
</style>