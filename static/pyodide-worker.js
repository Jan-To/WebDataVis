// documentation for worker setup
// https://pyodide.org/en/stable/usage/webworker.html
// "Web worker"

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
}