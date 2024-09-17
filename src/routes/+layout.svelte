<script>
	import ashes from "svelte-highlight/styles/ashes";
	import { base } from '$app/paths';
</script>

<svelte:head>
  {@html ashes}
</svelte:head>

<div class="container">
	<div class="nav-container">
		<ul class="navbar">
			<li class="nav-element"><a href="{base}/">About</a></li>
			<li class="nav-element"><a href="{base}/htmlcssjs">HTML, CSS and Javascript</a></li>
			<li class="nav-element"><a href="{base}/svg">Visualization in SVG</a></li>
		</ul>
	</div>
	<div class='content-container'>
		<div class='content'>
			<slot></slot>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	.container {
		margin: 0;
		position: relative;
	}

	.nav-container {
		width: 250px;
		background-color: #f8f8f7;
		border-right: 1px solid #efefed;
		float: left;
		margin: 0;
		position: fixed;
		height: 100%;
	}

	.content-container {
		padding-left: 250px;
	}

	.content {
		max-width: 1024px;
		margin: 0 auto;
	}

	:global(.code-half) {
			margin: 0 0;
			width: 70%;
			display: inline-block;
	}
	
	:global(.view-half) {
			width: 27%;
			display: inline-block;
			margin: auto;
			margin-left: 1em;
			vertical-align: top;
	}

  :global(p) {
			margin: 13px 0;
	}

  :global(code) {
			background-color: rgb(227, 227, 227);
	}
</style>