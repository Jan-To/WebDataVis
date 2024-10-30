<script>
  import { Highlight } from "svelte-highlight";
  import { javascript, xml, python } from "svelte-highlight/languages";
  import PythonWorker from "./PythonWorker.svelte";
  import { runPythonStore } from "$lib/stores/worker";
  import Scatterplot from "./Scatterplot.svelte";
  import Loadingspinner from "./Loadingspinner.svelte";
  
  let resultPromise = $state();
</script>

<h1>Machine Learning in the Web</h1>
<p>
  Processing and modeling data is a key aspect of visual analytics. However, the web environment is first and foremost designed
  to show things, not to compute things. To include the modeling functionality in our application, there are three general options:
</p>
<ul>
  <li>
    Use the available <b>JavaScript libraries</b>. There are JavaScript libraries to handle many cases of your necessary machine learning needs. 
    Here is a <a href=https://www.zipy.ai/blog/best-javascript-machine-learning-libraries target=_blank>blog post</a> that lists the hyped
    ones. You can probably find other libraries fitted to the traditional parts of clustering, dimension reduction, etc. For a simple problem, 
    you could even write it your own (though this is not the intent of this course).
  </li>
  <li>
    Use a <b>compute server</b>. The established language for machine learning is Python. We can run a Python server (e.g. with
    <a href=https://flask.palletsprojects.com/ target=_blank>Flask</a>) to do all the preprocessing
    and compute our models. This server then communicates with the browser to visualize the models. 
    This is the most common approach, as each aspect stays within its 
    estabished environment. The client + server architecture means you have two software parts running and communicating, which may induce 
    architectural complexity for development and deployment.
  </li>
  <li>
    <b>Inject Python</b> in the browser. With recent advancements of <a href=https://developer.mozilla.org/en-US/docs/WebAssembly target=_blank>Web Assembly</a>, 
    a low-level language that allows running many higher-level languages in a web browser, running Python (or C/C++/C#) alongside our JavaScript
    application is feasible. We can inject Python code in our application and run everything on demand in the client / browser.
  </li>
</ul>

<p>
  The most straightforward way is obviously to use JavaScript libraries when available. The compute server is suited for more complex settings, 
  but GitHub-Pages does not offer this functionality. If you need or want to use Python, injecting Python is a valid solution.
</p>

<h2>Injecting Python with Pyodide (code version Svelte 4)</h2>
<p>
  We recommend to use <a href=https://pyodide.org/en/stable/ target=_blank>Pyodide</a> for injecting Python in JavaScript applications.
  Find an example on how to integrate Pyodide in Svelte below.
</p>
<p>
  We want to set up a separate <i>worker thread</i> for Pyodide. That is because normal JavaScript code is processed single-threaded. 
  Running our potentially complex Python code within this thread might block other user interaction that is initiated during the
  runtime of our Python script. A parallel worker thread eliminates this problem.
</p>
<p>
  As an example, we will load the iris dataset and cluster it with the <a href=https://scikit-learn.org/stable/ target=_blank>scikit-learn</a> 
  - <a href=https://scikit-learn.org/stable/modules/clustering.html#k-means>k-Means</a> algorithm. We are aware that there is a 
  <a href=https://stevemacn.github.io/tutorials/docs/cmeans.html target=_blank>JavaScript implementation </a> of the algorithm.
</p>
<p style="margin-bottom: 1rem;"><code>static/my_python_script.py</code></p>
<Highlight language={python} code=
{`from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
# access context parameters from JavaScript thread
from js import n_clusters

X = load_iris().data
clustering = KMeans(n_clusters=n_clusters).fit(X)

results = {
    'data': X,
    'labels': clustering.labels_
}`}/>
<p>Try running the script with the button below.</p>

<button class=button onclick={runPythonStore.run}>Run Python Script</button>
<div class=pyex>
{#await resultPromise}
  <Loadingspinner size=100/>
  <p style='margin-bottom: 0.25rem;'>Setting up Pyodide environment.</p>
  <p style='margin-top: 0.25rem;'>This takes ~5 seconds the first time.</p>
{:then results} 
  {#if results?.data} 
    <Scatterplot datapoints={results.data} x="0" y="1" color={results.labels} />
  {:else}
    <p>Press the button to run script in Pyodide.</p>      
  {/if}
{/await}
</div>
<PythonWorker scriptName='my_python_script.py' bind:resultPromise />

<p>
  The significant startup time stems from setting up the Python environment in the browser. Further calls to the environment run immediately.
  You can probably hide the startup time within your initial page load.
</p>
<p>
  The Pyodide docs contain a detailed explanation on <a href=https://pyodide.org/en/stable/usage/webworker.html target=_blank>how to set up a Pyodide web worker</a>.
  However, we will provide code snippets that should serve as a good starting point for most scenarios. You don't need to grasp every detail,
  as all lines that potentially change are explained in annotations. There are four parts to our setup:
</p>
<ul>
  <li>The <b>Python script</b> to be run. See above.</li>
  <li>The <b>web worker</b> that runs the script in a separate thread.</li>
  <li>The <b>worker API</b> that exposes an interface to communicate with the web worker.</li>
  <li>The <b>consumer</b> that wants to run the Python script. E.g. this page with our button.</li>
</ul>
<h3>Web Worker</h3>
<p>The web worker will run in our separate worker thread. Hence, it needs to </p>
<ul>
  <li>Initialize the Python environment and load the required packages</li>
  <li>Listen on new messages from the main thread</li>
  <li>Run the Python script</li>
  <li>Respond back once it finished executing the Python script</li>
</ul>
<p style="margin-bottom: 1rem;"><code>static/pyodide-worker.py</code></p>
<Highlight language={javascript} code=
{`// load Pyodide --- no need to 'npm install'
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js");

async function initPyodide() {
    // init pyodide
    self.pyodide = await loadPyodide();
    // load packages that are always required
    await self.pyodide.loadPackage(['joblib', 'numpy', 'openblas', 'scikit-learn', 'scipy', 'threadpoolctl']);
}

let pyodideReadyPromise = initPyodide();


self.onmessage = async (event) => {
    // make sure loading is done (should be already)
    await pyodideReadyPromise;
    // extract like our API defined in PythonWorker.svelte
    const { id, python, ...context } = event.data;
    // the worker copies the context in its own "memory" (an object mapping name to values)
    for (const key of Object.keys(context)) {
        self[key] = context[key];
    }
    try {
        // load packages imported in specific script
        await self.pyodide.loadPackagesFromImports(python);
        // run Python code
        let results = await self.pyodide.runPythonAsync(python);
        // extract global variable by name from Python script
        let resultsTmp = self.pyodide.globals.get('results');
        // found variable?
        if ( resultsTmp ) {
            // convert variable to javascript
            results = resultsTmp.toJs({dict_converter : Object.fromEntries});
            // clean up
            resultsTmp.destroy();
        }
        // post result-message to PythonWorker.svelte
        self.postMessage({ results, id });
    } catch (error) {
        self.postMessage({ error: error.message, id });
    }
}`}/>
<p>
  The parts that may change are which libraries you want to load on startup (though you can even leave this empty as
  <code>loadPackagesFromImports</code> can determine them at runtime) and which variables you extract from the Python
  script at <code>globals.get('results')</code>.
</p>

<h3>Worker API</h3>
<p>
  The worker API is technically optional, as we could also call the worker directly, but it eases the handling tremendously.
  We organize the API in a Svelte component with the following functionality:
</p>
<ul>
  <li>Initialize and terminate the worker automatically</li>
  <li>Expose a function to run the script from outside with minimal effort, internally keeping track of call order and garbage collection</li>
  <li>Communicate the context parameters from our main thread to the worker thread</li>
</ul>
<p style="margin-bottom: 1rem;"><code>routes/ml/PythonWorker.py</code></p>
<Highlight language={javascript} code=
{`<script>
    import { base } from '$app/paths';
    import { onDestroy, onMount } from "svelte";
    import { runPythonStore } from "$lib/stores/worker";

    // get script context / parameters from stores 
    // change to property, if you want to pass directly
    import { n_clusters } from '$lib/stores/parameters';

    let { resultPromise = $bindable(), scriptName } = $props();

    let worker;
    let script;
    let id = 0;
    let callbacks = {};

    // Make runCode() globally available by calling
    // runCode() whenever the store 'runPythonCounter' changes.
    // If runCode() is only called from parent component
    // you can expose runCode() directly.
    $: $runPythonStore && runCode();

    onMount(async () => {
        initWorker();
        await initScript();
        // run script on startup or not
        // runCode(); 
    });

    async function initWorker() {
        if (!window.Worker) {
            console.log("Error: Trying to init a worker, when there already is one")
            return;
        }
        // init the pyodide worker
        worker = new Worker("pyodide-worker.js");
        // define how to handle finished worker
        worker.onmessage = (event) => {
            const { id, ...data } = event.data;
            const onSuccess = callbacks[id];
            delete callbacks[id];
            onSuccess(data);
            resultPromise = data.results;
        };
    }

    async function initScript() {
        const response = await fetch(base + '/' + scriptName);
        script = await response.text();
    }

    function runCode() {
        if (!script) {
            console.log("Error: Trying to run worker without a valid Python script")
            return;
        }
        // run script with current context
        // context is a single store here, but could be data or local variable
        resultPromise = runPythonAsync(script, { n_clusters: $n_clusters });
    }

    function runPythonAsync( script, context={} ) {
        id = (id + 1) % Number.MAX_SAFE_INTEGER;
        return new Promise((onSuccess) => {
            callbacks[id] = onSuccess;
            worker.postMessage({
                id,
                python: script,
                ...context
            });
        });
    }

    onDestroy(() => {
        if (worker) {
            worker.terminate();
        }
    });
</script>`}/>
<p>
  The adjustable parts are in the beginning of the file. We chose to get the context parameter(s) from a global store as this may be the most realistic.
  If they don't need global scope, you can expose them directly to the parent consumer. Similarly, we managed running the script <code>runCode()</code>
  over an on-change-listener to another global store. Thereby the run-command is globally available as well. If you don't need global availability, you 
  can solve this by exposing <code>runCode()</code> to the consumer directly.
</p>

<h3>Consumer</h3>
<p>
  The consumer now requests to run the Python script in the worker thread. Since it will run asynchronously, we will wait on the result with a 
  <code>resultPromise</code> that we will <code>bind</code> to the one in our <code>PythonWorker</code>.
</p>
<p style="margin-bottom: 1rem;"><code>routes/ml/+page.svelte</code></p>
<Highlight language={xml} code=
{`<script>
  import PythonWorker from "./PythonWorker.svelte";
  import { runPythonStore } from "$lib/stores/worker";

  let resultPromise;
</script>

<button class=button on:click={runPythonStore.run}>Run Python Script</button>
<!-- possible await structure, simpler scenarios may suffice -->
{#await resultPromise}
  <!-- loading spinner -->
{:then results} 
  {#if results?.data} 
    <!-- do something with {results.data} or {results.labels} -->
  {:else}
    <!-- No data & not waiting on promise -->    
  {/if}
{/await}
<PythonWorker scriptName='my_python_script.py' bind:resultPromise />`}/>

<h3>Stores (optional)</h3>
<p>
  In the above, we requested computation with <code>runPythonStore.run</code>. We solve this via a store that counts upwards 
  each time it is called. Here is how to define it:
</p>
<p style="margin-bottom: 1rem;"><code>lib/stores/worker.js</code></p>
<Highlight language={javascript} code=
{`import { writable } from 'svelte/store';

export const runPythonStore = createRunCounter();

function createRunCounter() {
  const  { subscribe, set, update } = writable(0);
  return { subscribe, set, update,
      run: () => update(n => n + 1 % Number.MAX_SAFE_INTEGER)
  };
}`}/>

<style>
  .pyex {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
    background-color: whitesmoke;
  }
</style>