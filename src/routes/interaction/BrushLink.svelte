<script>
    import Papa from 'papaparse';
    import { onMount } from 'svelte';
    import Scatterplot from './Scatterplot.svelte';
  
    let datapoints = []
    let selected_datapoint = undefined

    onMount(() => {
        Papa.parse("https://vda-lab.github.io/assets/iris.csv", {
            header: true,
            download: true,
            complete: function(results) {
                datapoints = results.data.slice(0,-1)
                let counter = 0;
                datapoints.forEach((d) => {
                    d["id"] = counter
                    counter++;
                })
            }
        })
    })
</script>
  
<table>
    <tr>
        <td>
            <Scatterplot 
                bind:selected_datapoint={selected_datapoint} 
                datapoints={datapoints} 
                x="sepal_length" y="sepal_width"/>
        </td>
        <td>
            <Scatterplot 
                bind:selected_datapoint={selected_datapoint} 
                datapoints={datapoints} 
                x="petal_length" y="petal_width"/></td>
    </tr>
</table>