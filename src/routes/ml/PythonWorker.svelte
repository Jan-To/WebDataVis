<script>
    import { base } from '$app/paths';
    import { onDestroy, onMount } from "svelte";
    import { runPythonStore } from "$lib/stores/worker";
    import { n_clusters } from '$lib/stores/parameters';

    export let resultPromise;
    export let scriptName;

    let worker;
    let script;
    let id = 0;
    let callbacks = {};

    // make runCode() globally available:
    // call runCode() whenever the store runPythonCounter changes
    // if runCode() is only called from parent component:
    // expose runCode() directly
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
</script>
