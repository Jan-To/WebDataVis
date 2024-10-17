<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import bash from "svelte-highlight/languages/bash";
  import Slider from "./Slider.svelte";
</script>

<h1> Basic data visualisation with Svelte</h1>

<p>
  The code in the previous section with <code>getElementById</code>, <code>setAttribute</code>, <code>appendChild</code>, 
  etc gets the job done, but it's very verbose. But there are easier ways of doing this. 
</p>
<p>
  In this tutorial, 
  we will use <a href=http://svelte.dev target="_blank">Svelte</a> and <a href=http://kit.svelte.dev target="_blank">SvelteKit</a> as our main approach. 
  SvelteKit is a programming framework like React or Vue that provides us with some tools to build websites 
  (and therefore visualisations) more easily. Svelte is a preprocessor that converts code that we write into vanilla javascript. 
  You can compare SvelteKit to a restaurant, and Svelte to its kitchen. The magic happens in the kitchen, 
  but customers interact with it through the restaurant. <b>Svelte</b> is a language and compiler that allows you to create reusable components; 
  <b>SvelteKit</b> is a full-stack web application framework built <i>on top of</i> Svelte.
</p>

<p>Below, we'll first go over the basics of Svelte, and then integrate that into SvelteKit.</p>

<h2> HTML, CSS and javascript in Svelte</h2>
<p>
  In the previous sections, we generally kept HTML, CSS and javascript in separate files. 
  In Svelte, we do not do this. A Svelte file therefore consists of 3 parts:
</p>

<ol>
  <li>a javascript section (<code>{`<script></script>`}</code>)</li>
  <li>a CSS section (<code>{`<style></style>`}</code>)</li>
  <li>an HTML section (the rest)</li>
</ol>

<p>
  Any of these can be omitted if you don't need them.
</p>
<p class=hint>
  The javascript and CSS only apply to the HTML written in this specific file. 
  This means that different <i>components</i> (i.e. files) can be styled independently.
</p>

<h2> Using the Svelte REPL</h2>
<p>To get a quick feel of what Svelte looks like, go to the online <a href=http://svelte.dev/repl target="_blank">REPL</a> (Read-Eval-Print-Loop).</p>

<p>
  You can write regular HTML in the "App.svelte" tab, but don't need the <code>{`<html>`}</code>, <code>{`<head>`}</code> and <code>{`<body>`}</code> tags.
  A Svelte file can have three parts:
</p>

<ul>
  <li><code>{`<script>`}</code></li>
  <li><code>{`<style>`}</code></li>
  <li>the rest is HTML</li>
</ul>

<p>Copy the code below in the <a href=http://svelte.dev/repl target="_blank">REPL</a>, and you should see 2 circles and 1 rectangle:</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<svg width=200 height=150>
  <circle cx=50 cy=50 r=15 />
  <circle cx=100 cy=70 r=20 />
  <rect x=150 y=100 width=30 height=20 />
</svg>
`}/>
</div>
<div class=view-half>
  <svg width=200 height=150>
    <circle cx=50 cy=50 r=15 />
    <circle cx=100 cy=70 r=20 />
    <rect x=150 y=100 width=30 height=20 />
  </svg>
</div>

<h2> Basics of Svelte</h2>
<p>
  The Svelte website has a <a href=http://svelte.dev/tutorial target=_blank>very good tutorial</a>. 
  You should definitely go over it and refer back to it when you have questions. 
  We'll highlight loops, conditionals and reactivity in this document, but these are only a small part of Svelte's strengths.
</p>

<h3> Looping over datapoints: <code>{`{#each}`}</code></h3>
<p>
  Svelte helps us to loop over lists in a declarative way. The following code in html gives a bulleted list:
</p>

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
  In Svelte, we can create an array in the <code>{`script`}</code> section, 
  and use the <code>{`{#each}`}</code> pragma to loop over all items. First, we'll create an array called 
  <code>{`names`}</code> in the <code>{`script`}</code> section. 
  In the HTML itself, we can loop over <code>{`names`}</code>, using the <code>{`{#each}`}</code> directive 
  (which is closed using <code>{`{/each}`}</code>). 
  Note that the <code>{`{#each}`}</code> syntax works only in the HTML part of a Svelte file, 
  not for the script part which is regular javascript.
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
  In the loop, each value is put in the temporary variable <code>{`name`}</code>.
  You can refer to the value of javascript variables that were defined in the <code>{`<script>`}</code> section or in 
  the <code>{`{#each}`}</code> pragma by putting between curly brackets, e.g. <code>{`{name}`}</code>. 
</p>

<p>
  
</p>

<p>
  Similarly, instead of hard-coding the datapoints in the SVG, or using the <code>{`getElementById`}</code>, 
  <code>{`appendChild`}</code> etc as in the previous section, 
  we have an easier way of looping over datapoints in Svelte. First, we'll create an array called <code>{`datapoints`}</code>, 
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

<p class=hint>
  Go to the <a href=http://svelte.dev/tutorial target="_blank">svelte tutorial</a> at  and go through the following sections: "Introduction" and "Logic"
</p>

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
  This is one of the major features of Svelte which has an immense effect on programming experience, its <i>reactivity</i>. 
  Reactivity means that when some variable <code>{`a`}</code> depends on a variable <code>{`b`}</code>, and 
  <code>{`b`}</code> is changed, that the value of <code>{`a`}</code> is automatically updated as well. 
  This is what makes a tool like Excel so strong: if you have a cell in a spreadsheet with a formula <code>{`=A1*2`}</code>, 
  it will have the value of cell A1 multiplied by 2. If you change the value of A1, the value in the derived cell is <i>automatically</i> updated as well. 
  Most programming languages do not have this baked in, but with Svelte you do have that functionality.

  We do this using the <code>{`$:`}</code> pragma. For example:
</p>

<Slider/>

<p>
  We've seen before that we can use curly brackets <code>{`{}`}</code> to pass in a value. Here we also need to work in the other direction: 
  when the value of the slider changes, it should be passed through to the script above. We do that using <code>{`bind:value`}</code>. 
  Sliding left and right will now update the multiplied value as well. You can try it below.
</p>