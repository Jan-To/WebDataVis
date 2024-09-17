<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<svg width="400" height="200">
    <circle cx="50" cy="50" r="5" />
    <circle cx="50" cy="150" r="5" />
    <circle cx="50" cy="100" r="5" />
    <path d="M 50 50 A 4 1 0 0 1 50 100" class="smallarc"/>
    <path d="M 50 50 A 4 1 0 0 1 50 150" class="largearc"/>
</svg>

<style>
    path {
        stroke: red;
        stroke-width: 5;
        fill-opacity: 0.5
    }
    path.smallarc {
        fill: blue;
    }
    path.largearc {
        fill: green;
    }
    circle {
        fill: steelblue;
    }
    svg {
        border: 1px;
        border-style: solid;
    }
</style>`}/>
</div>
<div class=view-half>
  <svg width="400" height="200">
    <circle cx="50" cy="50" r="5" />
    <circle cx="50" cy="150" r="5" />
    <circle cx="50" cy="100" r="5" />
    <path d="M 50 50 A 4 1 0 0 1 50 100" class="smallarc"/>
    <path d="M 50 50 A 4 1 0 0 1 50 150" class="largearc"/>
  </svg>
</div>

<style>
  path {
      stroke: red;
      stroke-width: 5;
      fill-opacity: 0.5
  }
  path.smallarc {
      fill: blue;
  }
  path.largearc {
      fill: green;
  }
  circle {
      fill: steelblue;
  }
  svg {
      border: 1px;
      border-style: solid;
  }
</style>