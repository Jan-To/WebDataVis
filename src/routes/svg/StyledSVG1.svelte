<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="300" height="300">
    <circle cx="20" cy="50" r="30"/>
    <rect x="100" y="200" width="70" height="30"/>
</svg>

<style>
    svg {
        border: 1px;
        border-style: solid;
    }
    circle {
        fill: steelblue;
        opacity: 0.5;
    }
    circle:hover {
        fill: red;
        opacity: 1;
    }
    rect {
        fill: green;
        stroke: red;
    }
</style>`}/>
</div>
<div class=view-half>
  <svg width="300" height="300">
    <circle cx="20" cy="50" r="30"/>
    <rect x="100" y="200" width="70" height="30" />
  </svg>
</div>


<style>
  svg {
      border: 1px;
      border-style: solid;
  }
  circle {
      fill: steelblue;
      opacity: 0.5;
  }
  circle:hover {
      fill: red;
      opacity: 1;
  }
  rect {
      fill: green;
      stroke: red;
  }
</style>