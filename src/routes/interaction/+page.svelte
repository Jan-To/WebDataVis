<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import FlowersSlider from './FlowersSlider.svelte';
  import scatterflowers from '$lib/assets/scatterplot-flowers.png';
  import Flightsslider from "./Flightsslider.svelte";
  import ScatterplotWithTooltip from "./ScatterplotWithTooltip.svelte";
  import BrushLink from './BrushLink.svelte';
</script>

<h1> Interactions in Svelte</h1>

<h2> Sliders</h2>
<p>Let's add a slider to the iris visualisation from the previous section that allows us to change the size of each flower in teh encoding.</p>

<FlowersSlider/>

<p>We combined what we saw earlier in this section on adding sliders. What changed in our code?</p>

<ul>
  <li>We create a new variable that holds the value for the slider and set its default to 3.</li>
  <li>We add the actual slider.</li>
  <li>We want to replace the hard-coded value of <code>{`3`}</code> with the dynamic value from the slider. Hence, we pass it as an argument to <code>{`<Flower/>`}</code></li>
  <li>We accept the argument in <code>{`<Flower/>`}</code> via <code>export let</code>. Due to the <code>$:</code> declaration, the draw variables are already reactive.</li>
  <li>Finally, we let the circle radius also react to the flower scaling with the addition of <code>{`{scale*3.5}`}</code></li>
</ul>

<div id="svelte-flowers-with-slider"></div>
<h3>Practice</h3>

<p>Change this example so that, instead of a grid of flowers, these flowers are presented as a scatterplot based on the length and width of their sepals, like so:</p>

<img src={scatterflowers} alt="" width=50%/>



<p>Getting back to our airport data, let's create a version with a slider that highlights only those airports serving flights with a given distance:</p>

<Flightsslider/>

<h2> Tooltips</h2>
<p>Following the "overview first, zoom and filter, and details on demand" mantra, we want to be able to show details when we hover over a datapoint.</p>

<p>A quick and dirty way to do this, is by using a <code>{`title`}</code> element embedded within the visual element. For example: instead of</p>

<div class=code-flex>
  <Highlight language={xml} code=
  {`<circle cx=50 cy=50 r=10/>`}/>
<div class=view-half>
  <svg width=50 height=50>
    <circle cx=30 cy=30 r=10/>
  </svg>
</div>
</div>

<p>we can write</p>

<div class=code-flex>
  <Highlight language={xml} code=
  {`<circle cx=50 cy=50 r=10>
  <title>My tooltip</title>
</circle>`}/>
<div class=view-half>
  <svg width=50 height=50>
    <circle cx=30 cy=30 r=10>
      <title>My tooltip</title>
    </circle>
  </svg>
</div>
</div>

<p>
  When we hover over that circle, the text "My tooltip" will be shown after a couple of seconds. 
  You can replace that hard-coded text with, for example, <code>{`{datapoint.species}`}</code>. 
  But we can take this much further, and show a proper tooltip with full control. 
  In our example, let's show the glyph of the flower and the species name.
</p>

<ScatterplotWithTooltip/>

<p>
  The main magic happens through the Svelte conditional <code>{`{#if ...}`}</code>, where we only show this <code>{`div`}</code> when 
  <code>{`selected_datapoint`}</code> is defined. The <code>{`div`}</code> gets an id of 
  <code>{`tooltip`}</code> and we set its position next to the location of the mouse. The div itself contains an SVG with the flower, 
  and a line of text stating the species. If <code>{`Flower`}</code> would be an SVG itself, we wouldn't have to define the 
  <code>{`<svg>`}</code> here, but looking at the <code>{`Flower.svelte`}</code> file, it returns a 
  <code>{`<g>`}</code> which should be <i>part</i> of an SVG.
</p>

<p>
  The <code>{`div`}</code> gets a position (<code>{`style="left: ...`}</code>) that depends on <code>{`mouse_x`}</code> and 
  <code>{`mouse_y`}</code>. These are set <code>on:mouseover</code> when we hover over a circle, using the 
  <code>{`setMousePosition(event)`}</code>. 
  The <code>event</code> that is automatically passed is the event that triggered the <code>mouseover</code>. 
  Check what is in these events by adding a <code>{`console.log(event)`}</code> in the <code>{`setMousePosition`}</code> function.
</p>

<p>
  Normally a new <code>{`div`}</code> is positioned <i>after</i> the previous one. 
  This means that the tooltip would be displayed to the right of or below the scatterplot, 
  whether or not we define that <code>{`style`}</code> attribute. To fix this, we need to set 
  <code>{`position: fixed;`}</code> in the CSS. Finally, as we have <i>two</i> SVGs (one for the scatterplot, and one contained within the tooltip), 
  we might have to give each a different style. In our case, we set the padding and margin to 0 for the SVG in the tooltip.
</p>

<div id="svelte-tooltip"></div>

<h2>Linking</h2>
<p>Being able to link different visuals together can have a <i>big</i> impact on how much insight you can gain from them. Below, we will look into how to make this happen. We'll create two scatterplots on the iris data, and link these together. The final result will be as below. Notice that when you hover over a point, there will also be a point in the other scatterplot that becomes red.</p>

<BrushLink/>

<p><code>{`Scatterplot.svelte`}</code>:</p>

<Highlight language={xml} code=
{`<script>
  import { scaleLinear } from 'd3-scale';
  import { extent } from 'd3-array';

  export let datapoints = []
  export let x;
  export let y;

  export let selected_datapoint = undefined;

  $: xScale = scaleLinear()
                .domain(extent(datapoints.map((d) => { return d[x]})))
                .range([0,400])
  $: yScale = scaleLinear()
                .domain(extent(datapoints.map((d) => { return d[y]})))
                .range([0,400])
</script>

<svg width=400 height=400>
  {#each datapoints as datapoint}
    <circle cx={xScale(datapoint[x])} cy={yScale(datapoint[y])}
            r=5
            on:mouseover={function() {selected_datapoint = datapoint}}
            on:mouseout={function() {selected_datapoint = undefined}}
            class:selected="{selected_datapoint && datapoint.id <h1> selected_datapoint.id}"</h1>
    />
  {/each}
</svg>

<style>
  svg {
    background-color: whitesmoke;
    margin: 5px;
    padding: 20px;
  }
  circle {
    fill: steelblue;
    fill-opacity: 0.3;
  }
  circle.selected {
    fill: red;
    fill-opacity: 1;
  }
</style>`}/>

<p>What happens here?</p>

<ul>
  <li>We'll need to have a <code>{`selected_datapoint`}</code> variable to keep track of which datapoint is the selected one.</li>
  <li>Using <code>{`on:mouseover`}</code> we can set the <code>{`selected_datapoint`}</code>...</li>
  <li>... which is unset on <code>{`on:mouseout`}</code>.</li>
  <li>
    Finally, we can set the class of our circle to <code>{`selected`}</code> 
    if <code>{`selected_datapoint`}</code> is defined and the id of our datapoint is the same as the selected datapoint.
  </li>
  <li>We <code>export</code> the variable <code>selected_datapoint</code> to make it visible from outside.</li>
</ul>

<p><code>{`src/routes/+page.svelte`}</code>:</p>

<Highlight language={xml} code=
{`<script>
  import Papa from 'papaparse';
  import { onMount } from 'svelte';
  import Scatterplot from './Scatterplot.svelte';

  let datapoints = []
  let selected_datapoint = undefined

  onMount(() => {
      Papa.parse("https://jan-to.github.io/WebDataVis/iris.csv", {
          header: true,
          download: true,
          complete: function(results) {
              datapoints = results.data.slice(0,-1)
              let counter = 0;
              datapoints.forEach((d) => {
                  d["id"] = counter
                  counter++;
              })
          }
      })
  })
</script>

<table>
  <tr>
    <td><Scatterplot
            bind:selected_datapoint
            datapoints={data.flowers}
            x="sepalLength"
            y="sepalWidth" /></td>
    <td><Scatterplot
            bind:selected_datapoint
            datapoints={data.flowers}
            x="petalLength"
            y="petalWidth" /></td>
  </tr>
</table>`}/>

<p>
  We define a variable <code>{`selected_datapoint`}</code> that will contain a copy of any datapoint 
  that we hover over in any of the scatterplots. Next, we need a way of checking which circle is selected. 
  We can do this by adding a unique ID to all datapoints. Finally, we pass the selected datapoint 
  to the scatterplots themselves, but do this using the <code>{`bind`}</code> operator, so that these scatterplots can pass 
  that info back into the main code, from where it then can be passed to the other scatterplot.
</p>

<h2>Stores</h2>

<p>
  Note that there are multiple ways of achieving this linking. Passing around data through the application hierarchy like above is feasible in this small example.
  However, if there are more components that need to access (and possibly write) certain variables, Svelte provides so called <code>stores</code>.
  Stores are variables that are declared in an extra file <code>stores.js</code> and are, after an <code>import x from "./store"</code>, accessible in all components.
  Since <codes>stores</codes> are objects with a <code>subscribe</code> method, dependent components are responsive to changes of the store's value, 
  which is accessible with <code>$storevariable</code>. See the Svelte website for more <a href=https://learn.svelte.dev/tutorial/writable-stores target="_blank">exercises</a> or 
  <a href=https://svelte.dev/examples/writable-stores target="_blank">examples</a> of stores.
</p>

<!--
<h2>Brushing</h2>
<p>
  The above is a poor-man's version, and we'd like to have a more useful brush where you can select a <i>region</i> of the plot. 
  D3 allows you to do this, but again: it does some things that are unclear to the beginning javascript programmer. 
  In the example below, we only create a proof-of-concept for brushing; in a real setting you would create separate components 
  which would solve some of the issue of the brush going outside the plot, etc.
</p>

<p>
  The plots below show the iris dataset: the left part shows sepal length (x-axis) vs sepal width (y-axis); 
  the right part sepal length (x-axis) vs petal length (y-axis). Brushing on the left part selects flowers 
  that are then highlighted on the right one.
</p>

<p><code>{`src/routes/+page.svelte`}</code>:</p>

<Highlight language={xml} code=
{`<script>
    import { scaleLinear } from 'd3-scale';
    import Papa from 'papaparse';
    import { onMount } from 'svelte';
    import { extent } from 'd3-array'

    let w = 400;
    let h = 400;

    let datapoints = []
    onMount(() => {
        Papa.parse("https://vda-lab.github.io/assets/iris.csv", {
            header: true,
            download: true,
            complete: function(results) {
                let counter = 0
                datapoints = results.data.slice(0,-1)
                datapoints.map((d) => d.sepal_length = +d.sepal_length)
                datapoints.map((d) => d.sepal_width = +d.sepal_width)
                datapoints.map((d) => d.petal_length = +d.petal_length)
                datapoints.map((d) => d.petal_width = +d.petal_width)
                datapoints.forEach((d) => {
                    d["id"] = counter
                    counter++;
                })
            }
        })
    })

    // slScale: sepal_length, swScale: sepal_width, plScale: petal_length
    $: slScale = scaleLinear().domain(extent(datapoints.map((d) => { return d.sepal_length}))).range([5,w-5])
    $: swScale = scaleLinear().domain(extent(datapoints.map((d) => { return d.sepal_width}))).range([h-5,5])
    $: plScale = scaleLinear().domain(extent(datapoints.map((d) => { return d.petal_length}))).range([h-5,5])

    let selectedDatapoints = [];
    // $: console.log(datapoints.filter((d) => { return selectedDatapoints.includes(d.id) }))
    
    let dragging = false;
    let startX = 0; let startY = 0;
    let startDataX = 0; let startDataY = 0;
    let brushWidth = 0; let brushHeight = 0;
    let mouseX = 0; let mouseY = 0;
    let mouseDataX = 0; let mouseDataY = 0;

    const startBrush = (e) => {
        startX = e.offsetX;
        startY = e.offsetY;

        startDataX = slScale.invert(startX)
        startDataY = swScale.invert(startY)
        mouseX = startX;
        mouseY = startY;
        dragging = true;
    };
    const updateBrush = (e) => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;

        mouseDataX = slScale.invert(mouseX)
        mouseDataY = swScale.invert(mouseY)

        brushWidth = mouseX - startX;
        brushHeight = mouseY - startY;
        if (brushWidth < 0) { brushWidth = -brushWidth; }
        if (brushHeight < 0) { brushHeight = -brushHeight; }
    };

    const getBrushedDatapoints = () => {
        selectedDatapoints = datapoints
            .filter((d) => {
                return (
                    Math.min(startDataX, mouseDataX) < d.sepal_length && d.sepal_length < Math.max(startDataX, mouseDataX) &&
                    Math.min(startDataY, mouseDataY) < d.sepal_width && d.sepal_width < Math.max(startDataY, mouseDataY)
                )})
            .map((d) => d.id);
    };
</script>

<svg width={w*2} height={h}
    on:mousedown={(e) => { startBrush(e); }}
    on:mousemove={(e) => { if (dragging) { updateBrush(e); getBrushedDatapoints(); } }}
    on:mouseup={() => { dragging = false; }}
    on:dblclick={() => { brushWidth = 0; brushHeight = 0; }}
>
    <rect class="brush" x={Math.min(startX, mouseX)} y={Math.min(startY, mouseY)}
                        width={brushWidth} height={brushHeight} />
    <g>
    {#each datapoints as datapoint}
        <circle cx={slScale(datapoint.sepal_length)} cy={swScale(datapoint.sepal_width)} r="5"
            class:selected={selectedDatapoints.includes(datapoint.id)} />
    {/each}
    </g>

    <line x1={w} x2={w} y1=0 y2={h} />
    
    <g class="plot" transform="translate({w},0)">
    {#each datapoints as datapoint}
        <circle cx={slScale(datapoint.sepal_length)} cy={plScale(datapoint.petal_length)} r="5"
            class:selected={selectedDatapoints.includes(datapoint.id)} />
    {/each}
    </g>
</svg>

<style>
    line { stroke: black}
    circle { fill: steelblue; }
    circle.selected { fill: red; }
    rect.brush { fill: black; fill-opacity: 0.3; }
</style>
`}/>
-->