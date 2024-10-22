<script>
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import css from "svelte-highlight/languages/css";
  import ExStyling from "./ExStyling.svelte";
  import ExHead from "./ExHead.svelte";
</script>


<h1>Styling elements using CSS</h1> 
<p>
    A typical website will not only contain HTML, but also CSS 
    (cascading style sheets) and javascript.
</p>

<ul>
    <li><b>HTML</b> provides the basic <i>structure</i> of the page, which can be enhanced using CSS and javascript</li>
    <li><b>CSS</b> is used to control presentation, formatting and layout: what it <i>looks</i> like.</li>
    <li><b>javascript</b> is used to control the <i>behaviour</i> of different elements and the page as a whole.</li>
</ul>

<p>
    There are different ways to add CSS to your webpage.
</p>

<h3>Inline CSS</h3>
<p>
    We can add CSS directives using the <code>style</code> attribute on HTML elements. For example:
</p>

<div class=code-flex>
    <Highlight language={xml} code=
'<html>
    <head>
        <title>My HTML file</title>
    </head>
    <body>
        <h1 style="color: red;">HTML & CSS</h1>
        <p style="font-family: cursive;">Shopping list:</p>
        <ul>
            <li style="color: blue;">Eggs</li>
            <li style="color: blue; opacity: 0.5;">Milk</li>
            <li style="color: blue;">Toothpaste</li>
        </ul>
        <p>
            Link to the Vis-Team website is 
            <a style="font-weight: bold;" href="https://vis.cs.rptu.de/">here</a>.
        </p>
    </body>
</html>'/>
<div class=view-half>
    <h1 style="color: red;">HTML & CSS</h1>
        <p style="font-family: cursive;">Shopping list:</p>
        <ul>
            <li style="color: blue;">Eggs</li>
            <li style="color: blue; opacity: 0.5;">Milk</li>
            <li style="color: blue;">Toothpaste</li>
        </ul>
        <p>
            Link to the Vis-Team website is 
            <a style="font-weight: bold;" href="https://vis.cs.rptu.de/">here</a>.
        </p>
</div>
</div>

<h3>CSS in the <code>head</code></h3>
<p>
    When we use CSS inline as above, we can set the style for individual elements. 
    But if we want to make all headers bold, we'd need to add <code>font-weight: bold</code> 
    to every single <code>&lt;h1&gt;</code>. To set the style for whole groups of elements, 
    we better define that once instead of for each element. 
    We can do this in the <code>&lt;head&gt;</code> using the <code>&lt;style&gt;</code> element. 
    In the example below, we make all headers of level 1 green, 
    each list item should be blue, and links should be bold.
</p>

<p class=intermezzo>
    There is a bug in the <a href=https://svhe.onrender.com/ target=_blank>code highlighting library</a> 
    that adds a <code>*&#123;&#125;</code> in front of <code>{`</code>`}</code> in the code snippets.
    Please this ignore while reading and remember if you copy the code.
</p>

<div class=code-flex>
    <Highlight language={xml} code=
'{`<html>
    <head>
        <title>My HTML file</title>
        <style>
            li { color: blue; }
            h1 { color: green; }
            a { font-weight: bold;}
        </style>
    </head>
    <body>
        <h1>CSS in the head</h1>
        <p>We have some text here with a <a href="https://www.google.com/">
            link</a> to Google, and a list:</p>
        <ul>
            <li>Eggs</li>
            <li style="opacity: 0.5;">Milk</li>
            <li>Toothpaste</li>
        </ul>
    </body>
</html>`}'/>
<div class=view-half>
    <ExHead/>
</div>
</div>

<p>
    As you can see in this example, you can combine CSS in the head with 
    inline CSS in which case the inline CSS takes precedence: 
    the second list item is partly transparent.
</p>

<h3>Using CSS selectors</h3>
<p>
    In the last example, we set the color for every list item to blue, 
    but wanted to have one specific item transparent as well. 
    We did this by combining CSS directives at two different places. 
    A better approach is to separate the HTML and CSS even more, 
    instead of hard-coding this transparency. 
    We can do this using <i>CSS selectors</i>. 
    These are a very powerful way to <i>select</i> different elements. 
    The <code>id</code> and <code>class</code> attributes we mentioned above are crucial.
</p>

<ul>
    <li>
        To select all elements of a certain <i>type</i> 
        (e.g. <code>&lt;h1&gt;</code> or <code>&lt;p&gt;</code>), 
        use the name of that element.
    </li>
    <li>
        To select all elements with a certain <i>class</i>
        (e.g. <code>&lt;li class="important"&gt;</code>), 
        prepend that class with a period <code>.</code>.
    </li>
    <li>
        To select the element with a given <i>id</i>
        (e.g. <code>&lt;p id="paragraph_5"&gt;</code>), 
        prepend that id with a hash #.
    </li>
</ul>

<Highlight language={css} code=
'h1 &#123; color: red; &#125;
a &#123; font-weight: bold; &#125;
p &#123; max-width: 400px; &#125;
.unimportant &#123; opacity: 0.5 &#125;
#paragraph_5 &#123; font-family: cursive; &#125;

ul li &#123; color: blue; &#125;
p:hover &#123;
    background-color: aqua;
&#125;
p::first-letter &#123;
    font-size: larger;
    font-weight: bolder;
&#125;'/>
<p>
    In the above, we
</p>
<ul>
    <li>make all <code>&lt;h1&gt;</code> red</li>
    <li>make all links <code>&lt;a&gt;</code> bold</li>
    <li>set the maximum with of all paragraphs <code>&lt;p&gt;</code> to 400 pixels</li>
    <li>give all elements that have <code>unimportant</code> as a class an opacity of 50%</li>
    <li>set the element with <code>id</code> of <code>paragraph_5</code> in italics</li>
</ul>
<p>
    Those are the most basic selectors. But these can be combined and make much 
    more complex. In the following line, we set the colour of a list item <code>&lt;li&gt;</code>
    to blue, but only if it's preceded by a <code>&lt;ul&gt;</code>. This means that items in 
    an <i>ordered</i> list (<code>&lt;ol&gt;</code>) will <i>not</i> be blue. We can also use <i>pseudo-classes</i>, 
    like <code>:hover</code> (which matches the element your mouse is hovering on), or 
    <code>::first-letter</code> (which speaks for itself).
    For the full reference, see the
    <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors' target="_blank">
    CSS_Selector Docs</a>.
</p>

<div class=code-flex>
    <Highlight language={xml} code=
{`<html>
    <head>
        <title>My HTML file</title>
        <style>
            ul li { color: blue; }
            h1 { color: red; }
            a { font-weight: bold;}
            .unimportant {
                opacity: 0.5
            }
            p {
                max-width: 400px;
            }
            #paragraph_5 { font-family: cursive; }
            p:hover {
                background-color: aqua;
            }
            p::first-letter {
                font-size: larger;
                font-weight: bolder;
            }
        </style>
    </head>
    <body>
        <h1>CSS selectors</h1>
        <p style="font-family: cursive;">Shopping list:</p>
        <ul>
            <li class="unimportant">Eggs</li>
            <li class="unimportant">Milk</li>
            <li>Toothpaste</li>
        </ul>
        <p>Link to the Vis-Team website is <a href="https://vis.cs.rptu.de/">here</a>.</p>
        <p id="paragraph_5">This is a handwritten paragraph.</p>
        <h2>Explanation</h2>
        <p>In CSS (= Cascading Style Sheets) you define the style. There are 3 main ways 
        (there are more) to tell the css which elements should get that style, using 
        <b>CSS selectors</b>:
        </p>
        <ol>
            <li><b>element</b>: e.g. <kbd>h1 {color: red}</kbd></li>
            <li><b>class</b>: e.g. <kbd>.unimportant {opacity: 0.5}</kbd>)
                => prepend with a period <kbd>.</kbd></li>
            <li><b>id</b>: e.g. <kbd>#paragraph_5</kbd> => prepend with a
                hash <kbd>#</kbd>.</li>
            <li><b>*</b>: everything</li>
        </ol>
        You can also use <em>pseudo-classes</em>:
        <ol>
            <li><b>:hover</b>: matches an elements that is being hovered over 
                by the mouse, e.g. <kbd>p:hover</kbd></li>
            <li><b>::first-letter</b>: first letter in an element</li>
            <li>...</li>
        </ol>
    </body>
</html>`}/>
<div class=view-half>
    <ExStyling/>
</div>
</div>

<h3>CSS in a separate file</h3>
<p>
    Instead of adding the complete css inline or in the head of a file, 
    we can also put it in a separate file. We load this file in the head, 
    using <code>{`<link rel="stylesheet" href="my_css_file.css">`}</code>. For example:
</p>
<Highlight language={xml} code=
{`<html>
    <head>
        <title>My HTML file</title>
        <link rel="stylesheet" href="flashy_styles.css">
    </head>
    <body>
        <h1>HTML and CSS</h1>
        <p>Some text here...</p>
    </body>
</html>`}/>

<h3>Developer tools and console</h3>
<p>
    Whatever you write in the <code>.html</code> file, it gets <i>rendered</i> in the browser 
    so you do not see the tags anymore. However, each browser has <i>developer 
    tools</i> that allow you to get to the underlying HTML code. You can activate them here:
</p>
<ul>
    <li>All browsers > Right Click anywhere > Inspect</li>
    <li>Chrome: View > Developer > Developer Tools</li>
    <li>Firefox: Tools > Browser Tools > Web Developer Tools</li>
    <li>Safari: Develop > Show Web Inspector</li>
</ul>
<p>
    You will also see a tab named <i>console</i> in the developer tools. 
    You can add <code>console.log(your_variable)</code>. 
    The value of that variable will then be visible in the console.
</p>