<script>
  import Highlight from "svelte-highlight";
  import bash from "svelte-highlight/languages/bash";
  import node from "$lib/assets/nodejs.png";
  import vscode from "$lib/assets/vscode_logo.png";
  import svelte from "$lib/assets/SvelteKit_logo.png";
</script>

<h1>Setup A SvelteKit Application</h1>
<p>
  Although it is extremely useful for quickly checking things, we can't use the <a href=https://svelte.dev/repl/hello-world target="_blank">REPL</a> for <i>real</i> work. 
  Still, you might go back to it regularly to test something out. Instead, we can develop SvelteKit applications (i.c. visualisations) locally, on our own machine. 
  To set up a development environment on your own machine, you will need:
</p>
<ul>
  <li>An environment to run javascript in</li>
  <li>A code editor node that speeds up your coding</li>
  <li>The directory structure for a SvelteKit application</li>
</ul>

<h2 style="display: inline-block">Javascript Environment</h2>
<img src={node} alt="" style="max-width: 100px; display: inline-block; vertical-align: middle; margin-left: 16px;"/>
<p>
  We suggest you use <a href=https://nodejs.org/en target=_blank>nodejs</a>, a javascript runtime. 
  Choose your preferred install option <a href=https://nodejs.org/en/download/prebuilt-installer target=_blank>here</a>.
</p>

<h2 style="display: inline-block">Code Editor</h2>
<img src={vscode} alt="" style="max-width: 100px; display: inline-block; vertical-align: middle; margin-left: 16px;"/>
<p>
  We suggest you use <a href=https://code.visualstudio.com/ target=_blank>Visual Studio Code</a> as a code editor.
  VSCode comes with neat extensions that ease your programming experience in Svelte:
</p>
<ul>
  <li><a href=vscode:extension/svelte.svelte-vscode>Svelte for VS Code</a></li>
  <li><a href=vscode:extension/ardenivanov.svelte-intellisense>Svelte Intellisense</a></li>
</ul>

<h2 style="display: inline-block">SvelteKit</h2>
<img src={svelte} alt="" style="max-width: 250px; display: inline-block; vertical-align: middle; margin-left: 16px;"/>
<p>
  See the <a href=https://kit.svelte.dev target="_blank">SvelteKit website</a> on how to get set up. 
  These are the commands you need:
</p>

<Highlight language={bash} code=
{`npm create svelte@latest my-app
cd my-app
npm install
npm run dev -- --open
`}/>

<p>
  The first step will create a new directory (called <code>{`my-app`}</code>) with your application. It will ask you for some information 
  like if you'd want to have an empty (skeleton) setup, or already have demo code included. The <code>{`npm run install`}</code> installs 
  all dependencies (which are listed in the <code>{`package.json`}</code> file). 
</p>
<p>
  Finally, <code>{`npm run dev`}</code> will start a local webserver so 
  that you can access your application. The output will list which port the application is running on. This will most probably 
  be port 5173, so you should open the website <code>{`http://localhost:5173`}</code>. If you 
  use <code>{`npm run dev -- --open`}</code> it will automatically open that website for you. 
  Using <code>{`npm run dev`}</code> without the <code>{`-- --open`}</code> works as well. You will however need to open the webpage yourself. 
  This is often the better option if you want to restart the server.
</p>

<h3> Directory structure and routing</h3>
<p>To understand how data can be loaded in SvelteKit, we need to understand how routing works. <i>Routing</i> maps a file to a URL and vice versa. 
  The directory structure in SvelteKit is important: each URL points to a subdirectory of <code>{`src/routes`}</code>. For example:
</p>

<ul>
  <li><i>http://localhost:5173</i> points to the <code>{`src/routes/`}</code> directory</li>
  <li><i>http://localhost:5173/about</i> points to the <code>{`src/routes/about/`}</code> directory</li>
  <li><i>http://localhost:5173/contact</i> points to the <code>{`src/routes/contact/`}</code> directory</li>
  <li>...</li>
</ul>

<p>
  Each of these directories should have a <code>{`+page.svelte`}</code> (Notice 
  the <code>{`+`}</code>-sign!) file, which contains the actual content of that page.
</p>

<Highlight language={bash} code=
{`...
|
+- src/
|  +- routes/
|      +- +page.svelte
|      +- about/
|      |   +- +page.svelte
|      +- contact/
|          +- +page.svelte
|
...`}/>

We don't need more fore now. If you already want more information, see <a href=https://kit.svelte.dev/docs/routing target="_blank">https://kit.svelte.dev/docs/routing</a>.

<h3>Installing Libraries</h3>
<p>
  Libraries can be installed with <code>npm i -d library-name</code>. The <code>i</code> stands for <i>install</i> and the <code>-d</code> 
  to also install in the library for your <i>development</i> environment. You can always check your current library setup in the <code>package.json</code> file.
</p>