<script>
	import ashes from "svelte-highlight/styles/ashes";
	import { base } from '$app/paths';

	let sidebarVisible = true;
	function closeSidebar() {
		sidebarVisible = false;
	}
	function openSidebar() {
		sidebarVisible = true;
	}
</script>

<svelte:head>
  {@html ashes}
</svelte:head>

<div class="container">
	<div class="sidebar {sidebarVisible ? "active" : ""}">
    <button class="close-btn" id="closeBtn" on:click={closeSidebar}>×</button>
		<h1>Content</h1>
		<ul class="navbar">
			<li class="nav-element"><a href="{base}/">About</a></li>
			<li class="nav-element"><a href="{base}/htmlcssjs">HTML, CSS and Javascript</a></li>
			<li class="nav-element"><a href="{base}/svg">Drawing an SVG</a></li>
			<li class="nav-element"><a href="{base}/svelteintro">Visualization in Svelte</a></li>
			<li class="nav-element"><a href="{base}/components">Custom Components</a></li>
			<li class="nav-element"><a href="{base}/svelteadvanced">Advanced Vis in Svelte</a></li>
		</ul>
	</div>
	<div class='content-container {sidebarVisible ? '' : 'hidden-sidebar'}'>
		<button class="open-btn" id="openBtn" on:click={openSidebar}>☰</button>
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

	.sidebar {
		position: fixed;
		left: -240px;
		width: 240px;
		height: 100%;
		background-color: #f8f8f7;
		border-right: 1px solid #efefed;
		float: left;
		margin: 0;
		transition: 0.3s ease;
	}
	
	.sidebar.active {
  	left: 0; /* When active, bring it to the screen */
	}

	.sidebar h1 {
		margin-left: 20px;
	}

	.content-container {
		padding: 20px;
	}

	.content {
		max-width: 1024px;
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

  .open-btn,
  .close-btn {
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 18px;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 10px;
  }

  .open-btn {
    display: none;
  }

  /* When the sidebar is hidden, show the "Open" button */
  .hidden-sidebar .open-btn {
    display: inline-block;
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

	:global(a) {
		color: #0056b3; /* A modern shade of blue */
		text-decoration: none; /* No default underline */
		border-bottom: 2px solid transparent; /* Invisible border for animation */
		transition: color 0.3s ease, border-color 0.3s ease; /* Smooth color and border transition */
	}

	:global(a:hover, a:focus) {
		border-bottom-color: #0056b3; /* Animate the underline */
	}

	:global(a:visited) {
		color: #0056b3;
	}
</style>