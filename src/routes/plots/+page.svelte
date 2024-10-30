<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import bash from "svelte-highlight/languages/bash";
  import json from "svelte-highlight/languages/json";
  import javascript from "svelte-highlight/languages/javascript";
  import d3gallery from "$lib/assets/d3-gallery.png";
  import d3modules from "$lib/assets/d3-modules.png";
  import domainrange from "$lib/assets/domainrange.png";
  import scalingformula from "$lib/assets/scalingformula.png";
  import Flights0 from "./flights0.svelte";
  import Flights1 from "./flights1.svelte";
  import Flights2 from "./flights2.svelte";
  import Flights3 from "./flights3.svelte";
  import Flights4 from "./flights4.svelte";
  import Flights5 from "./Flights5.svelte";
  import Arcs from "../svg/Arcs.svelte";
  import Axes from './Axes.svelte';

  let { data = [] } = $props();
</script>

<h1> Our first real scatterplot</h1>
<p>
  Now - finally - we can start working on the real thing and create a data visualisation. 
  Let's plot the longitude and latitude (present as <code>{`long`}</code> and
  <code>{`lat`}</code> in the datafile) of all departure airports in 
  <a href='https://jan-to.github.io/WebDataVis/flights_part.csv' target="_blank">flights_part.json</a>. 
  If we do this, we should get something that looks like a map of the world.
  Load the data using <code>{`+page.js`}</code> as described above. 
  Below we show the contents of the <code>{`+page.svelte`}</code> file.
</p>

<Flights0 {data}/>

<p>
  This is clearly <i>not</i> what we expected. The reason is simple: the longitude in the data file ranges from -180 until 180 
  and the latitude is between -90 and 90. If we plot these directly as circles than 3/4 of all datapoints will be outside 
  of the SVG (because they have either a negative longitude or latitude). Instead of using <code>{`cx={datapoint.from_long}`}</code> 
  we have to rescale that longitude from its original range (called its <b>domain</b>) to 
  a new <b>range</b>.
</p>
<img src={domainrange} alt="" style="max-width: 500px"/>
<p>The formula to do this is:</p>
<img src={scalingformula} alt="" style="max-width: 600px"/>
<p>
  Let's put that in a function that we can use. Add the <code>{`rescale`}</code> function to 
  the <code>{`script`}</code> section of your Svelte file, and call it 
  where we need to set <code>{`cx`}</code> and <code>{`cy`}</code>.
</p>

<Flights1 {data}/>

<p>
  This is better, but the world is upside down. This is because the origin [0,0] in SVG is in the top left, not the bottom left. 
  We therefore have to flip the scale as well, and set the range to <code>{`400,0`}</code> instead of <code>{`0,400`}</code> for
   <code>{`cy`}</code>. If we do that we'll get the world the right side up.
</p>

<Flights2 {data}/>

<h2> D3 scales</h2>
<p>
  In the example above, we have written our own code for rescaling the longitude (-180 to 180) and latitude (-90 to 90) to width 
  (0 to 800) and height (400 to 0). We can however also use the powerful functionality provided by <a href=http://d3js.org target="_blank">D3</a>.
</p>

<div class=intermezzo>
<h2>D3 - Data-Driven Documents</h2>
<p>
  D3 (Data-Driven Documents) has been the go-to library for data visualisation for many years. 
  It allows you to create very complex and interactive visuals like showcased in the <a href=https://observablehq.com/@d3/gallery target="_blank">D3 gallery</a>.
</p>

<img src={d3gallery} alt="" style="max-width: 850px"/>

<p>
  The functionality of D3 has been split in different modules (see <a href="https://github.com/orgs/d3/repositories?type=all" target="_blank">here</a>), 
  that cover for example the creation of hexagonal bins, working with geographic projections, creating force-directed graphs, and scaling.

  Although very powerful, this library does have a steep learning curve. For example, creating a scatterplot like the one above using D3, you'd write
</p>

<Highlight language={javascript} code=
{`d3.select("#my_svg")
  .append("g")
  .selectAll("circle")
  .data(datapoints)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return rescale(datapoint.from_long, -180, 180, 0, 800) })
    .attr("cy", function(d) { return rescale(datapoint.from_lat, -90, 90, 400, 0) })
    .attr("r", 3)`}/>

<p>
  That is why we focus on using Svelte in this tutorial for the main work, and use D3 modules where they simplify a specific task (e.g. scaling). 
  For example, this <a href=https://www.connorrothschild.com/post/svelte-and-d3 target="_blank">blog post</a> by Connor Rothshield also goes into why he switched 
  from D3 to Svelte+D3 for data visualisation. D3 is organised as a group of <a href=https://github.com/d3/d3/blob/main/API.md target="_blank">modules</a>, 
  so we can choose to load only those functions that have to do with scaling (<code>{`d3-scale`}</code>), colour (<code>{`d3-color`}</code>), etc.

  Here is an overview of the different modules:
</p>

<img src={d3modules} alt="" style="max-width: 800px"/>
<p>
  For an interactive version, see <a href=https://wattenberger.com/blog/d3 target="_blank">https://wattenberger.com/blog/d3</a>, which is the source of this image.
</p>
</div>

<p>
  Let's replace our own rescaling function with a linear scale provided by D3. We will load the <code>{`scaleLinear`}</code> function 
  from <code>{`d3-scale`}</code>. Before we can start, we have to <b>install the <code>{`d3-scale`}</code> module</b> first 
  by running <code>{`npm i -d d3-scale`}</code> on the command line.
</p>

<Highlight language={xml} code=
{`<script>
  import { scaleLinear } from 'd3-scale'; (1)

  export let data = [];

  const scaleX = scaleLinear().domain([-180,180]).range([0,800]) (2)
  const scaleY = scaleLinear().domain([-90,90]).range([400,0]) (2)
</script>

<svg width="800" height="400">
  {#each data.flights as datapoint}
      <circle cx={scaleX(datapoint.from_long)} (3)
              cy={scaleY(datapoint.from_lat)}
              r=3 />
  {/each}
</svg>

<style>
  circle {
      fill: steelblue;
      fill-opacity: 0.5;
  }
</style>`}/>

<p>
  We load <code>{`scaleLinear`}</code> and make the function available in our code. 
  We define a <code>{`scaleX`}</code> and a <code>{`scaleY`}</code> function. 
  The <code>{`domain`}</code> refers to the actual data, and <code>{`range`}</code> to the projection (in this case: pixel position). 
  Then, we can use <code>{`scaleX`}</code> and <code>{`scaleY`}</code> to scale our <code>datapoint.from_long</code>.
</p>
<p>
  The range in <code>scaleLinear</code> does not have to be numeric: we can also use colours here. D3 is clever enough to interpolate colours across the range. 
  In the example below, we let the colour of the points go from red to green along with the longitude.
</p>

<Flights3 {data}/>

<p>
  We added a scale with colours as the range, removed the default colour for a circle, and set the CSS colour dynamically.
</p>
<p>
  D3 provides a lot of other scales as well, including logarithmic, time, radial etc. Check out 
  <a href=https://github.com/d3/d3-scale target="_blank">d3-scale</a> for more information.

  Let's add another scale: we can let the size of the point be dependent of the <i>distance</i> in the csv file
</p>

<Flights4 {data}/>

<h2> Classes</h2>
<p>
  Above we have used a colour scale that ranges from red to green according to longitude. 
  If we want to handle categorical aspects in the data (e.g. if a flight is international or domestic), 
  we can actually do this easier, using HTML classes. For an overview, see the "HTML, CSS and JavaScript" section of this tutorial. 
  (This will become very important once we start looking into brushing and linking in the next section.)
</p>

<p>
  If we change the code above by (a) adding a <code>{`circle.international`}</code> in the CSS that sets the fill colour to red, and 
  (b) add a <code>{`class="international"`}</code> as a property of the <code>{`circle`}</code> element, all the airports will be red. 
  But can we actually make this dependent on the actual data?

  We give an HTML element one or more classes like so:
</p>

<Highlight language={xml} code=
{`<circle class="first_class second_class third_class" />`}/>

<p>
  Using Svelte, we can do this dynamically. To know if a flight is international, we can check if its <code>{`from_country`}</code> is different 
  from its <code>{`to_country`}</code>.
</p>

<Highlight language={xml} code=
{`<circle class={datapoint.from_country != datapoint.to_country ? 'international' : 'domestic' } />`}/>

<p>Or in its shorthand version:</p>

<Highlight language={xml} code=
{`<circle class:international={datapoint.from_country != datapoint.to_country} />`}/>

<Flights5 {data}/>

<h2> Axes</h2>
<p>
  There are different ways to draw axes on plots. We exemplary use the <a href=https://en.wikipedia.org/wiki/Iris_flower_data_set target="_blank">iris dataset</a>,
  but that does not matter here. To draw axes we can follow the do-it-yourself approach, 
  or use the <code>{`d3-axis`}</code> library. The do-it-yourself approach lets you design more yourself, 
  while the <a href=https://d3js.org/d3-axis target="_blank">d3 axes</a> already solve many problems, but may lack your desired design. 
  Here we choose to do a simple axis by drawing a long line with small lines and text for each tick. 
</p>

<Axes/>

<p>
  Notice how we left some space for the axes within the <code>svg</code> via reducing the <code>scaleLinear.range</code> by some <code>margins</code>.
  As this axes definition is very simple, a few extensions come to mind:
</p>

<ul>
  <li>Add axes labels.</li>
  <li>Add grid lines within the tick loop.</li>
  <li>Swap the hard-coded tick positions through automatically determined ones, e.g. <a href=https://d3js.org/d3-array/ticks target="_blank">d3 ticks()</a>.</li>
  <li>Moving an axes within the plot, when there is a positive & negative side.</li>
  <li>Play around with muted colors</li>
</ul>

<p>
  As you have seen some things within Svelte already, you are probably able to implement these yourself. Before getting lost in design details, 
  it is helpful to remember that minimal axes often help focussing on the data, as long as they convey the necessary frame of reference.
</p>

<h2>Optional Exercises</h2>
<p>Here is a list of exercises related to this chapter or you try to implement some of the extensions mentioned above.</p>

<ul>
  <li><a href="https://svelte.dev/repl/724a8216d6c84491b7b04951718f0b0d?version=3.59.1" target="_blank">Svelte markup</a></li>
  <li><a href="https://svelte.dev/repl/161b76456d00443db6100f7d40e546b1?version=3.59.1" target="_blank">Foreach</a></li>
  <li><a href="https://svelte.dev/repl/a603bddd25ed441e9680e2c93a1a1966?version=3.59.1" target="_blank">If-else-then</a></li>
  <li><a href="https://svelte.dev/repl/f2cdcb8400f2430f9134206798596a97?version=3.59.1" target="_blank">Scales</a></li>
  <li><a href="https://svelte.dev/repl/f555af12649a4d918db9f46c88ea72a0?version=3.59.1" target="_blank">Colour scales</a></li>
  <li><a href="https://svelte.dev/repl/a06224b0183c4f44b6de3f7a734e812e?version=3.59.1" target="_blank">Axes</a></li>
  <li><a href="https://svelte.dev/repl/ec5b4a3992e7459086668fe4e03c011a?version=3.59.1" target="_blank">Paths using d3.line</a></li>
  <li><a href="https://svelte.dev/repl/c602355ed2cf4398921f50f7746079ff?version=3.59.1" target="_blank">Hover</a></li>
  <li><a href="https://svelte.dev/repl/08e9e88a020244d5a7cd80b2e0befa3b?version=3.59.1" target="_blank">Working with objects</a></li>
  <li><a href="https://svelte.dev/repl/b31541e1dcfb439e818c639427e6db68?version=3.59.1" target="_blank">Extent</a></li>
  <li><a href="https://svelte.dev/repl/c6eb38ca440a4dc5b8efa487f92b771d?version=3.59.1" target="_blank">Make scales</a></li>
  <li><a href="https://svelte.dev/repl/4c447e06f79e4c478682b8476bf1833a?version=3.59.1" target="_blank">Make scatterplot</a></li>
  <li><a href="https://svelte.dev/repl/3e6b6e947bdb480687d29392d944e15c?version=3.59.1" target="_blank">Add axes</a></li>
  <li><a href="https://svelte.dev/repl/87536213d7044ddc9ed2dfacb208086c?version=3.59.1" target="_blank">Set circle colour</a></li>
</ul>