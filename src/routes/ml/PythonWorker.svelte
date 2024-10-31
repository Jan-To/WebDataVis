<script>
    import { base } from '$app/paths';
    import { onDestroy, onMount } from "svelte";

    let { resultPromise = $bindable(), clusters } = $props();

    let worker;
    let script;
    let id = 0;
    let callbacks = {};

    onMount(async () => {
        initWorker();
        await initScript();
        // runCode();  // run script on startup or not
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
        const response = await fetch(base + '/my_python_script.py');
        script = await response.text();
    }

    export function runCode() {
        if (!script) {
            console.log("Error: Trying to run worker without a valid Python script")
            return;
        }
        // run script with current context parameters
        resultPromise = runPythonAsync(script, { n_clusters: clusters });
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
