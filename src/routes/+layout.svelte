<script>
  import atomOneLight from "svelte-highlight/styles/atom-one-light";
	import Sidebar from "./Sidebar.svelte";
	import './styles.css';

	let isOpen = true;
</script>

<svelte:head>
  {@html atomOneLight}
</svelte:head>

<div class="container">
	<Sidebar bind:isOpen/>
	<div class='content-container {isOpen ? 'open' : 'closed'}'>
		<div class='content'>
			<slot></slot>
		</div>
	</div>
</div>

<style>
	.container {
		margin: 0;
		position: relative;
	}

	.content-container.open {
		margin-left: 256px;
		transition: margin-left 0.3s ease;
	}

	.content-container.closed {
		margin-left: 0;
		transition: margin-left 0.3s ease;
	}

	@media (max-width: 1300px) {
		.content-container.open {
			margin-left: 0px;
		}
	}

	.content {
		padding: 20px;
		max-width: 984px;
		margin: 0 auto;
		width: 100%;
	}

	@media (max-width: 768px) {
		.content-container {
			padding: 0 15px; /* Reduce padding on smaller screens */
		}
	}

	@media (max-width: 480px) {
		.content-container {
			padding: 0 10px; /* Even smaller padding for mobile */
		}
	}

	:global(.code-half) {
			margin: 0 0;
			width: 65%;
			display: inline-block;
	}
	
	:global(.view-half) {
			width: 32%;
			display: inline-block;
			margin: auto;
			margin-left: 1em;
			vertical-align: top;
	}
</style>