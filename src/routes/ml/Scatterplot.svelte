<script>
  import { scaleLinear, scaleOrdinal } from 'd3-scale';
  import { extent } from 'd3-array';
  import { schemeCategory10 } from 'd3-scale-chromatic';

  export let datapoints = []
  export let x
  export let y
  export let color

  $: xScale = scaleLinear().domain(extent(datapoints.map((d) => { return d[x]}))).range([0,400])
  $: yScale = scaleLinear().domain(extent(datapoints.map((d) => { return d[y]}))).range([0,400])
  $: colorScale = scaleOrdinal()
        .domain([...new Set(Object.values(color))].sort())
        .range(schemeCategory10);
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