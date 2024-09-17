<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <ellipse cx="20" cy="100" rx="10" ry="20" />
    <rect x="60" y="140" width="20" height="10" />
    <line x1="80" y1="10" x2="40" y2="50" />
</svg>

<style>
  line {
    stroke: black;
    stroke-width: 3;
  }
  ellipse {
    fill: steelblue;
  }
  rect {
    fill: red;
  }
</style>`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <ellipse cx="20" cy="100" rx="10" ry="20" />
    <rect x="60" y="140" width="20" height="10" />
    <line x1="80" y1="10" x2="40" y2="50" />
  </svg>
</div>

<style>
  line {
    stroke: black;
    stroke-width: 3;
  }
  ellipse {
    fill: steelblue;
  }
  rect {
    fill: red;
  }
</style>
