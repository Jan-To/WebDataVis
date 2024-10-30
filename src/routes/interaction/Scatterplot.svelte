<script>
  import { scaleLinear } from 'd3-scale';
  import { extent } from 'd3-array';

  let {
    datapoints = [],
    x,
    y,
    selected_datapoint = $bindable(undefined)
  } = $props();

  let xScale = $derived(scaleLinear().domain(extent(datapoints.map((d) => { return d[x]}))).range([0,400]))
  let yScale = $derived(scaleLinear().domain(extent(datapoints.map((d) => { return d[y]}))).range([0,400]))
</script>

<svg width=400 height=400>
  {#each datapoints as datapoint}
    <circle cx={xScale(datapoint[x])} cy={yScale(datapoint[y])}
            r=5
            class:selected="{selected_datapoint && datapoint.id == selected_datapoint.id}"
            onmouseover={function() {selected_datapoint = datapoint}}
            onmouseout={function() {selected_datapoint = undefined}}/>
  {/each}
</svg>

<style>
  svg {
    background-color: whitesmoke;
    margin: 5px;
  }
  circle {
    fill: steelblue;
    fill-opacity: 0.3;
  }
  circle.selected {
    fill: red;
    fill-opacity: 1;
  }
</style>