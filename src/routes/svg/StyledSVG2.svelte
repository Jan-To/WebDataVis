<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
</script>

<div class=code-half>
  <Highlight language={xml} code=
{`<html>
<head>
    <style>
        svg {
            border: 1px;
            border-style: solid;
        }
        circle {
            fill: steelblue;
        }
    </style>
</head>
<body>
    <svg width="200" height="200">
        <circle cx="20" cy="100" r="10"/>
        <circle cx="60" cy="140" r="10"/>
        <circle cx="80" cy="20" r="10"/>
        <circle cx="160" cy="40" r="10"/>
        <circle cx="180" cy="160" r="10"/>
    </svg>
</body>
</html>
`}/>
</div>
<div class=view-half>
  <svg width="200" height="200">
    <circle class="figtwo" cx="20" cy="100" r="10"/>
    <circle class="figtwo" cx="60" cy="140" r="10"/>
    <circle class="figtwo" cx="80" cy="20" r="10"/>
    <circle class="figtwo" cx="160" cy="40" r="10"/>
    <circle class="figtwo" cx="180" cy="160" r="10"/>
  </svg>
</div>


<style>
  svg {
      border: 1px;
      border-style: solid;
  }
  .figtwo {
      fill: steelblue;
  }
</style>