<script>

</script>

<h1>Machine Learning in the Web</h1>
<p>
  Processing and modeling data is a key aspect of visual analytics. However, the web environment is first and foremost designed
  to show things, not to compute things. To include the modeling functionality in our application, there are three general options:
</p>
<ul>
  <li>
    Use the available <b>javascript libraries</b>. There are javascript libraries to handle many cases of your necessary machine learning needs. 
    Here is a <a href=https://www.zipy.ai/blog/best-javascript-machine-learning-libraries target=_blank>Blog post</a> that lists the hyped
    ones. You can probably find other libraries fitted to the traditional parts of clustering, dimension reduction, etc. For a simple problem, 
    you could even write it your own (though this is not the intent of this course).
  </li>
  <li>
    Use a <b>compute server</b>. The established language for machine learning is Python. We can run a Python server to do all the preprocessing
    and compute our models and communicate with the browser to visualize them. This is the most common approach, as each aspect stays within its 
    estabished environment. The client + server architecture means you have two software parts running and communicating, which may induce 
    architectural complexity for development and deployment.
  </li>
  <li>
    <b>Inject Python</b> in the browser. With recent advancements of <a href=https://developer.mozilla.org/en-US/docs/WebAssembly target=_blank>Web Assembly</a>, 
    a low-level language that allows running many higher-level languages in a web browser, running Python (or C/C++/C#) alongside our javascript
    application is feasible. We can inject Python code in our application and run everything on demand in the client / browser.
  </li>
</ul>

<h2>Injecting Python with Pyodite</h2>
<p>
  We recomment to use <a href=https://pyodide.org/en/stable/ target=_blank>Pyodide</a> for injecting Python in javascript / Svelte applications.
  TODO Tutorial...
</p>