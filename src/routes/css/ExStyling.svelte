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
    <li><b>element</b>: e.g. <kbd>h1 {`{color: red}`}</kbd></li>
    <li><b>class</b>: e.g. <kbd>.unimportant {`{opacity: 0.5}`}</kbd>)
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