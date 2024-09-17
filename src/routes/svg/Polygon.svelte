<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <polygon points="0,200 100,50 100,150 200,0" />
</svg>

<style>
  polygon {
      fill: none;
      stroke: black;
      stroke-width: 3px;
  }
</style>`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <polygon points="0,200 100,50 100,150 200,0" />
  </svg> 
</div>

<style>
  polygon {
      fill: none;
      stroke: black;
      stroke-width: 3px;
  }
</style>