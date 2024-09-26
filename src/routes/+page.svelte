<script>
    import { base } from '$app/paths';
    import vaworkflow from '$lib/assets/VisualAnalyticsWorkflow.svg';
    import tradeoff from '$lib/assets/frameworkstradeoff.png';
    import schemes from '$lib/assets/frameworksschemes.png';
</script>

<h1>Implementing data visualizations using Svelte</h1>

<div class=intermezzo>
  <h2>Disclaimer</h2>
  <p>
    This course is adapted from the course material of Prof. Dr. Jan Aerts at the KU Leuven. <br/>
    The original material can be found at <a href="http://vda-lab.gitlab.io/datavis-technologies">http://vda-lab.gitlab.io/datavis-technologies</a>.
  </p>
</div>
<h2>History of Programming Visualization</h2>
<p>
  Back in the 1990s, java was the programming language of choice if you wanted something visual 
  and interactive on your screen. 
  Over the years, this has shifted towards standard web technologies HTML, CSS and javascript.
</p>

<p>
  The scientific field of Data Visualization (and later Visual Analytics) did not follow this trend completely.
  Most people try to stick to the language they are already invested in; and in this case, that is not necessarily a bad thing.
  If you need to visualize data, you probably work with data a lot already. So you know that you need <i>clean</i> and <i>well-formatted</i> data,
  or even a data-model. So you visualize your data in the language that offers you the most libraries, modules, functions and amenities.
</p>

<figure>
  <img src={vaworkflow} width=50% alt=""/>
  <figcaption>Source: D. A. Keim, J. Kohlhammer, G. P. Ellis, F. Mansmann: 
    <i>Mastering The Information Age - Solving Problems with Visual Analytics</i>. Eurographics, 2010.</figcaption>
</figure>

<p>
  We will start with a short overview and discuss the options in more detail below.
</p>

<ul>
  <li>R offers a plethora of means for statistical analysis and is therefore well-suited for a focus on statistics or engineering.</li>
  <li>Python was and still is the most polular data processing language of the last decade, mainly for its versatility. 
    It offers established packages for table and image data, as well as the most advanced machine learning to-date.</li>
  <li>Javascript is most popular in web development and therefore works directly on the visualization and offers the easiest sharing.</li>
  <li>Commercial software solutions like Tableau and PowerBI provide solutions in cases where the visualization is not too complex or needs to be available fast.</li>
</ul>

<p>
  The focus of this course is on Visual Analytics; in other words <i>visual interactive data analysis</i>. 
  Hence, the goal is to provide you with the programming means of loading and handling <i>data</i>, forming an <i>analysis</i> model, 
  creating the <i>visuals</i> you imagined, and include suitable <i>interaction</i> techniques. 
  As such, we will not compare all options for Data Visualization in general as listed above, but focus on workflows that can create Visual Analytics Dashboards.
</p>

<h2>Visualization Programming Approaches</h2>

<p>
  text
</p>

<img src={tradeoff} alt="" width=70%/>

<p>
  text
</p>

<img src={schemes} alt="" width=100%/>

<p>
  text
</p>