<script>
  import { page } from '$app/stores';
	import { base } from '$app/paths';

  const navItems = [
    { href: base+'/', label: 'Coding Vis' },
    { href: base+'/html', label: 'HTML' },
    { href: base+'/css', label: 'CSS' },
    { href: base+'/javascript', label: 'Javascript' },
    { href: base+'/svg', label: 'SVG' },
    { href: base+'/svelte', label: 'Svelte' },
    { href: base+'/setup', label: 'Setup' },
    { href: base+'/publish', label: 'Publish'},
    { href: base+'/loading', label: 'Loading Data' },
    { href: base+'/plots', label: 'Basic Plots' },
    { href: base+'/components', label: 'Components' },
    { href: base+'/interaction', label: 'Interaction' },
    { href: base+'/mapsgraphs', label: 'Maps & Graphs' },
    { href: base+'/styling', label: 'Styling Svelte'}
  ];

  export let isOpen = false;
  function toggleSidebar() {
    isOpen = !isOpen;
  }
  $: console.log($page.url.pathname)
</script>

<div class="sidebar-container">
  <button on:click={toggleSidebar} class="toggle-btn" aria-label="Toggle Sidebar">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
  <nav class:open={isOpen}>
    <div class='sidebar-header'>
      <h1>Content</h1>
    </div>
    <ul class="navbar">
      {#each navItems as item}
        <li>
          <a href="{item.href}" class:active={$page.url.pathname === item.href}>
            {#if isOpen}
                <span>{item.label}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  .sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
  }

  .toggle-btn {
    position: fixed;
    top: 1rem;
    left: 1rem;
    background-color: #494949;
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.375rem;
    z-index: 1001;
  }

  .toggle-btn:hover {
      background-color: #333;
    }

  .toggle-btn svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #ffffffee;
    color: rgb(0, 0, 0);
    transition: all 0.3s ease-in-out;
    width: 0;
    overflow: hidden;
  }

  nav.open {
    width: 16rem;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-top: 4rem;
  }

  h1 {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0;
  } 

  li a {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    color: #000000;
    text-decoration: none;
    transition: background-color 0.2s;
		border-bottom-color: transparent;
  }

  li a:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  li a.active {
    background-color: rgba(0, 0, 0, 0.25);
  }
</style>