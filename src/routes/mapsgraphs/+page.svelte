<script>
  import Map from './Map.svelte';
  import Force from './Force.svelte';
</script>

<h1> Specific visuals</h1>
<p>Below, we will just post example code that can be used as a starting point for more complex visuals. We won't go in depth into explaining this code, though.</p>

<h2>Map</h2>
<p>We have shown airports by just plotting their longitude and latitude as a scatterplot, but it'd be nice to plot them on top of an actual map. 
  There are different libraries for doing this, including D3 as explained in <a href=https://www.pluralsight.com/guides/maps-made-easy-with-d3 target="_blank"> this tutorial</a>
  and the <a href=https://leafletjs.com>leaflet-package</a> developed by Vladimir Agafonkin.
</p>

<p>
  You'll first have to install the leaflet library with <code>{`npm i -d leaflet`}</code>. 
  You will also have to add the following line to your <code>{`+page.js`}</code>: 
  <code>{`export const ssr = false;`}</code>
</p>

<p>A minimal, basic map:</p>

<Map/>

<h2>Force-directed graph</h2>
<p>
  D3 has a very solid library for drawing node-link diagrams, available at <a href=https://github.com/d3/d3-force target="_blank">d3-force</a>. 
  Install the library with <code>{`npm i -d d3-force`}</code>.
  Data for a network consists of nodes and links, and should be formatted like this:</p>

<ul>
  <li>Nodes must have an ID, e.g. <code>{`{"id": 1,"name": "A"}`}</code>.</li>
  <li>Links must have a <code>{`source`}</code> and a <code>{`target`}</code> that reference these IDs, e.g. <code>{`{"source": 1,"target": 2}`}</code>.</li>
</ul>

<p>A simple node-link diagram which allows for dragging nodes around:</p>

<Force/>

<div id="svelte-nodelink"></div>

<h3>Practice</h3>

<p>Create a network graph where the nodes are not just circles, but a glyph like we did for the iris flowers.</p>