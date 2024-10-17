<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import bash from "svelte-highlight/languages/bash";
  import json from "svelte-highlight/languages/json";
  import javascript from "svelte-highlight/languages/javascript";
    import { androidstudio } from "svelte-highlight/styles";
</script>


<h1> Loading Data in SvelteKit</h1>
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
|      +- +page.js
|      +- about/
|      |   +- +page.svelte
|      +- contact/
|          +- +page.svelte
|          +- +page.js
|
...`}/>

<h2> Hard-coding our data</h2>
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

<h2> From an online JSON file</h2>
<p>
  Imagine we need to load the iris dataset, available from a public url. 
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
<p>
  To load that data, we'd write the following <code>{`+page.js`}</code>:
</p>

<Highlight language={javascript} code=
{`export const load = async ({ fetch }) => {
  const response = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
  const dataFlowers = await response.json()

  return { flowers: dataFlowers }
}`}/>

<p>What happens here?</p>

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

<p>The variable <i>must</i> be called <code>{`data`}</code> and it <i>must</i> be defined in the corresponding <code>+page.svelte</code>.</p>

<div class=intermezzo>
  <h2>Synchronous vs asynchronous programming</h2>
  <p>
    In contrast to other languages that you may know (e.g. python and R), javascript is an <i>asynchronous</i> language. 
    When you write a program in a synchronous programming language, the program executes instructions in series. 
    This means that each instruction must be completed before moving on to the next one. 
    In contrast, in an asynchronous programming language like javascript, 
    the program can start executing a new instruction before completing the previous one. 
    In some cases we do not want that and actually need to wait until the previous command has finished. 
    To get around it, we can use <a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises target="_blank">promises</a> 
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

<h2> From an online CSV file</h2>
<p>
  In contrast to JSON, <code>{`fetch`}</code> is not able to automatically parse a CSV file. 
  We'll have to do that ourselves. We have to install the PapaParse npm package. To do so:
</p>

<ul>
  <li>Stop the <code>{`npm run dev`}</code> server.</li>
  <li>Run <code>{`npm i -d papaparse`}</code> in the root folder of your Svelte application. 
    This will <code>i</code> (install) the package also for <code>-d</code> (development).</li>
  <li>Restart <code>{`npm run dev`}</code>.</li>
</ul>
<p>Here's a working example using data about flights. The file <code>flights_part.csv</code> looks like this:</p>

<Highlight language={json} code=
{`from_airport,from_city,from_country,from_long,from_lat,to_airport,to_city,to_country,to_long,to_lat,airline,airline_country,distance
Balandino,Chelyabinsk,Russia,61.838,55.509,Domododevo,Moscow,Russia,38.51,55.681,Aerocondor,Portugal,1458
Balandino,Chelyabinsk,Russia,61.838,55.509,Kazan,Kazan,Russia,49.464,56.01,Aerocondor,Portugal,775
Balandino,Chelyabinsk,Russia,61.838,55.509,Tolmachevo,Novosibirsk,Russia,83.084,55.021,Aerocondor,Portugal,1341
Domododevo,Moscow,Russia,38.51,55.681,Balandino,Chelyabinsk,Russia,61.838,55.509,Aerocondor,Portugal,1458
...`}/>

<Highlight language={javascript} code=
{`import Papa from 'papaparse'

export const load = async ({ fetch }) => {
    const responseFlights = await fetch('https://jan-to.github.io/WebDataVis/flights_part.csv', 
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

<h2> From a local JSON or CSV file</h2>
<p>
  The above CSV and JSON files are on a remote server. But what if we have the data on our own machine? 
  Actually, this is very simple as we are running our own server. <br/>If you put the data file in the <code>{`static`}</code>
  directory of your Svelte project, you can access it directly with
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
<h2> From an SQL database</h2>
<h2> Data stored in local SQLite3 database</h2>
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
  The path is relative to the main directory in SvelteKit.

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


<h2>= Data stored in mysql database</h2>
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

<h2> Loading multiple datasets</h2>
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

<h2>From other sources</h2>
<p>
  For a tutorial on loading from an SQL database, see 
  <a href=https://vda-lab.gitlab.io/datavis-technologies/_basic_data_visualisation_with_svelte.html#_from_an_sql_database>this tutorial</a>. 
  For the full documentation on how to load data in SvelteKit, see <a href=https://kit.svelte.dev/docs/load target="_blank">https://kit.svelte.dev/docs/load</a>.
</p>

<div class=intermezzo>
  <h2>Blocking vs. Non-blocking data loading</h2>
<p>
  Loading data via <code>+page.js</code> will load the data on the server and then render the page. 
  If the data loads slowly this can delay the display of the page significantly. In a sense, this is <i>blocking</i> data loading.
  However, svelte does offer multiple options for <i>non-blocking</i> data loading. One of them is the <code>onMount()</code> function.
  The function will run on the client after the page is already rendered. 
  <code>onMount()</code> does not block the user experience for data loading, contrary to loading with <code>+page.js</code>.
  The <i>Basic Plots</i> and the <i>Components</i> pages are using the <code>+page.js</code> loading, while the <i>Interaction</i> and
  <i>Maps & Graphs</i> pages are using <code>onMount()</code>. 
  Try it out, you will notice the difference.
</p>

<Highlight language={xml} code=
{`<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let flights = [];

  onMount(async () => {
    const response = await fetch(base + "/flights_part.json")
    flights = await response.json()
  });
</script>`}/>

<p>
  So why not always use <code>onMount()</code>? There are arguments for both techniques. 
  Data loaded with <code>onMount()</code> is defined as the default value (often <code>undefined</code>) on the first rendering pass
  and only get defined later. There are plenty of cases, where this can break your code. Also some data might be so <i>essential</i>
  to your page that a display without is not sensible. Other times, loading from the server is significantly faster than loading from the client. 
  So <code>+page.js</code> has valid use cases.
</p>
</div>
