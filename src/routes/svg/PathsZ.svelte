<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-flex>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <path d="M 0,200 L 100,50 L 100,150 L 200,0 Z"/>
</svg>`}/>
<div class=view-half>
  <svg width="200" height="200">
    <path d="M 0 ,200 L 100,50 L 100,150 L 200,0 Z" />
  </svg>
</div>
</div>

<style>
  path {
    fill: none;
    stroke: black;
    stroke-width: 3px;
  }
</style>