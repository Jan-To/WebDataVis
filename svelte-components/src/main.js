import FlightsWithSlider from './FlightsWithSlider.svelte';
import SliderExample from './SliderExample.svelte';
import BrushLink from './BrushLink.svelte';
import RealBrushLink from './RealBrushLink.svelte';
import FlowersWithSlider from './FlowersWithSlider.svelte';
import ScatterplotWithTooltip from './ScatterplotWithTooltip.svelte';
import NodeLink from './NodeLink.svelte';

new SliderExample({
	target: document.querySelector('#svelte-slider')
})

new FlightsWithSlider({
	target: document.querySelector('#svelte-flights-with-slider')
})

new BrushLink({
	target: document.querySelector('#svelte-brushlink')
})

new RealBrushLink({
	target: document.querySelector('#svelte-realbrushlink')
})

new FlowersWithSlider({
	target: document.querySelector('#svelte-flowers-with-slider')
})

new ScatterplotWithTooltip({
	target: document.querySelector('#svelte-tooltip')
})

new NodeLink({
	target: document.querySelector('#svelte-nodelink')
})