<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import Papa from 'papaparse';
  import { onMount } from 'svelte';

  import { scaleLinear } from 'd3-scale';
  import { extent } from 'd3-array';

  let datapoints = $state([]);
  let margins = {"left": 30, "top": 30, "bottom": 30, "right": 30};

  let x = "sepal_length"
  let y = "sepal_width"

  onMount(() => {
    Papa.parse("https://vda-lab.github.io/assets/iris.csv", {
        header: true,
        download: true,
        complete: function(results) {
            datapoints = results.data.slice(0,-1)
        }
    })
  })
  
  let xDomain = $derived(extent(datapoints, (d) => d.sepal_length))
  let yDomain = $derived(extent(datapoints, (d) => d.sepal_width))
  let xScale = $derived(scaleLinear().domain(xDomain).range([margins.left,300-margins.right]))
  let yScale = $derived(scaleLinear().domain(yDomain).range([margins.top,300-margins.bottom]))
  
  let xTicks = $derived([4.5,5,5.5,6,6.5,7,7.5])
  let yTicks = $derived([2,2.5,3,3.5,4])
</script>

<svg width=300 height=300>
  {#if !!datapoints.length}
    {#each datapoints as datapoint}
      <circle cx={xScale(datapoint.sepal_length)} cy={yScale(datapoint.sepal_width)} r=5 />
    {/each}
  
    <!-- x axis -->
    <line x1={margins.left} y1={300-margins.bottom} x2={300-margins.right} y2={300-margins.bottom} />
    {#each xTicks as tick}
      <line x1={xScale(tick)} y1={300-margins.bottom-3} x2={xScale(tick)} y2={300-margins.bottom+3} />
      <text class="x" alignment-baseline="hanging" x={xScale(tick)} y={300-margins.bottom+5}>{tick}</text>
    {/each}
    
    <!-- y axis -->
    <line x1={margins.left} y1={margins.top} x2={margins.left} y2={300-margins.bottom} />
    {#each yTicks as tick}
      <line x1={margins.left-3} y1={yScale(tick)} x2={margins.left+3} y2={yScale(tick)} />
      <text class="y" alignment-baseline="middle" x={margins.left-5} y={yScale(tick)}>{tick}</text>
    {/each}
  {/if}
</svg>

<style>
  svg { background-color: whitesmoke }
  circle { opacity: 0.5; }
  line { stroke: black; }
  text { font-size: 12px; }
  text.x { text-anchor: middle; }
  text.y { text-anchor: end; }
</style>

<Highlight language={xml} code=
{`<script>
  import { scaleLinear } from 'd3-scale';
  import { extent } from 'd3-array';
  export let datapoints = [];
  let margins = {"left": 30, "top": 30, "bottom": 30, "right": 30}
  
  $: xDomain = extent(datapoints, (d) => d.sepal_length)
  $: yDomain = extent(datapoints, (d) => d.sepal_width)
  $: xScale = scaleLinear().domain(xDomain).range([margins.left,300-margins.right])
  $: yScale = scaleLinear().domain(yDomain).range([margins.top,300-margins.bottom])
  
  $: xTicks = [4.5,5,5.5,6,6.5,7,7.5]
  $: yTicks = [2,2.5,3,3.5,4]
</script>
  
<svg width=300 height=300>
  {#each datapoints as datapoint}
    <circle cx={xScale(datapoint.sepal_length)} cy={yScale(datapoint.sepal_width)} r=5 />
  {/each}
  
  <!-- x axis -->
  <line x1={margins.left} y1={300-margins.bottom} x2={300-margins.right} y2={300-margins.bottom} />
  {#each xTicks as tick}
    <line x1={xScale(tick)} y1={300-margins.bottom-3} x2={xScale(tick)} y2={300-margins.bottom+3} />
    <text class="x" alignment-baseline="hanging" x={xScale(tick)} y={300-margins.bottom+5}>{tick}</text>
  {/each}
  
  <!-- y axis -->
  <line x1={margins.left} y1={margins.top} x2={margins.left} y2={300-margins.bottom} />
  {#each yTicks as tick}
    <line x1={margins.left-3} y1={yScale(tick)} x2={margins.left+3} y2={yScale(tick)} />
    <text class="y" alignment-baseline="middle" x={margins.left-5} y={yScale(tick)}>{tick}</text>
  {/each}
</svg>

<style>
  svg { background-color: whitesmoke }
  circle { opacity: 0.5; }
  line { stroke: black; }
  text { font-size: 12px; }
  text.x { text-anchor: middle; }
  text.y { text-anchor: end; }
</style>`}/>