<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";

  let slider_value = 50;
  $: multiplied_value = slider_value * 2
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<script>
  let slider_value = 50;
  $: multiplied_value = slider_value * 2
</script>

<input type="range" min="0" max="100" bind:value={slider_value}/>
<p>The value {slider_value} multiplied by 2 is {multiplied_value}.</p>`}/>
</div>
<div class=view-half>
  <input type="range" min="0" max="100" bind:value={slider_value} />
  <p>The value {slider_value} multiplied by 2 is {multiplied_value}.</p>
</div>