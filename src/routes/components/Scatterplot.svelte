<script>
  /**
   * @typedef {Object} Props
   * @property {any} [datapoints]
   * @property {string} [long]
   * @property {string} [lat]
   */

  /** @type {Props} */
  let { datapoints = [], long = 'from_long', lat = 'from_lat' } = $props();

  const rescale = function(x, domain_min, domain_max, range_min, range_max) {
    return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
  }
</script>

<style>
  circle {
    opacity: 0.5;
    fill: blue;
  }
  circle.international {
    fill: red;
  }
 </style>
<svg width=800 height=400>
  {#each datapoints as datapoint}
    <circle cx={rescale(datapoint[long], -180, 180, 0, 800)}
            cy={rescale(datapoint[lat], -90, 90, 400, 0)}
            r={rescale(datapoint.distance, 1, 15406, 2,10)}
            class:international="{datapoint.from_country != datapoint.to_country}" />
  {/each}
</svg>