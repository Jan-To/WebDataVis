<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import { scaleLinear } from 'd3-scale';

  let { data = [] } = $props();

  const scaleX = scaleLinear().domain([-180,180]).range([0,800])
  const scaleY = scaleLinear().domain([-90,90]).range([400,0])
  const scaleColour = scaleLinear().domain([-180,180]).range(["red","green"])
</script>

<Highlight language={xml} code=
{`<script>
  import { scaleLinear } from 'd3-scale';

  const { data } = $props();

  const scaleX = scaleLinear().domain([-180,180]).range([0,800])
  const scaleY = scaleLinear().domain([-90,90]).range([400,0])
  const scaleColour = scaleLinear().domain([-180,180]).range(["red","green"])
</script>

<svg width="800" height="400">
  {#each data.flights as datapoint}
      <circle cx={scaleX(datapoint.from_long)}
              cy={scaleY(datapoint.from_lat)}
              r=3
              style={"fill:" + scaleColour(datapoint.from_long)} />
  {/each}
</svg>

<style>
  circle {
      fill-opacity: 0.5;
  }
</style>`}/>

<svg width="800" height="400">
  {#each data.flights as datapoint}
      <circle cx={scaleX(datapoint.from_long)}
              cy={scaleY(datapoint.from_lat)}
              r=3
              style={"fill:" + scaleColour(datapoint.from_long)} />
  {/each}
</svg>

<style>
  circle {
      fill-opacity: 0.5;
  }
</style>