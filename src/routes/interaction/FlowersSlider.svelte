<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import Papa from 'papaparse';
  import { onMount } from 'svelte';
  import Flower from './Flower.svelte';

  let datapoints = $state([])

  onMount(() => {
      Papa.parse("https://vda-lab.github.io/assets/iris.csv", {
          header: true,
          download: true,
          complete: function(results) {
              datapoints = results.data.slice(0,-1)
          }
      })
  })

  let slider_value = $state(3);
  const get_xy = function(idx) {
      let y = 25 + (Math.floor(idx / 20) * 50)
      let x = 25 + ((idx % 20) * 50)
      return [x,y]
  }
</script>

<input type="range" min="1" max="6" bind:value={slider_value}/><br/>
<svg width=1000 height=400>
  {#each datapoints as datapoint,idx}
      <g transform="translate({get_xy(idx)[0]}, {get_xy(idx)[1]})">
          <Flower datapoint={datapoint} scale={slider_value}/>
      </g>
  {/each}
</svg>

<style>
  svg {
      background-color: whitesmoke;
      border: 1px solid;
  }
</style>

<code>App.svelte</code>:
<Highlight language={xml} code=
{`<script>
  import Flower from './Flower.svelte';

  let datapoints = $state([]); // load with onMount, hidden here

  let slider_value = 3; // new slider default value
  const get_xy = function(idx) {
      let y = 25 + (Math.floor(idx / 20) * 50)
      let x = 25 + ((idx % 20) * 50)
      return [x,y]
  }
</script>

<!--add a slider and bind its value to our variable for reactivity-->
<input type="range" min="1" max="6" bind:value={slider_value}/><br/> 
<svg width=1000 height=400>
  {#each datapoints as datapoint,idx}
      <g transform="translate({get_xy(idx)[0]}, {get_xy(idx)[1]})">
          <Flower datapoint={datapoint} scale={slider_value}/> <!--hand over slider_value to flower-->
      </g>                   
  {/each}
</svg>

<style>
  svg {
      background-color: whitesmoke;
      border: 1px solid;
  }
</style>`}/>

<code>Flower.svelte</code>:
<Highlight language={xml} code=
{`<script>    
    let { datapoint = {}, scale = 3 } = $props(); // scale is property now

    let sl = $derived(scale*datapoint.sepal_length)
    let sw = $derived(scale*datapoint.sepal_width)
    let pl = $derived(scale*datapoint.petal_length)
    let pw = $derived(scale*datapoint.petal_width)
    let sepal_path = $derived("M 0,0 " + "C " + sl + ",-" + sw + " " + sl + "," + sw + " 0,0 Z")
    let petal_path = $derived("M 0,0 " + "C " + pl + ",-" + pw + " " + pl + "," + pw + " 0,0 Z")
</script>

<g>               
    <circle cx=0 cy=0 r={scale*3.5} class={datapoint.species}/> <!--reactive radius-->
    <path style="transform: rotate(270deg)" d={sepal_path}/>
    <path style="transform: rotate(30deg)" d={sepal_path}/>
    <path style="transform: rotate(150deg)" d={sepal_path}/>
    <path style="transform: rotate(325deg)" d={petal_path}/>
    <path style="transform: rotate(90deg)" d={petal_path}/>
    <path style="transform: rotate(210deg)" d={petal_path}/>
</g>

<style>
    circle.setosa {
        fill: #7570b3;
        fill-opacity: 0.3;
    }
    circle.virginica {
        fill: #1b9e77;
        fill-opacity: 0.3;
    }
    circle.versicolor {
        fill: #d95f02;
        fill-opacity: 0.3;
    }
</style>`}/>
