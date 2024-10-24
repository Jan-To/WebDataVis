<script>
  export let size = 40;
  let strokeWidth = size/10;

  $: center = size / 2;
  $: radius = (size - strokeWidth) / 2;
  $: circumference = 2 * Math.PI * radius;
  $: dashArray = `${0.25 * circumference} ${0.75 * circumference}`;
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