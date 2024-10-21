<script>
  import { page } from '$app/stores';

  export let navItems = [];

  export let isOpen = false;
  function toggleSidebar() {
    isOpen = !isOpen;
  }
</script>

<div class="sidebar-container">
  <button on:click={toggleSidebar} class="toggle-btn button" aria-label="Toggle Sidebar">
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
                <svg class=icon width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d={item.path}/></svg>
                <span>{item.label}</span>
              {/if}
            </a>
          </li>
          {#if ['Code Vis','SVG','Load Data','Load Data','Maps & Graphs'].includes(item.label) }
            <hr/>
          {/if}
      {/each}
    </ul>
  </nav>
</div>

<style>
  .icon {
    padding-right: 0.7rem;
  }

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
    z-index: 1001;
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
    background-color: var(--sidebar-color);
    color: var(--secondary-color);
    transition: all 0.3s ease-in-out;
    width: 0;
    overflow: auto;
  }

  nav.open {
    width: var(--sidebar-width);
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
    color: var(--contrast-color);
    text-decoration: none;
    transition: background-color 0.2s;
		border-bottom-color: transparent;
  }

  li a:hover {
    background-color: color-mix(in srgb, var(--primary-color), var(--secondary-color));
  }

  li a.active {
    background-color: var(--secondary-color);
    color: var(--text-color);
  }

	hr {
		margin: 10px 0;
    border-bottom: 2px solid color-mix(in srgb, var(--primary-color), var(--secondary-color));
    border-top: transparent;
	}
</style>