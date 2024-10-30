<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";

  import { scaleLinear } from 'd3-scale';
  import { extent } from 'd3-array';
  import Flower from './Flower.svelte'

  import Papa from 'papaparse';
  import { onMount } from 'svelte';

  let datapoints = $state([])
  let selected_datapoint = $state(undefined)

  let x = "sepal_length"
  let y = "sepal_width"

  onMount(() => {
    Papa.parse("https://vda-lab.github.io/assets/iris.csv", {
        header: true,
        download: true,
        complete: function(results) {
            let counter = 0
            datapoints = results.data.slice(0,-1)
            datapoints.map((d) => d.sepal_length = +d.sepal_length)
            datapoints.map((d) => d.sepal_width = +d.sepal_width)
            datapoints.map((d) => d.petal_length = +d.petal_length)
            datapoints.map((d) => d.petal_width = +d.petal_width)
            datapoints.forEach((d) => {
                d["id"] = counter
                counter++;
            })
        }
    })
  })

  let xScale = $derived(scaleLinear().domain(extent(datapoints.map((d) => { return d[x]}))).range([0,400]))
  let yScale = $derived(scaleLinear().domain(extent(datapoints.map((d) => { return d[y]}))).range([0,400]))

  let mouse_x = $state(), mouse_y = $state();
  const setMousePosition = (e) => {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
  }
</script>

<svg width=400 height=400>
  {#each datapoints as datapoint}
    <circle cx={xScale(datapoint[x])} cy={yScale(datapoint[y])}
            r=5
            class:selected="{selected_datapoint && datapoint.id == selected_datapoint.id}"
            onmouseover={function(event) {selected_datapoint = datapoint; setMousePosition(event)}}
            onmouseout={function() {selected_datapoint = undefined}}>
      </circle>
  {/each}
</svg>

{#if selected_datapoint != undefined}
<div id="tooltip" style="left: {mouse_x + 10}px; top: {mouse_y - 10}px">
<svg class="tooltip" width=20 height=20>
  <g transform="translate(10,10)">
  <Flower datapoint={selected_datapoint} />
  </g>
</svg><br/>
Species: {selected_datapoint.species}
</div>
{/if}

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
  #tooltip { 
    position: fixed;
    background-color: white;
    padding: 3px;
    border: solid 1px;
  }
  svg.tooltip {
    margin: 0px;
    padding: 0px;
  }
</style>

<p>
  To make this happen, we create a <code>{`div`}</code> that is only shown if 
  <code>{`selected_datapoint`}</code> is defined. Our <code>{`Flower.svelte`}</code> is the same as we had above. 
  <code>{`+page.svelte`}</code> becomes:
</p>

<Highlight language={xml} code=
{`<script>
    import Scatterplot from './Scatterplot.svelte'
    export let data = [];
</script>

<Scatterplot datapoints={data.flowers} x="sepalLength" y="sepalWidth"/>

<style>
    circle {
        fill: steelblue;
        fill-opacity: 0.5;
    }
</style>`}/>

<p>We adapt <code>{`Scatterplot.svelte`}</code> like so:</p>

<Highlight language={xml} code=
{`<script>
  import { scaleLinear } from 'd3-scale';
  import { extent } from 'd3-array';
  import Flower from './Flower.svelte'

  export let datapoints = [];
  export let x;
  export let y;

  export let selected_datapoint = undefined;

  $: xScale = scaleLinear().domain(extent(datapoints.map((d) => { return d[x]}))).range([0,400])
  $: yScale = scaleLinear().domain(extent(datapoints.map((d) => { return d[y]}))).range([0,400])

  let mouse_x, mouse_y; // save mouse position on mouseover event for fixed positioning of tooltip
  const setMousePosition = function(event) {
    mouse_x = event.clientX;
    mouse_y = event.clientY;
  }
</script>

<svg width=400 height=400>
  {#each datapoints as datapoint} <!-- define hover-event handling & responses below -->
    <circle cx={xScale(datapoint[x])} cy={yScale(datapoint[y])} r=5
            class:selected="{selected_datapoint && datapoint.id == selected_datapoint.id}" 
            on:mouseover={function(event) {selected_datapoint = datapoint; setMousePosition(event)}}
            on:mouseout={function() {selected_datapoint = undefined}}/>
  {/each}
</svg>

{#if selected_datapoint != undefined} <!-- show div only if datapoint is defined -->
  <div id="tooltip" style="left: {mouse_x + 10}px; top: {mouse_y - 10}px">
    <svg class="tooltip" width=20 height=20>
      <g transform="translate(10,10)">
      <Flower datapoint={selected_datapoint} />
      </g>
    </svg><br/>
    Species: {selected_datapoint.species}
  </div>
{/if}

<style>
  svg {
    background-color: whitesmoke;
    margin: 5px;
    padding: 20px;
  }
  circle {
    fill: steelblue;
    fill-opacity: 0.3;
  }
  circle.selected {
    fill: red;
    fill-opacity: 1;
  }
  #tooltip { /* tooltip styling, incl. 'fixed' position = by viewport coordinates */
    position: fixed;
    background-color: white;
    padding: 3px;
    border: solid 1px;
  }
  svg.tooltip {
    margin: 0px;
    padding: 0px;
  }
</style>`}/>