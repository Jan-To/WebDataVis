<script>
  import { scaleLinear, scaleOrdinal } from 'd3-scale';
  import { extent } from 'd3-array';
  import { schemeCategory10 } from 'd3-scale-chromatic';

  let {
    datapoints = [],
    x,
    y,
    color
  } = $props();

  let xScale = $derived(scaleLinear().domain(extent(datapoints.map((d) => { return d[x]}))).range([0,400]))
  let yScale = $derived(scaleLinear().domain(extent(datapoints.map((d) => { return d[y]}))).range([0,400]))
  let colorScale = $derived(scaleOrdinal()
        .domain([...new Set(Object.values(color))].sort())
        .range(schemeCategory10));
</script>

<svg width=400 height=400>
  {#each datapoints as datapoint, index}
    <circle cx={xScale(datapoint[x])} cy={yScale(datapoint[y])} r=5
    fill="{colorScale(color[index.toString()])}"/>
  {/each}
</svg>

<style>
  svg {
    background-color: whitesmoke;
  }
</style>