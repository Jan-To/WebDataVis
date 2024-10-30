<script>
    import { onMount } from 'svelte';
  
  /**
   * @typedef {Object} Props
   * @property {string} [owner]
   * @property {string} [repo]
   * @property {string} [branch]
   */

  /** @type {Props} */
  let { owner = "jan-to", repo = "WebDataVis", branch = 'main' } = $props();
  
    let lastUpdated = $state('Loading...');
  
    async function fetchLastUpdated() {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`);
        const data = await response.json();
        const date = new Date(data.commit.author.date);
        lastUpdated = `Last updated ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      } catch (error) {
        console.error('Error fetching last update:', error);
        lastUpdated = 'Unable to fetch last update time';
      }
    }
  
    onMount(() => {
      fetchLastUpdated();
    });
  </script>
  
  <span>{lastUpdated}</span>

  <style>
    span {
        display:grid;
        font-size: calc(var(--font-size) * 0.6);
        text-align: center;
        margin: 0.5rem;
    }
  </style>