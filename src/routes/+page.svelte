<script>
    import vaworkflow from '$lib/assets/VisualAnalyticsWorkflow.svg';
    import tradeoff from '$lib/assets/frameworkstradeoff.png';
    import schemes from '$lib/assets/frameworkschemes.png';
</script>

<h1>Implementing data visualizations using Svelte</h1>
<p>
  A tutorial for the <i>Visual Information Analysis Lab</i> at RPTU Kaiserslautern-Landau
</p>
<p style='color:#7d7d7d; text-align:end;'>
  <span><i>Jan-Tobias Sohns</i></span><br/>
  <span style='display:inline-flex;align-items:center;'>
    <svg width=25 height=25 viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
    <i>sohns@rptu.de</i>
  </span>
</p>
<div class=intermezzo>
  <h2>Disclaimer</h2>
  <p>
    The course is adapted from the <a href="http://vda-lab.gitlab.io/datavis-technologies" target="_blank">excellent course</a> of Prof. Dr. Jan Aerts at the KU Leuven. <br/>
    The material is available under a CC-BY-NC license. It can be copied/remixed/tweaked/…​, but the original author needs to be credited. 
    It can also not be used for commercial purposes except by the original author.
  </p>
</div>
<h2>History of Programming Visualizations</h2>
<p>
  Back in the 1990s, java was the programming language of choice if you wanted something visual 
  and interactive on your screen. 
  Over the years, this has shifted towards standard web technologies such as HTML, CSS and JavaScript.
</p>

<p>
  The scientific field of Data Visualization (and later Visual Analytics) did not follow this trend completely.
  Most people stuck to the language they were already invested in; and in this case, that was not necessarily a bad thing.
  If you need to visualize data, you probably work with a lot of data. Thus, you know that you need <i>clean</i> and <i>well-formatted</i> data,
  or even a data-model. Therefore, you want to visualize your data in the language that offers you the most libraries, modules, functions and amenities.
</p>

<img src={vaworkflow} alt="" style="max-width: 650px"/>
<p>
  Source: D. A. Keim, J. Kohlhammer, G. P. Ellis, F. Mansmann: 
  <i>Mastering The Information Age - Solving Problems with Visual Analytics</i>. Eurographics, 2010.
</p>

<h2>Visualization depending on the field</h2>
<p>
  Data visualization is essential for various fields that rely on transforming complex information into clear, actionable insights. 
  The choice of programming tools and platforms depends largely on the specific needs of each domain. 
  Different industries rely on specialized languages and software, whether for mathematics, data science and AI, sharing insight, or large-scale business intelligence. 
  Each toolset is tailored to best meet the demands of its respective field, ensuring effective communication and understanding of data.
</p>

<ul>
  <li><b>R</b> offers a plethora of means for statistical analysis and is therefore well-suited for a focus on statistics or engineering.</li>
  <li><b>Python</b> was, and still is, the most polular data processing language of the last decade, mainly for its coding speed and versatility. 
    It offers established packages for table and image data, as well as the most advanced machine learning to-date.</li>
  <li><b>JavaScript</b> is most popular in web development and therefore works directly on the visualization and offers the easiest sharing.</li>
  <li><b>Commercial software</b> solutions like Tableau and PowerBI provide solutions in cases where the visualization is not too complex or needs to be available fast.</li>
</ul>

<p>
  The focus of this course is on visual analytics; in other words <i>visual interactive data analysis</i>. 
  Hence, the goal is to provide you with the programming means of loading and handling <i>data</i>, forming an <i>analysis</i> model, 
  creating the <i>visuals</i> you imagined, and include suitable <i>interaction</i> techniques. 
  As such, we will not compare all options for data visualization in general as listed above, 
  but focus on workflows that create visual analytics dashboards, i.e. the latter three.
</p>

<h2>Visualization Programming Approaches</h2>

<p>
  When programming visualizations, there's often a tradeoff between speed and customization. 
  High-level tools and libraries, like Tableau or Power BI, offer rapid development with pre-built templates and drag-and-drop features, 
  but they can limit the depth of customization. On the other hand, coding visualizations from scratch in languages 
  like Python or JavaScript offers far more flexibility and control over the final product, but it requires more time and expertise. 
  Choosing between speed and customization depends on the project’s complexity and the need for tailored visual representation.
</p>

<img src={tradeoff} alt="" style="max-width: 750px"/>

<p>
  We chose sensible representatives for the four categories along this spectrum. 
</p>

<ul>
  <li>
    PowerBI and Tableau as full <b>software solutions</b>. They have the fastest prototyping and the most quality-of-life functions, 
    but the ready-made components can be limiting regarding your own designs. The trade-off can be worthwhile when the focus 
    is on simple visualizations and time is of essence.
  </li>
  <li>
    Bokeh and Ploty as <b>Python libraries</b> that then compile to JavaScript code. They have most basic charts that you can fully write in Python, 
    inbuild interaction and linking. This works great for learning visualization design initially, as in our previous courses, or 
    when you are already working in Python (looking at you ML engineers). However, customization is limited by the translation step to JavaScript and 
    sharing is inconvenient, as a background Python server handles all data queries.
  </li>
  <li>
    Observable Framework as a representative of <b>JavaScript visualization frameworks/libraries</b>. They tend to have a more charts than Python 
    libraries and limitations mainly arise from your own expertise at customizing the existing codebase. 
    Most of these ecosystems rely on the established visualization library <a href=https://d3js.org>D3</a>, which, while powerful, has a steep learning curve.
    We picked observable as it has the benefit of a (static) Python data loader that eases the integration into existing Python processes.
  </li>
  <li>
    Svelte as a representative of <b>writing HTML & JavaScript from scratch</b>. Writing JavaScript yourself gives complete control over 
    all parts of the visualization: when and how data should be loaded, when and where algorithms should run, how each detail of your plot looks and interacts.
    We picked Svelte as it has a relatively understandable syntax compared to more established libraries like <a href=https://react.dev>React</a> 
    and therefore should provide an easier entry to web development. While you <i>can</i> control every detail that does not necessarily mean you <i>have to</i>.
    There are places where it is totally sensible to use existing libraries to speed up programming (e.g. <a href=https://d3js.org>D3</a>).
  </li>
</ul>

<img src={schemes} alt=""/>

<p>
  The architecture of each option is sketched above.
</p>

<p>
  For this course, we chose to use Svelte and a range of helper libraries, due to the best trade-off between 
  medium learning curve, fine-grained control, direct programming paradigm and ease of sharing. Before we go into the details 
  of Svelte, we start with an introduction into general and graphic web programming. Feel free to skip that part (or any part), 
  if you feel like you already have sufficient experience.
</p>