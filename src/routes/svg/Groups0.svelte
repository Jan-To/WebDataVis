<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <circle cx="100" cy="100" r="5" />
    <circle cx="50" cy="100" r="5" />
    <circle cx="100" cy="50" r="5" />
    <circle cx="150" cy="100" r="5" />
    <circle cx="100" cy="150" r="5" />
</svg>

<style>
    circle {
        fill: steelblue;
    }
</style>`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <circle cx="100" cy="100" r="5" />
    <circle cx="50" cy="100" r="5" />
    <circle cx="100" cy="50" r="5" />
    <circle cx="150" cy="100" r="5" />
    <circle cx="100" cy="150" r="5" />
</svg>
</div>

<style>
  circle {
      fill: steelblue;
  }
</style>