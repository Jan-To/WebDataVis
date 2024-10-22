<script>
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
    import json from "svelte-highlight/languages/json";
    import javascript from "svelte-highlight/languages/javascript";

    let count = 0;
    function handleClick() {count+=1}
</script>

<h2>Adding behaviour using javascript</h2> 
<p>We can use javascript to add additional functionality to a site.</p>


<h3>Inline javascript</h3>
<p>
    We can add the javascript within the <code>body</code> between <code>script</code> tags. 
    If we want to reference existing elements (such as the <code>demo</code> element 
    in our example below, we have to put the <code>script</code> at the end of the <code>body</code>. 
    In this example below, a counter is updated every time we push the button.
</p>

<div class=code-flex>
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
<div class=view-half>
    <p>We can use javascript to add additional functionality to a site.</p>
    <button on:click={handleClick}>Increment the counter</button>
    <p id="demo">
        {#if count > 0}
        You clicked the button {count} times.
        {/if}
    </p>
</div>
</div>

<p>Let's walk through this code:</p>

<ul>
    <li>
        In line 2, we create a <code>button</code> to which we attach an action 
        whenever we click (<code>onclick</code>) on it. The action is called <code>handleClick</code> 
        (but this might be any name that we give it).
    </li>
    <li>The <code>{`<script>`}</code>-tags define the javascript section</li>
    <li>
        The actual function is defined by <code>function handleClick() ...</code>. Whenever we click the button, 
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

<h2>Javascript Variables</h2>
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
    in javascript is seen as a comment and not parsed.
</p>
<p class=intermezzo>
    We'll see later that in Svelte, you can also declare variables using 
    <code>$:</code> instead of <code>let</code> or <code>const</code>, 
    which makes the variable reactive to changes of its definition's values. More on that later.
</p>

<h2>Javascript Functions</h2>
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