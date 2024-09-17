<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
  <path d="M 50 50 A 2 1 -45 0 1 50 150" />
</svg>

<style>
    path {
        fill: orange;
        stroke: black;
        stroke-width: 3px;
    }
</style>`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <path d="M 50 50 A 2 1 -45 0 1 50 150" />
  </svg>
</div>

<style>
  path {
      fill: orange;
      stroke: black;
      stroke-width: 3px;
  }
</style>