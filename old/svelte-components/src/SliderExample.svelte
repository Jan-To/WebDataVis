<script>
    let slider_value = 50;

	$: multiplied_value = slider_value * 2
</script>

<style>
	div {
		background-color: whitesmoke;
		border: 1px solid;
		padding: 5px;
	}
</style>

<div>
    <input type="range" min="0" max="100" bind:value={slider_value} />
    <p>The value {slider_value} multiplied by 2 is {multiplied_value}.</p>
</div>
