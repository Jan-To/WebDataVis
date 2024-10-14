<script>
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
    import css from "svelte-highlight/languages/css";
    import json from "svelte-highlight/languages/json";
    import javascript from "svelte-highlight/languages/javascript";
    import ExStyling from "./ExStyling.svelte";
    import ExHead from "./ExHead.svelte";
</script>

<h1>HTML, CSS and Javascript</h1>

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
        <img src="http://vda-lab.github.io/assets/stad_airquality.png" width=200 />
        <a href="http://vda-lab.github.io">Link to VDA-lab website</a>
    </body>
</html>'/>

<h3>Create your first page</h3>
<p>
    If you want to experiment, create a file called with an <code>html</code> extension 
    with the contents shown above 
    (e.g. using vscode), and open it in any webbrowser. 
</p>

<h2>The Document Object Model (DOM)</h2>
<p>
    To give some structure to HTML we use <i>tags</i> to indicate <i>elements</i>. 
    The collection of all these 
    (nested) elements is called the Document Object Model or <i>DOM</i>.
    Tags exist to denote headers, lists, paragraphs, etc.
    Most tags need to be <i>opened</i> and then <i>closed</i>. For example:
</p>

<Highlight language={xml} code=
'<h1> ... </h1>
<p> ... </p>
'/>

<p>
    There are some exceptions, such as when you create a horizontal line <code>&lt;hr/&gt;</code> 
    or want to add a linebreak <code>&lt;br/&gt;</code> .
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
    You can find a complete list of HTML elements at <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element'>https://developer.mozilla.org/en-US/docs/Web/HTML/Element</a>.
</p>

<h3>Attributes</h3>
<p>
    Tags can have attributes, for example:
</p>
<div class=code-half>
    <Highlight language={xml} code=
'<a href="www.google.com">Click Here</a> defines the destination of a link.
<p style="color: blue"> sets the colour of that paragraph to blue </p> '/>
</div>
<div class='view-half'>
    <a href="www.google.com">Click Here</a> defines the destination of a link.
    <p style="color: blue"> sets the colour of that paragraph to blue </p>
</div>

<h3><code>id</code> and <code>class</code></h3> 
<p>
    We will use the special attributes <code>id</code> and <code>class</code> a lot later in this session.

    The <code>id</code> attribute gives an element a certain id (obviously), 
    and that id needs to be unique within the document.

    The <code>class</code> attribute assigns that element to a certain class. 
    We can use this to easily select different elements together. 
    See for example the <code>unimportant</code> class that we add to 
    two of the shopping list items below. 
    A single HTML element can have multiple classes. 
    We can do this by adding them in all separate with a space. 
    For example: <code>&lt;li class="datapoint selected"&gt;</code>.
</p>

<div class=code-half>
    <Highlight language={xml} code=
'<p>Shopping list:</p>
<ul>
<li class="unimportant">Eggs</li>
<li class="unimportant">Milk</li>
<li>Toothpaste</li>
</ul>'/>
</div>
<div class='view-half'>
    <p>Shopping list:</p>
    <ul>
        <li class="unimportant">Eggs</li>
        <li class="unimportant">Milk</li>
        <li>Toothpaste</li>
    </ul>
</div>


<h3>Some other examples</h3> 
<p>
    A button that does nothing, and a generic <code>div</code> element. 
    But note that the generic <code>div</code> has an <code>id</code>.
</p>
<div class=code-half>
    <Highlight language={xml} code=
'<button type="submit">Submit</button>
<div id="my_new_div">... and a generic HTML block with an id</div>'/>
</div>
<div class=view-half>
    <button type="submit">Submit</button>
    <div id="my_new_div">... and a generic HTML block with an id</div>
</div>

<h2>Styling elements using CSS</h2> 
<p>
    A typical website will not only contain HTML, but also CSS 
    (cascading style sheets) and javascript.

    HTML:: provides the basic structure of the page, which can be enhanced using CSS and javascript
    CSS:: is used to control presentation, formatting and layout: what it _looks_ like.
    javascript:: is used to control the _behaviour_ of different elements and the page as a whole.

    There are different ways to add CSS to your webpage.
</p>

<h3>Inline CSS</h3>
<p>
    We can add CSS directives using the `style` attribute on HTML elements. For example:
</p>

<div class=code-half>
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
            Link to the VDA-lab website is 
            <a style="font-weight: bold;" href="http://vda-lab.github.io">here</a>.
        </p>
        <button type="submit">Submit</button>
        <div id="my_new_div">... and a generic HTML block with an id</div>
    </body>
</html>'/>
</div>
<div class=view-half>
    <h1 style="color: red;">HTML & CSS</h1>
        <p style="font-family: cursive;">Shopping list:</p>
        <ul>
            <li style="color: blue;">Eggs</li>
            <li style="color: blue; opacity: 0.5;">Milk</li>
            <li style="color: blue;">Toothpaste</li>
        </ul>
        <p>
            Link to the VDA-lab website is 
            <a style="font-weight: bold;" href="http://vda-lab.github.io">here</a>.
        </p>
        <button type="submit">Submit</button>
        <div id="my_new_div">... and a generic HTML block with an id</div>
</div>

<h3>CSS in the <code>head</code></h3>
<p>
    When we use CSS inline as above, we can set the style for individual elements. 
    But if we want to make all headers bold, we'd need to add <code>font-weight: bold</code> 
    to _every_ single <code>&lt;h1&gt;</code>. To set the style for whole groups of elements, 
    we better define that once instead of for each element. 
    We can do this in the <code>&lt;head&gt;</code> using the <code>&lt;style&gt;</code> element. 
    In the example below, we make all headers of level 1 green, 
    each list item should be blue, and links should be bold.
</p>

<div class=code-half>
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
        <p>We have some text here with a <a href="www.google.com">
            link</a> to Google, and a list:</p>
        <ul>
            <li>Eggs</li>
            <li style="opacity: 0.5;">Milk</li>
            <li>Toothpaste</li>
        </ul>
    </body>
</html>`}'/>
</div>
<div class=view-half>
    <ExHead/>
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
        To select all elements of a certain _type_ 
        (e.g. <code>&lt;h1&gt;</code> or <code>&lt;p&gt;</code>), 
        use the name of that element.
    </li>
    <li>
        To select all elements with a certain _class_ 
        (e.g. <code>&lt;li class="important"&gt;</code>), 
        prepend that class with a period <code>.</code>.
    </li>
    <li>
        To select the element with a given _id_ 
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
    an _ordered_ list (<code>&lt;ol&gt;</code>) will _not_ be blue. We can also use _pseudo-classes_, 
    like <code>:hover</code> (which matches the element your mouse is hovering on), or 
    <code>::first-letter</code> (which speaks for itself).
    For the full reference, see 
    <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors'>
    https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors</a>.
</p>

<div class=code-half>
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
        <p>Link to the VDA-lab website is <a href="http://vda-lab.github.io">here</a>.</p>
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
</div>
<div class=view-half>
    <ExStyling/>
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

<h2>Adding behaviour using javascript</h2> 
<p>We can use javascript to add additional functionality to a site.</p>


<h3>Inline javascript</h3>
<p>
    We can add the javascript within the `body` between `script` tags. 
    If we want to reference existing elements (such as the `demo` element 
    in our example below, we have to put the `script` at the _end_ of the `body`. 
    In this example below, a counter is updated every time we push the button.
</p>

<div class=code-half>
    <Highlight language={xml} code=
{`<p>We can use javascript to add additional functionality to a site.</p>
<button onclick="handleClick()">Increment the counter</button>

<p id="demo"></p>

<script>
    let count = 0;
    function handleClick() {
        count += 1
        document.getElementById("demo").innerHTML = 
            "You clicked the button " + count + " times."
    }
</script>`}/>
</div>
<div class=view-half>
    <p>We can use javascript to add additional functionality to a site.</p>
    <button onclick="handleClick()">Increment the counter</button>
    <p id="demo"></p>
    <script>
        let count = 0;
        function handleClick() {
            count += 1
            document.getElementById("demo").innerHTML = 
            "You clicked the button " + count + " times."
        }
    </script>
</div>

<p>Let's walk through this code:</p>

<ul>
    <li>
        In line 2, we create a <code>button</code> to which we attach an action 
        whenever we click (<code>onclick</code>) on it. The action is called <code>handleClick</code> 
        (but this might be any name that we give it).
    </li>
    <li>Lines 6 to 13 define the javascript</li>
    <li>
        The actual function is defined in lines 8 to 12. Whenever we click the button, 
        these lines are executed.
    </li>
    <li>First we increment the counter with 1.</li>
    <li>
        Then we find the element with <code>id</code> of <code>demo</code> 
        (<code>document.getElementById("demo")</code>) 
        and set its contents (<code>innerHTML</code>) to the text "You clicked..."
    </li>
</ul>
<p>The <code>document.getElementById()</code> might be overwhelming, but we will find 
    easier ways to do this later.
</p>

<div class=intermezzo>
    <h2>Intermezzo - The JSON format</h2>
    <p>
        From the next section onwards we will work with variables and data. 
        At this point it is important to describe the JSON data format.
        The JSON ("JavaScript Object Notation") data representation format 
        follows the same principle as XML, in that it describes the data in the object itself. 
        This format is used in many Application Programming Interfaces (APIs) such as 
        https://dummyjson.com/products, as well as the internal representation of complex data 
        in javascript code. An example JSON object containing information about the BRCA2 gene, 
        involved in breast cancer:
    </p>
<Highlight language={json} code=
{`{ id: 12345,
  common_name: "BRCA2",
  names: ["BRCA2", "ENST00000544455.6", "FACD", "FANCD1"],
  description: "Breast cancer type 2 susceptibility protein",
  location : {
    genome_build: "hg38",
    chromosome: "13",
    start: 32315086,
    end: 32400268,
    strand: "+"
  },
  diseases: [{
    name: "breast cancer",
    description: "Defects in BRCA2 are a cause of susceptibility to breast cancer (BC)"
  }, {
    name: "BROVCA2",
    description: "Defects in BRCA2 are involved in familial breast-ovarian cancer type 2"
  }, {
    name: "FANCD1",
    description: "Defects in BRCA2 are the cause of Fanconi anemia complementation group D type 1"
  }]
}`}/>

<p>
    Data in JSON format (or javascript objects) are presented in key/value pairs. 
    To be completely JSON-compliant the key should be put in quotes, although those 
    are often omitted for brevity (as in the example above). Different key/value pairs 
    are separated by a comma. JSON values can be of different types. They can be:
</p>
<ul>
    <li><b>Scalars</b>: strings (in quotes; see e.g. <code>common_name</code> above), numbers 
        (without quotes; see e.g. <code>start</code>), booleans 
        (<code>true</code>/<code>false</code>), or <code>null</code>.</li>
    <li><b>Strings</b> containing zero or more elements, surrounded by square brackets (<code>[]</code>). 
        For example, see <code>names</code> in the example above.</li>
    <li>Other <b>objects</b>, surrounded by curley brackets <code>{`{}`}</code> (see e.g. <code>location</code>).</li>
</ul>

<p>
    The values of arrays and objects can again be scalars, arrays or other objects. 
    For example, the value for the <code>diseases</code> key is an array of objects.
    The top-level element in a JSON-formatted file can be of any of the above types. 
    In the example, this is an object.
</p>
</div>

<h1>Javascript basics</h1>
<h2>Variables</h2>
<p>
    Variables in javascript are defined using the <code>var</code>, <code>let</code>, 
    or <code>const</code> commands. 
    For all purposes, <code>var</code> and <code>let</code> are exactly the same. 
    There are slight differences in their scopes, 
    but <code>let</code> was created because <code>var</code> 's scope was an important source 
    for bugs in javascript. Ergo: use <code>let</code>. 
    <i>Declaring</i> and <i>assigning</i> variables are two different things: a variable 
    <i>declaration</i> means that you create the variable and give it a name;
    with variable <i>assignment</i> you give it an actual value. 
    For example:
</p>
<Highlight language={javascript} code=
{`var first_variable;           // declaration of first_variable
first_variable = "a";         // assignment of value to first_variable
let second_variable;          // declaration of second_variable
second_variable = "b";        // assignment of value to second_variable
let third_variable = "c";     // declaration and assignment done in one go
console.log(third_variable);  // value of third_value is printed to the console
third_variable = "d";         // third_variable gets a new value
console.log(third_variable);  // value of third_value is printed to the console
`}/>
<p>
    In contrast to <code>var</code> and <code>let</code>, 
    a variable that is declared using <code>const</code> can <i>not</i> be assigned a new value.
    Everything on a line after a double forward slash (<code>//</code>) 
    in javascript is seen as a comment and not parsed. <br>
    NOTE: We'll see later that in Svelte, you can also declare variables using 
    <code>$:</code> instead of <code>let</code> or <code>const</code>, 
    which makes the variable reactive to changes of its definition's values. More on that later.
</p>

<h2>Functions</h2>
<g>
    There are several ways of creating functions in javascript. 
    Below, we show three statements that do the same thing: 
    take 2 arguments, add them, return the result.
</g>
<Highlight language={javascript} code=
{`// First version
function function_1(a,b) { return a + b }

// Second version
let function_2 = function(a,b) { return a + b }

// Third version
let function_3 = (a,b) => { return a + b }

console.log(function_1(1,2))
console.log(function_2(1,2))
console.log(function_3(1,2))`}/>

<p>
    For the second and third version, 
    it might sometimes be useful to use <code>const</code> 
    (or <code>$:</code>) depending on the use case. 
    The difference between the first version on the one hand, 
    and the second and third on the other is not relevant in the cases that we will use them.
</p>

<h2>Exercises</h2>
<p>Here are some exercises related to this chapter:</p>
<ul>
    <li>Headers: <a href='https://svelte.dev/repl/1d295420874d42818954da8fcb50ad7d?version=3.59.1'>
        https://svelte.dev/repl/1d295420874d42818954da8fcb50ad7d?version=3.59.1</a></li>
    <li>Lists: <a href='https://svelte.dev/repl/d4a024f5e6794abfa2ccc213d41c7e18?version=3.59.1'>
        https://svelte.dev/repl/d4a024f5e6794abfa2ccc213d41c7e18?version=3.59.1</a></li>
    <li>Text tags: <a href='https://svelte.dev/repl/f1a9ed0ed9444c12a1684a00166619e3?version=3.59.1'>
        https://svelte.dev/repl/f1a9ed0ed9444c12a1684a00166619e3?version=3.59.1</a></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
* Styles (inline): https://svelte.dev/repl/e1f0c316e39c45cb97fbf1fe18126e4c?version=3.59.1
* CSS classes: https://svelte.dev/repl/987e9e43eab74967912e83b302401291?version=3.59.1
* Printing: https://svelte.dev/repl/f7fe97bc39ba4ecf8b9077bf5e497450?version=3.59.1
* Variables: https://svelte.dev/repl/5b50bf2c9bea4811ad62ef82ca38f18e?version=3.59.1
* Arrays: https://svelte.dev/repl/b7f4e0f2a9034b16972f82f86df39ee1?version=3.59.1
* Objects: https://svelte.dev/repl/f5fe639471b04e588048059076e25ad7?version=3.59.1
* Functions: https://svelte.dev/repl/b1e70f4349cc4a4ca8169f808794a099?version=3.59.1
* Scope: https://svelte.dev/repl/7c44e0ca379c4e869aa37d6dceb1429d?version=3.59.1
* Importing: https://svelte.dev/repl/424ccb07f0bf4a23a82ea4789f8ca25d?version=3.59.1