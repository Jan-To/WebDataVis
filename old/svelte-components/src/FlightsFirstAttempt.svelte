<script>
  import { onMount } from "svelte";


let datapoints = [];
onMount(() => {
  fetch("http://vda-lab.github.io/assets/svelte-flights.json")
      .then(res => res.json())
      .then(data => datapoints = data.slice(1,500))
})
</script>

<style>
svg {
    border: 1px;
    border-style: solid;
}
circle {
    fill: red;
    fill-opacity: 0.5;
}
</style>

<svg width="400" height="200">
{#each datapoints as datapoint}
    <circle cx={datapoint.from_long} cy={datapoint.from_lat} r="2"
        style="fill: red;"/>
{/each}
</svg>