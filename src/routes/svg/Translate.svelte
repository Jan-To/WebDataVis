<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <g transform="translate(100,100)">
        <circle cx="0"   cy="0"   r="5" />
        <circle cx="-50" cy="0"   r="5" />
        <circle cx="0"   cy="50"  r="5" />
        <circle cx="50"  cy="0"   r="5" />
        <circle cx="0"   cy="-50" r="5" />
    </g>
</svg>

<style>
    circle {
        fill: steelblue;
    }
</style>`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <g transform="translate(100,100)">
        <circle cx="0"   cy="0"   r="5" />
        <circle cx="-50" cy="0"   r="5" />
        <circle cx="0"   cy="50"  r="5" />
        <circle cx="50"  cy="0"   r="5" />
        <circle cx="0"   cy="-50" r="5" />
    </g>
</svg>
</div>

<style>
  circle {
      fill: steelblue;
  }
</style>