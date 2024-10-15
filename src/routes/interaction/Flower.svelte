<script>    
    export let datapoint = {}
    export let scale = 3; // add export

    $: sl = scale*datapoint.sepal_length
    $: sw = scale*datapoint.sepal_width
    $: pl = scale*datapoint.petal_length
    $: pw = scale*datapoint.petal_width
    $: sepal_path = "M 0,0 " +
                    "C " + sl + ",-" + sw +
                        " " + sl + "," + sw +
                        " 0,0 Z"
    $: petal_path = "M 0,0 " +
                    "C " + pl + ",-" + pw +
                    " " + pl + "," + pw +
                    " 0,0 Z"
</script>

<g>                <!-- dynamic radius -->
    <circle cx=0 cy=0 r={scale*3.5} class={datapoint.species}/>
    <path style="transform: rotate(270deg)" d={sepal_path}/>
    <path style="transform: rotate(30deg)" d={sepal_path}/>
    <path style="transform: rotate(150deg)" d={sepal_path}/>
    <path style="transform: rotate(325deg)" d={petal_path}/>
    <path style="transform: rotate(90deg)" d={petal_path}/>
    <path style="transform: rotate(210deg)" d={petal_path}/>
</g>

<style>
    circle.setosa {
        fill: #7570b3;
        fill-opacity: 0.3;
    }
    circle.virginica {
        fill: #1b9e77;
        fill-opacity: 0.3;
    }
    circle.versicolor {
        fill: #d95f02;
        fill-opacity: 0.3;
    }
</style>