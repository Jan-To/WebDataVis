<script>
  /**
   * @typedef {Object} Props
   * @property {number} [size]
   */

  /** @type {Props} */
  let { size = 40 } = $props();
  let strokeWidth = size/10;

  let center = $derived(size / 2);
  let radius = $derived((size - strokeWidth) / 2);
  let circumference = $derived(2 * Math.PI * radius);
  let dashArray = $derived(`${0.25 * circumference} ${0.75 * circumference}`);
</script>

<svg
  width={size}
  height={size}
  viewBox={`0 0 ${size} ${size}`}
  xmlns="http://www.w3.org/2000/svg"
  aria-label="Loading"
  role="img"
>
  <circle
    cx={center}
    cy={center}
    r={radius}
    fill="none"
    stroke='#e2e8f0'
    stroke-width={strokeWidth}
  />
  <circle
    class="spinner"
    cx={center}
    cy={center}
    r={radius}
    fill="none"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-dasharray={dashArray}
    stroke-dashoffset="0"
  />
</svg>

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spinner {
    transform-origin: center;
    animation: spin 1s linear infinite;
    stroke: var(--secondary-color);
  }

  svg {

  }
</style>