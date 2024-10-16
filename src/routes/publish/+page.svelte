<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import github from "$lib/assets/github.png";
</script>

<h1>Share your Svelte App</h1>
<p>
  Visualization is meant to be viewed by many; we should share it! One of the main benefit of writing our visualization for the web, is that
  sharing is easy and accessible for anyone. How to do that?
</p>
<p>
  There are multiple options to publish and share your website. Each has their own benefits and downsides, but these are the currently suitable options:
</p>
<ul>
  <li>Integrated hosting, e.g. <a href=https://pages.github.com/ target=_blank>GitHub Pages</a></li>
  <li>Explicit hosting, e.g. <a href=https://vercel.com/home target=_blank>Vercel</a></li>
  <li>Custom hosting, e.g. your own server</li>
</ul>

<p>
  We suggest to use GitHub Pages for this project, as it requires the least effort and suffices for our use case. 
  You are free to use any other service, if you feel more comfortable that way.
</p>

<h2>GitHub</h2>
<p>
  To share our project with GitHub Pages, it first needs to be on GitHub. We need a version control too anyways, so let's use GitHub for it.
</p>
<p>
  GitHub and VSCode are well integrated, hence we can create a pleasant workflow. You already created a local project that you opened in VSCode.
  Go to version control and click <i>Publish to GitHub</i>.
</p>
<img src={github} alt="" style="max-width: 500px"/>
<p>
  Follow the steps and you are good to go.
</p>

<h2>Github Pages</h2>

TODO