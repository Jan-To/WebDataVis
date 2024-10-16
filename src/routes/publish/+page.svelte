<script>
  import Highlight from "svelte-highlight";
  import javascript from "svelte-highlight/languages/javascript";
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
  Follow the steps and you are good to go.
</p>
<img src={github} alt="" style="max-width: 500px"/>

<h2>Github Pages</h2>
<p>
  Now you have your project on GitHub, but you want to have it running on a public url. GitHub Pages is an integrated service that serves your websites 
  to <code>your-username.github.io</code>. In four steps your project will be running online.
</p>
<ol>
  <li>
    There is a dropdown under <i>Settings &#8594; Pages &#8594;</i> enables the page.
    For SvelteKit, we can not just <i>Deploy from a branch</i>, but instead, we will use <i>Github Actions</i>. 
    Set the dropdown to <i>GitHub Actions</i>, but do no further settings for now.
  </li>
  <li>
    We want to deploy a <i>static site</i>, so we configure the corresponding 
    <a href=https://kit.svelte.dev/docs/adapter-static#github-pages target=_blank>Svelte adapter</a> to <i>static</i>. 
    Therefore, we change the file <code>svelte.config.js</code> like below. We set our base path for all of our links according to our build path.
    Our local development directory from <code>npm run dev</code> runs on <code>localhost:5173<b>/</b></code>, 
    but GitHub Pages will run on <code>your-username.github.io<b>/your-repository-name/</b></code>. 

<Highlight language={javascript} code=
{`import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : '/your-repository-name'
		}
	}
};

export default config;`}/>
  </li>
  <li>
    We need to define the <i>action</i>. Create the folder structure <code>.github/workflows/</code> in your project directory 
    and put <a href=https://jan-to.github.io/WebDataVis/deploy.yml target=_blank>this file</a> in there. Both files can also be found
    on the <a href=https://kit.svelte.dev/docs/adapter-static#github-pages target=_blank>Svelte Website</a>, 
    but our versions should be better explained.
  </li>
  <li>
    Push your changes to GitHub. You can check your build-action status online in the <i>Actions</i>-Tab. Find the link to your site under 
    <i>Code &#8594; About</i> or under <i>Settings &#8594; Pages</i>.
  </li>
</ol>

<p>
  Whenever you push your code to GitHub, after 1-2 minutes build time, the website will run on your newest version.
</p>