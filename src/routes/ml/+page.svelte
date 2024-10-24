<script>
  import PythonWorker from "./PythonWorker.svelte";
  import { runPythonStore } from "$lib/stores/worker";
  import Scatterplot from "./Scatterplot.svelte";
  import Loadingspinner from "./Loadingspinner.svelte";
  
  let resultPromise;
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

<h2>Injecting Python with Pyodide</h2>
<p>
  We recomment to use <a href=https://pyodide.org/en/stable/ target=_blank>Pyodide</a> for injecting Python in JavaScript / Svelte applications.
  TODO Tutorial...
</p>

<button class=button on:click={runPythonStore.run}>Run Python Script</button>
<div class=pyex>
{#await resultPromise}
  <Loadingspinner size=100/>
  <p style='margin-bottom: 0.25rem;'>Loading local Pyodite server.</p>
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

<style>
  .pyex {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    background-color: whitesmoke;
  }
</style>