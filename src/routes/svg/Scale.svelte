<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-flex>
  <Highlight language={xml} code=
{`<svg width="200" height="200">
    <g transform="translate(50,50)">
        <rect x="0" y="0" width="50" height="50" class="base"/>
        <rect x="0" y="0" width="50" height="50" class="translated"
                    transform="translate(50,50)"/>
        <rect x="0" y="0" width="50" height="50" class="rotated"
                    transform="rotate(45)"/>
        <rect x="0" y="0" width="50" height="50" class="scaled"
                    transform="scale(0.5)"/>
        <rect x="0" y="0" width="50" height="50" class="combined"
                    transform="translate(100,0) scale(0.5)"/>
    </g>
</svg>

<style>
    rect {
        fill-opacity: 0.5;
        stroke: none;
    }
    rect.base {
        fill: red;
    }
    rect.translated {
        fill: green;
    }
    rect.rotated {
        fill: blue;
    }
    rect.scaled {
        fill: black;
    }
    rect.combined {
        fill: orange;
    }
</style>`}/>
<div class=view-half>
  <svg width="200" height="200">
    <g transform="translate(50,50)">
        <rect x="0" y="0" width="50" height="50" class="base"/>
        <rect x="0" y="0" width="50" height="50" class="translated"
                    transform="translate(50,50)"/>
        <rect x="0" y="0" width="50" height="50" class="rotated"
                    transform="rotate(45)"/>
        <rect x="0" y="0" width="50" height="50" class="scaled"
                    transform="scale(0.5)"/>
        <rect x="0" y="0" width="50" height="50" class="combined"
                    transform="translate(100,0) scale(0.5)"/>
    </g>
</svg>
</div>
</div>

<style>
  rect {
      fill-opacity: 0.5;
      stroke: none;
  }
  rect.base {
      fill: red;
  }
  rect.translated {
      fill: green;
  }
  rect.rotated {
      fill: blue;
  }
  rect.scaled {
      fill: black;
  }
  rect.combined {
      fill: orange;
  }
</style>