<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
  <line x1="0" y1="200" x2="100" y2="50"/>
  <line                 x1="100" y1="50" x2="100" y2="150"/>
  <line                                  x1="100" y1="150" x2="200" y2="0"/>
</svg>

<style>
  line {
      stroke: black;
      stroke-width: 3px;
  }
</style>`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <line x1="0" y1="200" x2="100" y2="50"/>
    <line x1="100" y1="50" x2="100" y2="150"/>
    <line x1="100" y1="150" x2="200" y2="0"/>
  </svg>
</div>

<style>
  line {
      stroke: black;
      stroke-width: 3px;
  }
</style>