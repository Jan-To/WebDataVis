<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import bash from "svelte-highlight/languages/bash";
  import json from "svelte-highlight/languages/json";
  import javascript from "svelte-highlight/languages/javascript";
  import Slider from "./Slider.svelte";
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

  export let data = [];
</script>

<h1> Basic data visualisation with svelte</h1>

<p>
  The code in the previous section with <code>getElementById</code>, <code>setAttribute</code>, <code>appendChild</code>, 
  etc gets the job done, but it's very verbose. But there are easier ways of doing this. In this tutorial, 
  we will use http://svelte.dev[svelte] and http://kit.svelte.dev[sveltekit] as our main approach. 
  Sveltekit is a programming framework like React or Vue that provides us with some tools to build websites 
  (and therefore visualisations) more easily. Svelte is a preprocessor that converts code that we write into vanilla javascript. 
  You can compare sveltekit to a restaurant, and svelte to its kitchen. The magic happens in the kitchen, 
  but customers interact with it through the restaurant. *Svelte* is a language and compiler that allows you to create reusable components; 
  <b>SvelteKit</b> is a full-stack web application framework built <i>on top of</i> Svelte.
</p>

<p>
  "Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and 
  Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. 
  Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes."
  -- svelte.dev
</p>

<p>Below, we'll first go over the basics of svelte, and then integrate that into sveltekit.</p>

<h2> HTML, CSS and javascript in svelte</h2>
<p>
  In the previous sections, we generally kept HTML, CSS and javascript in separate files. 
  In svelte, we do not do this. A svelte file therefore consists of 3 parts:
</p>

<ol>
  <li>a javascript section (<code>{`<script></script>`}</code>)</li>
  <li>a CSS section (<code>{`<style></style>`}</code>)</li>
  <li>an HTML section (the rest)</li>
</ol>

<p>
  Any of these can be omitted if you don't need them.

  IMPORTANT: The javascript and CSS only apply to the HTML written in this specific file. 
  This means that different <i>components</i> (i.e. files) can be styled independently.
</p>

<h2> Using the svelte REPL</h2>
<p>To get a quick feel of what Svelte looks like, go to the online <a href=http://svelte.dev/repl>REPL</a> (Read-Eval-Print-Loop).</p>

You can write regular HTML in the "App.svelte" tab, but don't need the <code>{`<html>`}</code>, <code>{`<head>`}</code> and <code>{`<body>`}</code> tags.

A svelte file can have three parts:

<ul>
  <li><code>{`<script>`}</code></li>
  <li><code>{`<style>`}</code></li>
  <li>the rest is HTML</li>
</ul>

<p>Change the code in the editor with the code below, and you should see 2 circles and 1 rectangle:</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<svg width=400 height=400>
  <circle cx=100 cy=100 r=15 />
  <circle cx=150 cy=75 r=20 />
  <rect x=250 y=300 width=30 height=20 />
</svg>
`}/>
</div>
<div class=view-half>
  <svg width=400 height=400>
    <circle cx=100 cy=100 r=15 />
    <circle cx=150 cy=75 r=20 />
    <rect x=250 y=300 width=30 height=20 />
  </svg>
</div>

<h2> Basics of svelte</h2>
The svelte website has a very good tutorial at http://svelte.dev/tutorial. You should definitely go over it and refer back to it when you have questions. We'll highlight loops, conditionals and reactivity in this document, but these are only a small part of svelte's strengths.

<h3> Looping over datapoints: <code>{`{#each}`}</code></h3>
Svelte helps us to loop over lists in a declarative way. The following code in html gives a bulleted list:

<div class=code-half>
    <Highlight language={xml} code=
{`<ul>
  <li>John</li>
  <li>Jane</li>
  <li>Joe</li>
</ul>`}/>
</div>
<div class=view-half>
  <ul>
    <li>John</li>
    <li>Jane</li>
    <li>Joe</li>
  </ul>
</div>

<p>  
  In svelte, we can create an array in the <code>{`script`}</code> section, 
  and use the <code>{`#each`}</code> pragma to loop over all items. First, we'll create an array called 
  <code>{`names`}</code> (denoted with the 
  square brackets <code>{`[]`}</code>) 
  in the <code>{`script`}</code> section. 
  In the HTML itself, we can loop over them, using the <code>{`{#each}`}</code> directive 
  (which is closed using <code>{`{/each}`}</code>). In that loop, each value is put in the 
  temporary variable <code>{`name`}</code>:
</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<script>
  let names = ["John","Jane","Joe"];
</script>

<ul>
  {#each names as name}
    <li>{name}</li>
  {/each}
</ul>`}/>
</div>
<div class=view-half>  
  <ul>
    {#each ["John","Jane","Joe"] as name}
      <li>{name}</li>
    {/each}
  </ul>
</div>

<p>
  NOTE: You can refer to javascript variables that were defined in the <code>{`<script>`}</code> section or in 
  the <code>{`#each`}</code> pragma by putting between curly 
  brackets, e.g. <code>{`{name}`}</code>.
</p>

<p>
  IMPORTANT: The <code>{`{#each}`}</code> syntax works only in the HTML part of a svelte file, not for the script part which is regular javascript.
</p>

<p>
  Similarly, instead of hard-coding the datapoints in the SVG, or using the <code>{`getElementById`}</code>, 
  <code>{`appendChild`}</code> etc as in the previous section, 
  we have an easier way of looping over datapoints in svelte. First, we'll create an array called <code>{`datapoints`}</code>, 
  each containing an <code>{`x`}</code> and
  <code>{`y`}</code> value in 
  the <code>{`script`}</code> section. In the HTML itself, we can loop over them, 
  using the <code>{`{#each}`}</code> directive 
  (which is closed using <code>{`{/each}`}</code>).
</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<script>
  let datapoints = [{x: 100, y: 100},
                    {x: 150, y: 275},
                    {x: 10, y: 101},
                    {x: 80, y: 183},
                    {x: 350, y: 45},
                    {x: 201, y: 285},
                    {x: 150, y: 306},
                    {x: 90, y: 102},
                    {x: 73, y: 39},
                    {x: 332, y: 269}]
</script>

<svg width=400 height=400>
  {#each datapoints as dp}
    <circle cx={dp.x} cy={dp.y} r=10 />
  {/each}
</svg>

<style>
    circle {
        fill-opacity: 0.5;
    }
</style>`}/>
</div>
<div class=view-half>
  <svg width=400 height=400>
    {#each [{x: 100, y: 100},
    {x: 150, y: 275},
    {x: 10, y: 101},
    {x: 80, y: 183},
    {x: 350, y: 45},
    {x: 201, y: 285},
    {x: 150, y: 306},
    {x: 90, y: 102},
    {x: 73, y: 39},
    {x: 332, y: 269}] as dp}
      <circle cx={dp.x} cy={dp.y} r=10 fill-opacity=0.5/>
    {/each}
  </svg>
</div>

<p>
  In line 21-23, we loop over the <code>{`datapoints`}</code> array, each time putting a single element in a 
  local <code>{`dp`}</code> variable. We can refer to the <code>{`x`}</code> and 
  <code>{`y`}</code> properties like we do on line 22.
</p>

<p>
  NOTE: As with regular arrays, you can refer to javascript <i>objects</i> that were defined in the <code>{`<script>`}</code> section or 
  in the <code>{`#each`}</code> pragma by putting between curly brackets, 
  e.g. <code>{`{dp.x}`}</code>, and adding a period followed by the property.
</p>

<h3> Conditionals: <code>{`{#if}`}</code></h3>
<p>
  Similarly, the <code>{`{#if}`}</code> directive 
  (in full: <code>{`{#if} ... {:else} ... {/if}`}</code>) allows you to put conditions in your html.
  For example, let's create an array of individuals as objects, that contain both a name and a gender.
</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<script>
  let individuals = [
    {"name":"Julia","gender":"F"},
    {"name":"John","gender":"M"},
    {"name":"Joe","gender":"M"},
    {"name":"Jane","gender":"F"}];
</script>

<ul>
    {#each individuals as individual}
        {#if individual.gender == "F"}
            <li>{individual.name} ({individual.gender})</li>
        {/if}
    {/each}
</ul>`}/>
</div>
<div class=view-half>
  <ul>
    <li>Julia (F)</li>
     <li>Jane (F)</li>
   </ul>
</div>

<p>TIP: Go to the <a href=http://svelte.dev/tutorial>svelte tutorial</a> at  and go through the following sections: "Introduction" and "Logic"</p>

<p>For our scatterplot, let's add a value to all these datapoints, and draw either a blue circle or a red rectangle based on that value.</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<script>
  let datapoints = [{x: 100, y: 100, value: 9},
                    {x: 150, y: 275, value: 11},
                    {x: 10, y: 101, value: 72},
                    {x: 80, y: 183, value: 2},
                    {x: 350, y: 45, value: 10},
                    {x: 201, y: 285, value: 109},
                    {x: 150, y: 306, value: 24},
                    {x: 90, y: 102, value: -4},
                    {x: 73, y: 39, value: 88},
                    {x: 332, y: 269, value: 8}]
</script>

<svg width=400 height=400>
  {#each datapoints as datapoint}
    {#if datapoint.value > 10}
      <circle cx={datapoint.x} cy={datapoint.y} r=10 />
    {:else}
      <rect x={datapoint.x} y={datapoint.y} width=10 height=10 />
    {/if}
  {/each}
</svg>

<style>
  svg {
    background-color: whitesmoke;
  }
  circle {
    fill: steelblue;
  }
  rect {
    fill: red;
  }
</style>`}/>
</div>
<div class=view-half>
  <svg width=400 height=400 background-color=whitesmoke>
    {#each [{x: 100, y: 100, value: 9},
    {x: 150, y: 275, value: 11},
    {x: 10, y: 101, value: 72},
    {x: 80, y: 183, value: 2},
    {x: 350, y: 45, value: 10},
    {x: 201, y: 285, value: 109},
    {x: 150, y: 306, value: 24},
    {x: 90, y: 102, value: -4},
    {x: 73, y: 39, value: 88},
    {x: 332, y: 269, value: 8}] as datapoint}
      {#if datapoint.value > 10}
        <circle cx={datapoint.x} cy={datapoint.y} r=10 fill=steelblue/>
      {:else}
        <rect x={datapoint.x} y={datapoint.y} width=10 height=10 fill=red/>
      {/if}
    {/each}
  </svg>
</div>

<h3> Reactivity</h3>
<p>
  This is one of the major features of svelte which has an immense effect on programming experience, its <i>reactivity</i>. 
  Reactivity means that when some variable <code>{`a`}</code> depends on a variable <code>{`b`}</code>, and 
  <code>{`b`}</code> is changed, that the value of <code>{`a`}</code> is automatically updated as well. 
  This is what makes a tool like Excel so strong: if you have a cell in a spreadsheet with a formula <code>{`=A1*2`}</code>, 
  it will have the value of cell A1 multiplied by 2. If you change the value of A1, the value in the derived cell is <i>automatically</i> updated as well. 
  Most programming languages do not have this baked in, but with svelte you do have that functionality.

  We do this using the <code>{`$:`}</code> pragma. For example:
</p>

<Slider/>

<p>
  We've seen before that we can use curly brackets <code>{`{}`}</code> to pass in a value. Here we also need to work in the other direction: 
  when the value of the slider changes, it should be passed through to the script above. We do that using <code>{`bind:value`}</code>. 
  Sliding left and right will now update the multiplied value as well. You can try it below.
</p>

<h2> About sveltekit</h2>

<h3> Local installation</h3>

<p>
  Although it is extremely useful for quickly checking things, we can't use the REPL for <i>real</i> work. Still, you might go back to it regularly to test something out. 

  Instead, we can develop sveltekit applications (i.c. visualisations) locally, on our own machine. 
  See <a href=https://kit.svelte.dev>the sveltekit website</a> on how to get set up. 
  These are the commands you need:
</p>

<Highlight language={bash} code=
{`npm create svelte@latest my-app
cd my-app
npm install
npm run dev -- --open
`}/>

<p>
  The first step will create a new directory (called <code>{`my-app`}</code>) with your application. It will ask you for some information 
  like if you'd want to have an empty (skeleton) setup, or already have demo code included. The <code>{`npm run install`}</code> installs 
  all dependencies (which are listed in the <code>{`package.json`}</code> file). 
  Finally, <code>{`npm run dev`}</code> will start a local webserver so 
  that you can access your application. The output will list which port the application is running on. This will most probably 
  be port 5173, so you should open the website <code>{`http://localhost:5173`}</code>. If you 
  use <code>{`npm run dev -- --open`}</code> it will automatically open that website for you.
  <br/>
  NOTE: Using <code>{`npm run dev`}</code> without the <code>{`-- --open`}</code> works as well. You will however need to open the webpage yourself. 
  This is often the better option if you want to restart the server.
</p>

<h3> Directory structure and routing</h3>
<p>To understand how data can be loaded in sveltekit, we need to understand how routing works. <i>Routing</i> maps a file to a URL and vice versa. 
  The directory structure in sveltekit is important: each URL points to a subdirectory of <code>{`src/routes`}</code>. For example:
</p>

<ul>
  <li>http://localhost:5173 points to the <code>{`src/routes/`}</code> directory</li>
  <li>http://localhost:5173/about points to the <code>{`src/routes/about/`}</code> directory</li>
  <li>http://localhost:5173/contact points to the <code>{`src/routes/contact/`}</code> directory</li>
  <li>...</li>
</ul>

<p>
  Each of these directories should have a <code>{`+page.svelte`}</code> (Notice 
  the <code>{`+`}</code>-sign!) file, which contains the actual content of that page.
</p>

<Highlight language={bash} code=
{`...
|
+- src/
|  +- routes/
|      +- +page.svelte
|      +- about/
|      |   +- +page.svelte
|      +- contact/
|          +- +page.svelte
|
...`}/>

See <a href=https://kit.svelte.dev/docs/routing>https://kit.svelte.dev/docs/routing</a> for more information.

<h2> Loading data in sveltekit</h2>
<p>
  As we have a <code>{`<script>`}</code> section in 
  a <code>{`.svelte`}</code> file, we can define variables and data there, like this:  
</p>

<div class=code-half>
    <Highlight language={javascript} code=
{`<script>
  let values = [1,2,3,"a string"]
</script>

{JSON.stringify(values)}`}/>
</div>
<div class=view-half>
  {JSON.stringify([1,2,3,"a string"])}
</div>
<p>
  In this example, we create a value and show a "stringified" version in the browser.

  This works great, except when we have large datasetes. We'll need to load those in a different way. Enter <code>{`+page.js`}</code>.

  If we need to load data before a page (as defined in <code>{`+page.svelte`}</code>) is rendered, we add 
  a <code>{`+page.js`}</code> file in the same directory. For example if the root <code>{`index.html`}</code> and
  <code>{`contact`}</code> need data:
</p>

<Highlight language={xml} code=
{`...
|
+- src/
|  +- routes/
|      +- +page.svelte
|      +- +page.js            <1>
|      +- about/
|      |   +- +page.svelte
|      +- contact/
|          +- +page.svelte
|          +- +page.js        <1>
|
...`}/>

<h3> Hard-coding our data</h3>
<p>
  Let's start with the proof-of-principle setup: we hard-code the data to be loaded.

  Make the <code>{`src/routes/+page.js`}</code> look like this:
</p>

<Highlight language={javascript} code=
{`export const load = () => {
  return {
    values: [1,2,3,"a string"]
  }
}`}/>

<p>And the <code>{`src/routes/+page.svelte`}</code> look like this:</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<script>
    export let data;
</script>

{JSON.stringify(data)}`}/>
</div>
<div class=view-half>
  {JSON.stringify({values: [1,2,3,"a string"]})}
</div>

<h3> From an online JSON file</h3>
<p>
  Imagine we need to load the iris dataset, available from a public url 
  (https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json). 
  The data file looks like this:
</p>

<Highlight language={javascript} code=
{`[
  {"sepalLength": 5.1, "sepalWidth": 3.5, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 4.9, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 4.7, "sepalWidth": 3.2, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 4.6, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 5.0, "sepalWidth": 3.6, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 5.4, "sepalWidth": 3.9, "petalLength": 1.7, "petalWidth": 0.4, "species": "setosa"},
  ...
]`}/>

To load that data, we'd write the following <code>{`+page.js`}</code>:

<Highlight language={javascript} code=
{`export const load = async ({ fetch }) => {
  const response = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
  const dataFlowers = await response.json()

  return { flowers: dataFlowers }
}`}/>

What happens here?

<ol>
  <li>We create an asynchronous function <code>{`load`}</code>...</li>
  <li>...that captures the HTTP response into a variable <code>{`response`}</code>...</li>
  <li>...from which we extract the <code>{`json`}</code> part which actually contains the data.</li>
  <li>We create the actual return value of the <code>{`+page.js`}</code> file: it is
    a <i>map</i> with a single key <code>{`flowers`}</code> and its value coming 
    from <code>{`dataFlowers`}</code>.</li>
</ol>

<p>
  It's interesting to add a <code>{`console.log(response)`}</code> after line 3 to see what that <code>{`response`}</code> looks like.

  To use that data in the <code>{`+page.svelte`}</code> file, we need 
  to define a <code>{`data`}</code> variable and get the flowers from it. 
  A simple page showing the sepal length of all flowers would therefore look like this:
</p>

<div class=code-half>
    <Highlight language={javascript} code=
{`<script>
  export let data;
</script>

<ul>
  {#each data.flowers as flower}
  <li>{flower.sepalLength}</li>
  {/each}
</ul>`}/>
</div>
<div class=view-half>
  <ul>
    {#each [
      {"sepalLength": 5.1, "sepalWidth": 3.5, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
      {"sepalLength": 4.9, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
      {"sepalLength": 4.7, "sepalWidth": 3.2, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa"},
      {"sepalLength": 4.6, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa"},
      {"sepalLength": 5.0, "sepalWidth": 3.6, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
      {"sepalLength": 5.4, "sepalWidth": 3.9, "petalLength": 1.7, "petalWidth": 0.4, "species": "setosa"}] as flower}
    <li>{flower.sepalLength}</li>
    {/each}
  </ul>
</div>

NOTE: The variable <i>must</i> be called <code>{`data`}</code> and it <i>must</i> be defined in the corresponding <code>+page.svelte</code>.

<div class=intermezzo>
  <h2>Synchronous vs asynchronous programming</h2>
  <p>
    In contrast to other languages that you may know (e.g. python and R), javascript is an <i>asynchronous</i> language. 
    When you write a program in a synchronous programming language, the program executes instructions in series. 
    This means that each instruction must be completed before moving on to the next one. 
    In contrast, in an asynchronous programming language like javascript, 
    the program can start executing a new instruction before completing the previous one. 
    In some cases we do not want that and actually need to wait until the previous command has finished. 
    To get around it, we can use <a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises>promises</a> 
    with the <code>{`async/await`}</code> combination.
  </p>
</div>

<p>The <code>{`+page.js`}</code> example above is a minimal one: you can add additional data transformations. For example, the iris dataset has the following form:</p>

 <Highlight language={javascript} code=
{`[
  {"sepalLength": 5.1, "sepalWidth": 3.5, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 4.9, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 4.7, "sepalWidth": 3.2, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 4.6, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 5.0, "sepalWidth": 3.6, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa"},
  {"sepalLength": 5.4, "sepalWidth": 3.9, "petalLength": 1.7, "petalWidth": 0.4, "species": "setosa"},
  ...
]`}/>

<p>
  but we would like to add a unique ID to each of these records. Also, we'd like to have the full species name, 
  e.g. "Iris setosa" instead of just "setosa". We can adapt the script above like this:
</p>

<Highlight language={javascript} code=
{`export const load = async ({ fetch }) => {
    const responseFlowers = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
    const dataFlowers = await responseFlowers.json()
    dataFlowers.forEach((d,i) => { d.id = i, d.species = "Iris " + d.species })
  
    return { flowers: dataFlowers }
  }`}/>

<p>The data that is now passed to <code>{`+page.svelte`}</code> looks like this:</p>

<Highlight language={javascript} code=
{`[
  {"id": 0, "sepalLength": 5.1, "sepalWidth": 3.5, "petalLength": 1.4, "petalWidth": 0.2, "species": "Iris setosa"},
  {"id": 1, "sepalLength": 4.9, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.2, "species": "Iris setosa"},
  {"id": 2, "sepalLength": 4.7, "sepalWidth": 3.2, "petalLength": 1.3, "petalWidth": 0.2, "species": "Iris setosa"},
  {"id": 3, "sepalLength": 4.6, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.2, "species": "Iris setosa"},
  {"id": 4, "sepalLength": 5.0, "sepalWidth": 3.6, "petalLength": 1.4, "petalWidth": 0.2, "species": "Iris setosa"},
  {"id": 5, "sepalLength": 5.4, "sepalWidth": 3.9, "petalLength": 1.7, "petalWidth": 0.4, "species": "Iris setosa"},
  ...
]`}/>

<h3> From an online CSV file</h3>
<p>
  In contrast to JSON, <code>{`fetch`}</code> is not able to automatically parse a CSV file. 
  We'll have to do that ourselves. We have to install the PapaParse npm package. To do so:
</p>

<ul>
  <li>Stop the <code>{`npm run dev`}</code> server.</li>
  <li>Run <code>{`npm install papaparse`}</code> in the root folder of your svelte application.</li>
  <li>Restart <code>{`npm run dev`}</code>.</li>
</ul>
<p>Here's a working example using data about flights. The file <code>flights_part.csv</code> looks like this:</p>

<Highlight language={javascript} code=
{`from_airport,from_city,from_country,from_long,from_lat,to_airport,to_city,to_country,to_long,to_lat,airline,airline_country,distance
Balandino,Chelyabinsk,Russia,61.838,55.509,Domododevo,Moscow,Russia,38.51,55.681,Aerocondor,Portugal,1458
Balandino,Chelyabinsk,Russia,61.838,55.509,Kazan,Kazan,Russia,49.464,56.01,Aerocondor,Portugal,775
Balandino,Chelyabinsk,Russia,61.838,55.509,Tolmachevo,Novosibirsk,Russia,83.084,55.021,Aerocondor,Portugal,1341
Domododevo,Moscow,Russia,38.51,55.681,Balandino,Chelyabinsk,Russia,61.838,55.509,Aerocondor,Portugal,1458
...`}/>

<Highlight language={javascript} code=
{`import Papa from 'papaparse'

export const load = async ({ fetch }) => {
    const responseFlights = await fetch('https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.csv', 
      { headers: { 'Content-Type': 'text/csv' } })
    let csvFlights = await responseFlights.text()
    let parsedCsvFlights = Papa.parse(csvFlights, {header: true})

    return { flights: parsedCsvFlights.data }
}`}/>

<p>Let's walk over this code:</p>
<ol>
  <li>Import the PapaParse package</li>
  <li>During <code>fetch</code>, we have to add the <code>{`'Content-Type': 'text/csv'`}</code> to what is returned, 
    because your browser would otherwise try to download the file instead of using it in our application</li>
  <li>In the JSON example before, we got the actual data through <code>{`response.json()`}</code>. 
    Here we need it as a text: <code>{`response.text()`}</code></li>
  <li>Finally, we need to <code>parse</code> the text to actual values. This will return an object where those values 
    are available under the <code>{`data`}</code> key.</li>
</ol>

<p>You can always add a <code>{`console.log()`}</code> for <code>{`csvFlights`}</code> or
   <code>{`parsedCsvFlights`}</code> to see what those variables look like.
 
  We get the following output:
</p>

<Highlight language={xml} code=
{`Balandino (Chelyabinsk)
Balandino (Chelyabinsk)
Domododevo (Moscow)
Domododevo (Moscow)
Domododevo (Moscow)
Domododevo (Moscow)
Domododevo (Moscow)
Domododevo (Moscow)
Heydar Aliyev (Baku)
Khrabrovo (Kaliningrad)
Kazan (Kazan)
Kazan (Kazan)
Kazan (Kazan)
Kazan (Kazan)
Kazan (Kazan)
Pulkovo (St. Petersburg)
Pulkovo (St. Petersburg)
Pulkovo (St. Petersburg)
Franz Josef Strauss (Munich)`}/>

<h3> From a local JSON or CSV file</h3>
<p>
  The above CSV and JSON files are on a remote server. But what if we have the data on our own machine? 
  Actually, this is very simple as we are running our own server. <br/>If you put the data file in the <code>{`static`}</code>
  directory of your svelte project, you can access it directly with
</p>

<Highlight language={javascript} code=
{`import Papa from 'papaparse';
import { base } from '$app/paths';

export const load = async ({ fetch }) => {
  const responseJSON = await fetch(base + '/flights_part.json')
  const dataJSON = await responseJSON.json()

  const responseCSV = await fetch(base + '/flights_part.csv', {headers: {'Content-Type': 'text/csv'}})
  let textCSV = await responseCSV.text()
  let parsedCSV = Papa.parse(textCSV, {header: true})

  return { 
    flightsJSON: dataJSON,
    flightsCSV: parsedCSV.data 
  }
}`}/>

<p>
  Note that we prepend the <code>base</code> path to the url. As long as the base path is on default (<code>""</code>), this is redundant. 
  However, in case you want to deploy to a specific url (e.g. a remote server like Github-Pages), your <i>deployment</i> base path may differ
  from your <i>development</i> base path. Hence, we suggest to add the base path from the beginning.
</p>

<!--
<h3> From an SQL database</h3>
<h3> Data stored in local SQLite3 database</h3>
<p>
  Let's say we have a small database with employee data. It only has one table, <code>{`employees`}</code>, with the following
  columns: <code>{`name`}</code> and 
  <code>{`firstname`}</code>.

  To load data from this SQLite3 database, we'll use the <a href=https://knexjs.org>knex.js</a> query builder. 
  It'll make it easier to switch between different types of SQL databases later (mysql, postgresql, etc). 
  To get it to work with a local sqlite3 database, install <code>{`knex`}</code> and the necessary sqlite driver:
</p>

<Highlight language={bash} code=
{`npm install knex --save
npm install better-sqlite3 --save
`}/>

<p>Create a new file <code>{`src/lib/db.js`}</code> with the following contents:</p>

<Highlight language={javascript} code=
{`import knex from 'knex'

export default knex({
    client: 'better-sqlite3',
    connection: {
        filename: "./static/test.db"
    },
  })`}/>
<p>
  The path is relative to the main directory in sveltekit.

  Above, we have used the <code>{`+page.js`}</code> file to load our data from CSV sources. For loading SQL data, we will however need 
  to name our file <code>{`+page.server.js`}</code> 
  (see <a href=https://kit.svelte.dev/docs/routing#page-page-server-js>https://kit.svelte.dev/docs/routing#page-page-server-js</a> for details).

  Make the <code>{`+page.server.js`}</code> file look like this:
</p>

<div class=code-half>
    <Highlight language={javascript} code=
{`import db from '$lib/db';

export const load = () => {
    const fetchData = async () => {
        let employees = await db.select('*')
                                .from('employees')
                                .limit(2)
        return employees
    }

    return {
        employees: fetchData()
    }
}`}/>
</div>
<div class=view-half>

</div>

<p>We can then access these in our <code>{`+page.svelte`}</code>:</p>

<div class=code-half>
    <Highlight language={javascript} code=
{`<script>
    export let data = [];
</script>

<h1>Employees</h1>

<ul>
{#each data.employees as employee}
    <li>{employee.firstname} {employee.name}</li>
{/each}
</ul>`}/>
</div>
<div class=view-half>

</div>


<h3>= Data stored in mysql database</h3>
Loading data from a mysql database is very similar, although we will run into a small bump here.

Say we want to access data from <code>{`knownGene`}</code> table of the UCSC Genome database (http://genome-euro.ucsc.edu/).

Replace the <code>{`lib/db.js`}</code> file with the following.

<div class=code-half>
    <Highlight language={xml} code=
{`import knex from 'knex'

export default knex({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: 'genome-euro-mysql.soe.ucsc.edu',
    port: 3306,
    user: 'genome',
    password: '',
    database: 'hg38'
  },
})`}/>
</div>
<div class=view-half>

</div>

Based on our experience with sqlite3, the <code>{`+page.server.js`}</code> file would look like this:

<div class=code-half>
    <Highlight language={xml} code=
{`import db from '$lib/db';

export const load = () => {
    const fetchData = async () => {
        let genes = await db.select('*')
                                .from('knownGene')
                                .limit(20)
        return genes
    }

    return {
        genes: fetchData()
    }
}`}/>
</div>
<div class=view-half>

</div>

Unfortunately, we get an error <code>{`Error: Data returned from load while rendering / is not serializable: Cannot stringify arbitrary non-POJOs (data.genes[0])`}</code>. 
If we add a <code>{`console.log(genes)`}</code> in our 
<code>{`+page.server.js`}</code> file, we see that what is returned from the server is the following:

<div class=code-half>
    <Highlight language={xml} code=
{`[
  RowDataPacket {
    name: 'ENST00000456328.2',
    chrom: 'chr1',
    strand: '+',
    ...
  },
  RowDataPacket {
    name: 'ENST00000619216.1',
    chrom: 'chr1',
    strand: '-',
    ...
  }
]`}/>
</div>
<div class=view-half>

</div>

However, we expected the output to look like this:

<div class=code-half>
    <Highlight language={xml} code=
{`[
  {
    name: 'ENST00000456328.2',
    chrom: 'chr1',
    strand: '+',
    ...
  },
  {
    name: 'ENST00000619216.1',
    chrom: 'chr1',
    strand: '-',
    ...
  }
]`}/>
</div>
<div class=view-half>

</div>

We can accomplish this to parse the output first before we return it, using <code>{`return JSON.parse(JSON.stringify(genes))`}</code> 
instead of just <code>{`return genes`}</code> (source: https://stackoverflow.com/questions/31221980/how-to-access-a-rowdatapacket-object):

<div class=code-half>
    <Highlight language={xml} code=
{`import db from '$lib/db';

export const load = () => {
    const fetchData = async () => {
        let genes = []
        genes = await db.select('*')
                                .from('knownGene')
                                .limit(20)
        return JSON.parse(JSON.stringify(genes))
    }

    return {
        genes: fetchData()
    }
}`}/>
</div>
<div class=view-half>

</div>

<h3> Loading multiple datasets</h3>
Above we only loaded a single dataset, but obviously we will sometimes need multiple datasets in our application. To do this we just add an additional variable to the <code>{`load`}</code> function
 in our <code>{`+page.js`}</code>. For example:

[source,javascript,linenums]
<div class=code-half>
    <Highlight language={xml} code=
{`import Papa from 'papaparse'

export const load = async ({ fetch }) => {
    const responseFlights = await fetch('https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.csv', {
      headers: {
        'Content-Type': 'text/csv'
    }})
    let csvFlights = await responseFlights.text()
    let parsedCsvFlights = Papa.parse(csvFlights, {header: true})

    return {
      flights: parsedCsvFlights.data
    }
}`}/>
</div>
<div class=view-half>

</div>

[source,javascript,linenums]
<div class=code-half>
    <Highlight language={xml} code=
{`export const load = async ({ fetch }) => {
  const responseGenes = await fetch("https://some-url/genes.json")
  const dataGenes = await responseGenes.json()

  const responseProteins = await fetch("https://some-other-url/proteins.json")
  const dataProteins = await responseProteins.json()

  return {
    genes: dataGenes,
    proteins: dataProteins
  }`}/>
</div>
<div class=view-half>

</div>

As before, the <code>{`data`}</code> variable
 in <code>{`+page.svelte`}</code> is the object that is returned 
 by <code>{`+page.js`}</code> 
 (i.c. <code>{`{genes: [...,...,...], proteins: [...,...,...]}`}</code>)

<h2> Data subpages and slugs</h2>
In many cases, we might want to have a subpage for each datapoint. Imagine a blog with many posts, where those posts are stored as a large JSON structure. From what we've seen above, we are able to create a page that lists the title of all blog posts. But we're still unable to show a single blog <i>post</i>. 
Similarly, we might have a site that shows a list of genes, but you cannot go to the information of a <i>single</i> gene.

Let's say we want to create a page for every single flower, using its ID in the URL. For example, to get the information (or a visualisation) for flower 5, we would use the URL http://localhost:5173/flowers/5. This is the same URL as before for the list, but adding the flower ID. To get this to work, we use <code>{`[slug]`}</code>: create a new directory under the flowers folder:
<div class=code-half>
    <Highlight language={xml} code=
{`...
|
+- src/
|  +- routes/
|      +- +page.svelte
|      +- flowers/
|          +- +page.svelte
|          +- +page.js
|          +- [slug]
|              +- +page.svelte
|              +- +page.js
|
...`}/>
</div>
<div class=view-half>

</div>

IMPORTANT: The directory name must be <code>{`[slug]`}</code>, including the square brackets!

image:slugs.png[width=50%,pdfwidth=50%]

What this <code>{`[slug]`}</code> allows you to do, is add <i>parameters</i> to the URL. In our case, this could for example be the ID of a flower. 
The <code>{`+page.js`}</code> in 
the <code>{`[slug]`}</code> directory can be very similar to the 
one in the <code>{`flowers`}</code> directory, but there are some important differences:

[source,javascript,linenums]
<div class=code-half>
    <Highlight language={xml} code=
{`export const load = async ({ fetch, params }) => { (1)
  const res = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
  const data = await res.json()
  data.forEach((d,i) => { d.id = i })
  let data_for_slug = data.filter((d) => { return d.id == params.slug})[0] (2)

  return {
    flower: data<i>for</i>slug
  }
}`}/>
</div>
<div class=view-half>

</div>

In this code, we

<li>**(1)** call <code>{`fetch`}</code> <i>and</i><code>{`params`}</code> in the loading function instead of only <code>{`fetch`}</code></li>
<li>**(2)** filter the returned data based on the id of the flower <code>{`d.id == params.slug`}</code></li>

In the <code>{`+page.svelte`}</code> file we can then display or visualise only the information for that single flower.
-->

<h3>From other sources</h3>
<p>
  For a tutorial on loading from an SQL database, see 
  <a href=https://vda-lab.gitlab.io/datavis-technologies/_basic_data_visualisation_with_svelte.html#_from_an_sql_database>this tutorial</a>. 
  For the full documentation on how to load data in sveltekit, see <a href=https://kit.svelte.dev/docs/load>https://kit.svelte.dev/docs/load</a>.
</p>

<h2> Our first real scatterplot</h2>
<p>
  Now - finally - we can start working on the real thing and create a data visualisation. Let's plot the longitude and latitude (present as <code>{`long`}</code> and
  <code>{`lat`}</code> in the datafile) of all departure airports in 
  http://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.json. 
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
<img src={domainrange} alt="" width=50%/>
<p>The formula to do this is:</p>
<img src={scalingformula} alt="" width=50%/>
<p>
  Let's put that in a function that we can use. Add the <code>{`rescale`}</code> function to 
  the <code>{`script`}</code> section of your svelte file, and call it 
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
  (0 to 800) and height (400 to 0). We can however also use the powerful functionality provided by <a href=http://d3js.org>D3</a>.
</p>

<div class=intermezzo>

<h2>D3 - Data-Driven Documents</h2>
<p>
  D3 (Data-Driven Documents) has been the go-to library for data visualisation for many years. 
  It allows you to create very complex and interactive visuals like showcased in the <a href=https://observablehq.com/@d3/gallery>D3 gallery</a>.
</p>

<img src={d3gallery} alt="" width=75%/>

<p>
  The functionality of D3 has been split in different modules (see <a href="https://github.com/orgs/d3/repositories?type=all">here</a>), 
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
  That is why we focus on using svelte in this tutorial for the main work, and use D3 modules where they simplify a specific task (e.g. scaling). 
  For example, this <a href=https://www.connorrothschild.com/post/svelte-and-d3>blog post</a> by Connor Rothshield also goes into why he switched 
  from D3 to svelte+D3 for data visualisation. D3 is organised as a group of <a href=https://github.com/d3/d3/blob/main/API.md>modules</a>, 
  so we can choose to load only those functions that have to do with scaling (<code>{`d3-scale`}</code>), colour (<code>{`d3-color`}</code>), etc.

  Here is an overview of the different modules:
</p>

<img src={d3modules} alt="" width=60%/>
<p>
  For an interactive version, see <a href=https://wattenberger.com/blog/d3>https://wattenberger.com/blog/d3</a>, which is the source of this image.
</p>
</div>

<p>
  Let's replace our own rescaling function with a linear scale provided by D3. We will load the <code>{`scaleLinear`}</code> function 
  from <code>{`d3-scale`}</code>. Before we can start, we have to <b>install the <code>{`d3-scale`}</code> module</b> first. 
  Do this by running <code>{`npm install d3-scale`}</code> on the command line.
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
  <a href=https://github.com/d3/d3-scale>https://github.com/d3/d3-scale</a> for more information.

  Let's add another scale: we can let the size of the point be dependent of the `distance` in the csv file
</p>

<Flights4 {data}/>

<h2> Classes</h2>
<p>
  Above we have used a colour scale that ranges from red to green according to longitude. 
  If we want to handle categorical aspects in the data (e.g. if a flight is international or domestic), 
  we can actually do this easier, using HTML classes. For an overview, see the "HTML, CSS and javascript" section of this tutorial. 
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
  Using svelte, we can do this dynamically. To know if a flight is international, we can check if its <code>{`from_country`}</code> is different 
  from its <code>{`to_country`}</code>.
</p>

<Highlight language={xml} code=
{`<circle class={datapoint.from_country != datapoint.to_country ? 'international' : 'domestic' } />`}/>

<p>Or in its shorthand version:</p>

<Highlight language={xml} code=
{`<circle class:international={datapoint.from_country != datapoint.to_country} />`}/>

<Flights5 {data}/>

<h2> Exercises</h2>
<p>Here are some exercises related to this chapter:</p>

<ul>
  <li><a href="https://svelte.dev/repl/724a8216d6c84491b7b04951718f0b0d?version=3.59.1">Svelte markup</a></li>
  <li><a href="https://svelte.dev/repl/161b76456d00443db6100f7d40e546b1?version=3.59.1">Foreach</a></li>
  <li><a href="https://svelte.dev/repl/a603bddd25ed441e9680e2c93a1a1966?version=3.59.1">If-else-then</a></li>
  <li><a href="https://svelte.dev/repl/f2cdcb8400f2430f9134206798596a97?version=3.59.1">Scales</a></li>
  <li><a href="https://svelte.dev/repl/f555af12649a4d918db9f46c88ea72a0?version=3.59.1">Colour scales</a></li>
  <li><a href="https://svelte.dev/repl/a06224b0183c4f44b6de3f7a734e812e?version=3.59.1">Axes</a></li>
  <li><a href="https://svelte.dev/repl/ec5b4a3992e7459086668fe4e03c011a?version=3.59.1">Paths using d3.line</a></li>
  <li><a href="https://svelte.dev/repl/c602355ed2cf4398921f50f7746079ff?version=3.59.1">Hover</a></li>
  <li><a href="https://svelte.dev/repl/08e9e88a020244d5a7cd80b2e0befa3b?version=3.59.1">Working with objects</a></li>
  <li><a href="https://svelte.dev/repl/b31541e1dcfb439e818c639427e6db68?version=3.59.1">Extent</a></li>
  <li><a href="https://svelte.dev/repl/c6eb38ca440a4dc5b8efa487f92b771d?version=3.59.1">Make scales</a></li>
  <li><a href="https://svelte.dev/repl/4c447e06f79e4c478682b8476bf1833a?version=3.59.1">Make scatterplot</a></li>
  <li><a href="https://svelte.dev/repl/3e6b6e947bdb480687d29392d944e15c?version=3.59.1">Add axes</a></li>
  <li><a href="https://svelte.dev/repl/87536213d7044ddc9ed2dfacb208086c?version=3.59.1">Set circle colour</a></li>
</ul>