<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-flex>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <path d="M 20,100 Q 100,20 180,100" />

    <circle cx="20" cy="100" r="5" style="fill: steelblue" />
    <circle cx="100" cy="20" r="5" style="fill: red" />
    <circle cx="180" cy="100" r="5" style="fill: steelblue" />
</svg>

<style>
    path {
        stroke: black;
        stroke-width: 3px;
        fill: none;
    }
</style>`}/>
<div class=view-half>
  <svg width="200" height="200">
    <path d="M 20,100 Q 100,20 180,100"/>
    <circle cx="20" cy="100" r="5" style="fill: steelblue"/>
    <circle cx="100" cy="20" r="5" style="fill: red"/>
    <circle cx="180" cy="100" r="5" style="fill: steelblue"/>
</svg>
</div>
</div>

<style>
  path {
      stroke: black;
      stroke-width: 3px;
      fill: none;
  }
</style>