<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
	import { base } from '$app/paths';
  import Scatterplot from './Scatterplot.svelte';
  import passing_data from '$lib/assets/passing_data_around.png';
  import iris from '$lib/assets/iris.jpg';
  import flowers from '$lib/assets/flowers.png';

  export let data = [];
</script>

<h1>Custom components</h1>

<p>What if we want to create two scatterplots instead of one, e.g. one for departure airports and one for arrival airports? We could duplicate the code for the SVG, like so:</p>

<Highlight language={xml} code=
{`<svg width="800" height="400">
  {#each datapoints as datapoint}
    <circle cx={scaleX(datapoint.from_long)}
        cy={scaleY(datapoint.from_lat)}
        r={scaleRadius(datapoint.distance)}
        class:international={datapoint.from_country != datapoint.to_country}/>
  {/each}
</svg>

<svg width="800" height="400">
  {#each datapoints as datapoint}
    <circle cx={scaleX(datapoint.to_long)}
        cy={scaleY(datapoint.to_lat)}
        r={scaleRadius(datapoint.distance)}
        class:international={datapoint.from_country != datapoint.to_country}/>
  {/each}
</svg>`}/>

<p>Oof... It would be a lot nicer if we could something like this instead:</p>

<Highlight language={xml} code=
{`<Scatterplot which="from"/>
<Scatterplot which="to"/>`}/>

<p>
  This is where we really start to get into the strengths of Svelte, 
  because it is a framework to create <i>custom HTML components</i>; in this case, a <code>{`Scatterplot`}</code> component.
</p>

<h2>The concept of components</h2>

<p>
  Svelte components allow us to create elements of our page in separate <code>.svelte</code> files. 
  The HTML part of the component will be included in our parent page, but the local <code>{`script`}</code> 
  and <code>{`style`}</code> parts are only applied to the component.
</p>

<p>In <code>{`MyComponent.svelte`}</code> (components are always capitalized!):</p>
<Highlight language={xml} code=
{`<h3>HTML in the component</h3>
<script>
  h3 {
    color=: blue;
  }
</script`}/>

<p>In <code>{`App.svelte`}</code>:</p>
<div class=code-flex>
  <Highlight language={xml} code=
{`<script>
    import MyComponent from './MyComponent.svelte'
</script>

<h2>HTML in the parent</2>
<MyComponent/>
<MyComponent/>`}/>
  <div class=view-half>
    <h2>HTML in the parent</h2>
    <h3 style="color:blue">HTML in the component</h3>
    <h3 style="color:blue">HTML in the component</h3>
  </div>
</div>

<p>
  In the <code>{`<script>`}</code> section, we load the custom 
  <code>{`MyComponent`}</code> element, and we use that in the HTML part of
  <code>{`App.svelte`}</code>. As you can see, we can call this element more than once.
</p>

<p>
  The scoping works both ways. Play around with the minimal example in the 
  <a href=https://svelte.dev/examples/nested-components target="_blank">Svelte REPL</a>.
</p>
<p>
  You will notice that the parent <code>{`script`}</code> and <code>{`style`}</code> 
  is not available within the child-component. If you need to transfer variables from parent to child, 
  add <code>export let x</code> to the child to declare an attribute <code>x</code> that can be accessed
  upon creation in the parent. In the scatterplot example above, this is <code>which="from/to"</code>, 
  where <code>which</code> is the variable name.
</p>

<h2>Converting our airports map to a component</h2>
<p>Create a new subfolder in <code>{`src`}</code> named 
  <code>{`components`}</code>, and create a new file named 
  <code>{`Scatterplot.svelte`}</code>. We'll move everything that is relevant to the scatterplot itself to this file:</p>

<Highlight language={xml} code=
{`<script>
  export let datapoints = [];

  const rescale = function(x, domain_min, domain_max, range_min, range_max) {
    return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
  }
</script>

<style>
  circle {
    opacity: 0.5;
    fill: blue;
  }
  circle.international {
    fill: red;
  }
</style>

<svg width=800 height=400>
  {#each datapoints as datapoint}
    <circle cx={rescale(datapoint.from_long, -180, 180, 0, 800)}
            cy={rescale(datapoint.from_lat, -90, 90, 400, 0)}
            r={rescale(datapoint.distance, 1, 15406, 2,10)}
            class:international="{datapoint.from_country != datapoint.to_country}" />
  {/each}
</svg>
`}/>

<p>
  In the first line of <code>{`script`}</code>, this component defines a <code>{`datapoints`}</code> variable. 
  Because of the <code>{`export let`}</code> instead of just <code>{`let`}</code> we can access this variable from outside. 
  Now how do we do that? 
  We have moved all scatterplot specific code from <code>{`src/routes/+page.svelte`}</code> into this new component. 
  We rewrite <code>{`src/routes/+page.svelte`}</code> to look like this:
</p>

<Highlight language={xml} code=
{`<script>
  import Scatterplot from './Scatterplot.svelte';
  export let data = [];
</script>

<h1>Airports</h1>
<Scatterplot datapoints={data.flights}/>
`}/>

<p>
  We first import this new <code>{`Scatterplot`}</code> element that we created. 
  We get the data just like before from <code>{`+page.js`}</code>. 
  Finally, we pass <code>{`data.flights`}</code> as the value for the 
  <code>{`datapoints`}</code> variable of the 
  <code>{`Scatterplot`}</code>. The 
  <code>{`Scatterplot`}</code> element takes a 
  <code>{`datapoints`}</code> attribute. 
  This attribute exists because we defined the <code>{`export let datapoints`}</code> in the component.</p>

<p class=intermezzo>
  Components that we create ourselves (like <code>{`Scatterplot`}</code>) must be capitalised: 
  <code>{`scatterplot`}</code> will not work. This in contrast to the regular HTML elements
   (<code>{`h1`}</code>,
   <code>{`div`}</code>,...).
</p>

<p>
  In our new <code>{`Scatterplot`}</code> component, the fact that we use the departure airports 
  (<code>{`from_long`}</code> and 
  <code>{`from_lat`}</code>) is hard-coded. We can change our code so that we can pass this as an argument. 
  In the code below, we <code>{`export`}</code> two new variables
   (<code>{`long`}</code> and
    <code>{`lat`}</code>) that we default to the departure airport.
</p>

<code>{`src/routes/Scatterplot.svelte`}</code>:
<Highlight language={xml} code=
{`<script>
  export let datapoints = [];
  export let long = 'from_long';
  export let lat = 'from_lat';

  const rescale = function(x, domain_min, domain_max, range_min, range_max) {
    return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
  }
</script>

<svg width=800 height=400>
  {#each datapoints as datapoint}
    <circle cx={rescale(datapoint[long], -180, 180, 0, 800)}
            cy={rescale(datapoint[lat], -90, 90, 400, 0)}
            r={rescale(datapoint.distance, 1, 15406, 2,10)}
            class:international="{datapoint.from_country != datapoint.to_country}" />
  {/each}
</svg>

<style>
  circle {
    opacity: 0.5;
    fill: blue;
  }
  circle.international {
    fill: red;
  }
</style>`}/>

<code>{`src/routes/+page.svelte`}</code>:

<Highlight language={xml} code=
{`<script>
  import Scatterplot from './Scatterplot.svelte';
  export let data = [];
</script>

<Scatterplot datapoints={data.flights} long="from_long" lat="from_lat" />
<Scatterplot datapoints={data.flights} long="to_long" lat="to_lat" />
`}/>

<p>
  In the <code>{`Scatterplot.svelte`}</code> component, we add the new variables, and change the hard-coded 
  call to <code>{`datapoint.from_long`}</code> to one where we use these variables (<code>{`datapoint[long]`}</code>). 
  Finally, we use this by adding the new argument when we create a scatterplot in <code>{`src/routes/+page.svelte`}</code>.
  It looks like this:
</p>

<p>"from_long" & "from_lat":</p>
<Scatterplot datapoints={data.flights} long="from_long" lat="from_lat"/>
<p>"to_long" & "to_lat":</p>
<Scatterplot datapoints={data.flights} long="to_long" lat="to_lat"/>

<p>As an exercise, you can create a more generic scatterplot component that is not specific for plotting longitudes and latitudes.</p>

<h2>Passing data around</h2>
<p>In the example above, we passed data from <code>{`src/routes/+page.svelte`}</code> to 
  <code>{`Scatterplot.svelte`}</code>. There are different ways of making data available between components 
  (i.e. different <code>{`+page.svelte`}</code> pages). Mainly, these are:</p>

<ul>
  <li>to use a Svelte <i>store</i>, but we won't go into this here.</li>
  <li>to pass them as arguments between components.</li>
</ul>

<p>It's the second solution that we are using. Here's an overview:</p>

<img src={passing_data} alt="" style="max-width: 800px"/>

<h1>Custom visuals</h1>
<p>
  We can take this further and create real custom visuals. Here, we'll use the well-known iris dataset, 
  listing the size of sepals and petals as well as the species for 150 flowers. 
  These flowers have quite distinct sepals and petals, as you can see in this picture:
</p>

<img src={iris} alt="" style="max-width: 200px" title="Source: www.plant-world-seeds.com"/>

<p>
  The data is available from 
  <a href=https://jan-to.github.io/WebDataVis/iris.csv target="_blank">https://jan-to.github.io/WebDataVis/iris.csv</a> 
  and looks like this:
</p>

<Highlight language={xml} code=
{`sepal_length,sepal_width,petal_length,petal_width,species
5.1,3.5,1.4,0.2,setosa
4.9,3.0,1.4,0.2,setosa
4.7,3.2,1.3,0.2,setosa
4.6,3.1,1.5,0.2,setosa
5.0,3.6,1.4,0.2,setosa
5.4,3.9,1.7,0.4,setosa
4.6,3.4,1.4,0.3,setosa
5.0,3.4,1.5,0.2,setosa
4.4,2.9,1.4,0.2,setosa`}/>

<p>
  It should be simple for you now to create a scatterplot showing either length and width of the sepals, or those of the petals. 
  We'll go further here, and create a small multiple view like the one below:
</p>

<img src={flowers} alt=""/>

<p>The sepals and petals are the big and small parts of the flower, respectively. We also add a circle behind it with a colour that corresponds to the species.</p>

<p>Let's first create the <code>{`Flower.svelte`}</code> component itself:</p>

<Highlight language={xml} code=
{`<script>
    // A datapoint looks like this:
    // { petalLength: 1.4,
    //   petalWidth: 0.2,
    //   sepalLength: 5.1,
    //   sepalWidth: 3.5,
    //   species: "setosa" }

    export let datapoint = {};

    let scale = 3;
    $: sl = scale * datapoint.sepalLength;
    $: sw = scale * datapoint.sepalWidth;
    $: pl = scale * datapoint.petalLength;
    $: pw = scale * datapoint.petalWidth;
    $: sepal_path =
        "M 0,0 " + "C " + sl + ",-" + sw + " " + sl + "," + sw + " 0,0 Z";
    $: petal_path =
        "M 0,0 " + "C " + pl + ",-" + pw + " " + pl + "," + pw + " 0,0 Z";
</script>

<g>
    <circle cx="0" cy="0" r="10" class={datapoint.species} />
    <path style="transform: rotate(270deg)" d={sepal_path} />
    <path style="transform: rotate(30deg)" d={sepal_path} />
    <path style="transform: rotate(150deg)" d={sepal_path} />
    <path style="transform: rotate(325deg)" d={petal_path} />
    <path style="transform: rotate(90deg)" d={petal_path} />
    <path style="transform: rotate(210deg)" d={petal_path} />
</g>

<style>
    circle.setosa {
        fill: #7570b3;
        fill-opacity: 0.3;
    }
    circle.virginica {
        fill: #1b9e77;
        fill-opacity: 0.3;
    }
    circle.versicolor {
        fill: #d95f02;
        fill-opacity: 0.3;
    }
</style>

`}/>

<p>The following things are noteworthy:</p>
<ul>
  <li>
    The <code>scale</code> we define here is just a hack-y way for getting images that I find good in size. 
    As an exercise, replace this hard-coded <code>scale</code> with a slider.
  </li>
  <li>
    Here we define the <code>{`path`}</code> to draw a single petal or sepal. 
    See the <a href="{base}/svg">chapter about curves</a> for how these are defined.
  </li>
  <li>
    Because none of these petals or sepals stand on their own but are part of a single glyph, 
    it is good practive to group them in a <code>{`<g>`}</code> element.
  </li>
  <li>The circle that is at the back of each flower and is coloured according to species.</li>
  <li>
    Each of the parts of the flower is drawn in the same way: 
    We start the path on position <code>{`(0,0)`}</code> and draw to the right. 
    For each of the parts we then rotate it. You can check the effect by removing the style attribute.
  </li>
</ul>

<p>In our <code>{`src/routes/+page.svelte`}</code> we will load this data.</p>

<Highlight language={xml} code=
{`<script>
    import Flower from './Flower.svelte'
    
    export let data = [];

    const get_xy = function(idx) {
        let y = 25 + (Math.floor(idx / 20) * 50)
        let x = 25 + ((idx % 20) * 50)
        return [x,y]
    }
    $: console.log(data.flowers)

</script>

<svg width=1000 height=1000>
    {#each data.flowers as datapoint,idx}
        <g transform="translate({get_xy(idx)[0]}, {get_xy(idx)[1]})">
            <Flower datapoint={datapoint} />
        </g>
    {/each}
</svg>
`}/>

<p>We create a function that returns an x and y offset for a given index to form a uniform grid. 
  There are better ways of doing this (later in the <a href="{base}/styling">chapter about Styling Svelte</a>), 
  but we just code our own here, creating rows of 20 flowers. We use <code>{`console.log`}</code> 
  to make sure that the datapoints we load are actually what we expect. This is a typical way in Svelte 
  to check what's going on: because we start the command with a <code>{`$:`}</code>, this will run every time the value 
  for <code>{`datapoints`}</code> changes (in our case once, after loading). We loop over all datapoints, but we return both the single datapoint
  <i>and</i> its index (which we call <code>{`idx`}</code>). This index is what will be used by 
  <code>{`get_xy`}</code> to calculate the position on the screen. Finally, we transform the flower that is 
  drawn in to put it in the correct position.</p>
