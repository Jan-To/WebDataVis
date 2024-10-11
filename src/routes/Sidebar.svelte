<script>
  import { page } from '$app/stores';
	import { base } from '$app/paths';

  const navItems = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/htmlcssjs', label: 'HTML, CSS and Javascript', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/svg', label: 'Drawing an SVG', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/svelteintro', label: 'Visualization in Svelte', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/components', label: 'Custom Components', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/svelteadvanced', label: 'Advanced Vis in Svelte', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  export let isOpen = false;
  function toggleSidebar() {
    isOpen = !isOpen;
  }
</script>

<!--
{#each navItems as item}
  <li>
    <a href={item.href} class:active={$page.url.pathname === item.href}>
-->

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
          <a href="{base}{item.href}" class:active={$page.url.pathname === item.href}>
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