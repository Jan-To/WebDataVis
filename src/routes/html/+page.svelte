<script>
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
</script>

<h1>The HTML Format</h1>

<h2>General HTML file structure</h2>
<p>
    Any website you visit basically consists of the same components. 
    The whole page is contained within a <code>html</code> section, 
    which will contain a <code>body</code>, and possibly a <code>head</code> and <code>script</code>. Below is a minimal html page.
</p>

<Highlight language={xml} code=
'<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        The actual content is here...
    </body>
</html>
'/>

<p>Here is a page containing some actual content:</p>

<Highlight language={xml} code=
'<!DOCTYPE html>
<html>
    <head>
        <title>My webpage</title>
    </head>
    <body>
        <h1>Introduction to HTML</h1>
        <h2>Simple structure</h2>
        <p>Most webpages have a simple structure; see this course...</p>

        <h2>Images and external links</h2>
        <p>These pages can contain images and links, for example:</p>
        <img src="https://vis.cs.rptu.de/assets/img/VIA-Logo.svg" width=200 />
        <a href="https://vis.cs.rptu.de/">Link to Vis-Team website</a>
    </body>
</html>'/>

<h3>Create your first page</h3>
<p>
    If you want to experiment, create a file with an <code>html</code> extension 
    with the contents shown above, and open it in any webbrowser. 
</p>

<h2>The Document Object Model (DOM)</h2>
<p>
    To give some structure to HTML we use <i>tags</i> to indicate <i>elements</i>. 
    The collection of all these 
    (nested) elements is called the Document Object Model or <i>DOM</i>.
    Tags exist to denote headers, lists, paragraphs, etc.
    Tags need to be <i>opened</i> and then <i>closed</i>. For example:
</p>

<Highlight language={xml} code=
'<h1> ... </h1>
<p> ... </p>
'/>

<p>
    Here's a list of the most relevant attributes:
</p>

<Highlight language={xml} code=
'<h1>, <h2> ...: heading of level 1, 2, ...
<ul>: unordered list
<ol>: ordered list
<li>: list item within unordered or ordered list
<p>: paragraph
<g>: group other elements
<div>: a generic container
<svg>: an svg
...'/>
<p>
    You can find a complete list of HTML elements
    <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element' target="_blank">here</a>.
    Note that there are not only static elements like <code>{`<h1>`}</code>, 
    but also interactive ones like <code>{`<button>`}</code> or <code>{`<select>`}</code>.
</p>

<h3>Attributes</h3>
<p>
    Tags can have attributes, for example:
</p>
<div class=code-flex>
    <Highlight language={xml} code=
'<a href="https://www.google.com/">Click Here</a> defines the destination of a link.
<p style="color: blue"> sets the colour of that paragraph to blue </p> '/>
    <div class='view-half'>
        <a href="https://www.google.com/">Click Here</a> defines the destination of a link.
        <p style="color: blue"> sets the colour of that paragraph to blue </p>
    </div>
</div>

<h3><code>id</code> and <code>class</code></h3> 
<p>
    We will use the special attributes <code>id</code> and <code>class</code> a lot later in this session.
</p>
<p>
    The <code>id</code> attribute gives an element a certain id (obviously), 
    and that id needs to be unique within the document. We can use this to address a specific element.
</p>
<p>
    The <code>class</code> attribute assigns that element to a certain class. 
    We can use this to easily select different elements together. 
    See for example the <code>unimportant</code> class that we add to 
    two of the shopping list items below. 
    A single HTML element can have multiple classes. 
    We can do this by adding them in all separate with a space. 
    For example: <code>&lt;li class="datapoint selected"&gt;</code>.
</p>

<div class=code-flex>
    <Highlight language={xml} code=
'<p>Shopping list:</p>
<ul>
<li class="unimportant">Eggs</li>
<li class="unimportant">Milk</li>
<li>Toothpaste</li>
</ul>'/>
<div class='view-half'>
    <p>Shopping list:</p>
    <ul>
        <li class="unimportant">Eggs</li>
        <li class="unimportant">Milk</li>
        <li>Toothpaste</li>
    </ul>
</div>
</div>

<h3>Some other examples</h3> 
<p>
    A button that does nothing, and a generic <code>div</code> element. 
    But note that the generic <code>div</code> has an <code>id</code>.
</p>
<div class=code-flex>
    <Highlight language={xml} code=
'<button type="submit">Submit</button>
<div id="my_new_div">... and a generic HTML block with an id</div>'/>
<div class=view-half>
    <button type="submit">Submit</button>
    <div id="my_new_div">... and a generic HTML block with an id</div>
</div>
</div>