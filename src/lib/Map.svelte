<script>
  import { onMount, onDestroy } from 'svelte';
  import { select } from 'd3-selection';
  import { geoMercator, geoPath } from 'd3-geo';
  import { zoom, zoomIdentity } from 'd3-zoom';
  import { transition } from 'd3-transition';
  
  export let selectedProvince = '';
  
  let svg;
  let mapGroup;
  let container;
  let width;
  let height;
  let resizeObserver;
  
  const projection = geoMercator()
    .center([-96, 60.5]);
    
  const path = geoPath().projection(projection);
  
  const mapZoom = zoom()
    .scaleExtent([1, 6])
    .on('zoom', (event) => {
      select(mapGroup).attr('transform', event.transform);
    });
    
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
      }
    }
  }
  
  onMount(async () => {
    resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    
    updateDimensions();
    
    const svgElement = select(svg);
    const g = select(mapGroup);
    
    svgElement.call(mapZoom);
    
    try {
      const response = await fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson');
      const data = await response.json();
      
      g.selectAll('path')
        .data(data.features)
        .join('path')
        .attr('d', path)
        .attr('class', 'province')
        .attr('fill', d => d.properties.name === selectedProvince ? '#718593' : '#E3E2E2')
        .attr('stroke', '#EBF0F0')
        .attr('stroke-width', '1')
        .on('click', (event, d) => {
          selectedProvince = d.properties.name;
          zoomToProvince(d);
        })
        .on('mouseover', function() {
          select(this)
            .transition()
            .duration(200)
            .attr('fill', '#999');
        })
        .on('mouseout', function(event, d) {
          select(this)
            .transition()
            .duration(200)
            .attr('fill', d.properties.name === selectedProvince ? '#718593' : '#E3E2E2');
        });
    } catch (error) {
      console.error('Error loading map data:', error);
    }
  });
  
  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });
  
  $: if (mapGroup && selectedProvince) {
    select(mapGroup)
      .selectAll('.province')
      .transition()
      .duration(300)
      .attr('fill', d => d.properties.name === selectedProvince ? '#666' : '#ccc');
    
    const selectedFeature = select(mapGroup)
      .selectAll('.province')
      .filter(d => d.properties.name === selectedProvince)
      .datum();
    
    if (selectedFeature) {
      zoomToProvince(selectedFeature);
    }
  }
  
  function zoomToProvince(feature) {
    const bounds = path.bounds(feature);
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 0.5 / Math.max(dx / width, dy / height);
    const translate = [width / 2 - scale * x, height / 2 - scale * y];
    
    select(svg)
      .transition()
      .duration(750)
      .call(mapZoom.transform, zoomIdentity
        .translate(translate[0], translate[1])
        .scale(scale));
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
</style>