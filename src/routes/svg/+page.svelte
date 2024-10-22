<script>
  import canvas_vs_svg from '$lib/assets/canvas_vs_svg.jpg';
  import bezier_quad from '$lib/assets/Bézier_quad_anim.gif';
  import bezier_cub from '$lib/assets/Bézier_cub_anim.gif';
  import arc_flags from '$lib/assets/svg_arc_flags.png';
  import viewbox0 from '$lib/assets/viewBox0.png';
  import viewbox1 from '$lib/assets/viewBox1.png';
  import Paths from './Paths.svelte';
  import PathsM from './PathsM.svelte';
  import PathsZ from './PathsZ.svelte';
  import PolyLines from './PolyLines.svelte';
  import PolyLines2 from './PolyLines2.svelte';
  import PolyLines3 from './PolyLines3.svelte';
  import Polygon from './Polygon.svelte';
  import SimpleSvg from "./SimpleSVG.svelte";
  import StyledSvg1 from "./StyledSVG1.svelte";
  import StyledSvg2 from "./StyledSVG2.svelte";
  import FormsSvg from "./formsSVG.svelte";
  import BezierQuad from './BezierQuad.svelte';
  import BezierCub from './BezierCub.svelte';
  import Arcs from './Arcs.svelte';
  import Arcs2 from './Arcs2.svelte';
  import Groups0 from './Groups0.svelte';
  import Translate from './Translate.svelte';
  import Scale from './Scale.svelte';
</script>

<h1>Basic data visualisation</h1>

<h2>Scalable vector graphics</h2>

<p>
  Knowing how HTML, CSS and javascript work, we can start making our visualisations. 
  There are two main approaches for making visualisations in a webbrowser. 
  You can either tell the computer which pixels need to have which colour (<i>pixel-based</i>), 
  or you can tell it at a higher level that you want a circle at a certain position on the screen (<i>vector-based</i>). 
  Although the pixel-based approach gives more flexibility and control, 
  it can be much harder to create these visuals and interact with them. 
  In addition, vector-based visuals are <i>scalable</i>. 
  The image below shows the difference between vector- and pixel-based circle after zooming:
</p>

<img src={canvas_vs_svg} alt="" style="max-width: 650px"/>

<p>
  We will be using SVG (scalable vector graphics) for this tutorial. 
  A plot is a collection of <code>{`<circle>`}</code>, <code>{`<rect>`}</code>, 
  etc elements that are contained within a single <code>{`<svg>`}</code> element. 
  They are basically like any other HTML element. Here is a simple plot of 300x300 pixels, 
  containing a circle and a rectangle.
</p>

<SimpleSvg/>

<p class=intermezzo>
  The <b>origin</b> <code>(0,0)</code> of an SVG image is at the <b>top left</b>, not the bottom left. 
  This means that higher values for <code>y</code> will give you marks that are lower in the graphic, 
  as you can see with the circle and the rectangle below. When plotting actual data, 
  make sure that you flip that orientation.
</p>
<p>
  As these are regular HTML elements, we can style them using CSS as well:
</p>

<StyledSvg1/>

<p>
  We give the SVG itself a border. Any circle should be blue and 50% transparent, except when we hover over it when it should become red and fully opaque. 
  Rectangles should be green with a red outline. This is the resulting graphic (see what happens when you hover over the circle):
</p>

<p>
  There are a large number of elements that can be used within an SVG element. 
  These include <code>circle</code>, <code>rect</code>, <code>line</code>, <code>path</code>, etc. 
  Each has their own list of possible attributes. For a full overview, 
  see <a href=https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg target=_blank>the Mozilla MDN Docs</a>. 
</p>

<h3>A simple scatterplot</h3>

<p>Let's say we have 5 datapoints that we want ot put into a scatterplot: <code>[[20,100],[60,140],[80,20],[160,40],[180,160]]</code>. 
  We can make a plot like this:
</p>

<StyledSvg2/>

<h3>Rectangle, ellipse, line</h3>
<p>
  Other straightforward marks available to you in SVG are rectangles, ellipses, and lines.
</p>

<p class=intermezzo>
  Make sure to bookmark <a href=https://developer.mozilla.org/en-US/docs/Web/SVG target=_blank>the Mozilla MDN Docs</a>. 
  You can find information there on what parameters are available for which shapes, how to draw text, 
  transformations and coordinate systems, etc.
</p>

<FormsSvg/>

<h3>Polylines and polygons</h3>
<p>If we want to create a jagged line, we can add multiple lines together when one starts where another ends, like so:</p>

<PolyLines/>

<p>
  (I've added whitespace here to indicate that the startpoints of each line are the same as the endpoints of the previous line.) 
  Of course it's nicer to do that in one go, like so:
</p>

<PolyLines2/>

<p>Note that we defined <code>fill</code> as <code>none</code>. If we give the element a fill colour, it act as if the start and end point are connected. For example:</p>

<PolyLines3/>

<p>A <code>polygon</code> is almost exactly the same as a <code>polyline</code>, but it connects the start and end points.</p>

<Polygon/>

<h3>Paths</h3>
<p>
  Any of the marks shown above can also be created using a <code>path</code>. 
  The Mozilla MDN Docs have pretty good <a href=https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths target="_blank">tutorial</a> on them.
  A path has one argument, <code>d</code> which is a string that describes the path. At its most basic, 
  we can move (<code>M</code> or <code>m</code>) the mouse (without drawing), and draw a lines (<code>L</code> or <code>l</code>). 
  We can recreate the polyline from above like so:
</p>

<Paths/>

<p>
  We can close the path (and change the polyline to a polygon) by adding a <code>Z</code> at the end of the string.
</p>

<PathsZ/>

<p>
  So <code>M</code> moves the pen across the paper without touching the paper; 
  <code>L</code> does so with touching the paper. We can illustrate this by replacing one 
  of the <code>L</code> s above into an <code>M</code>.
</p>

<PathsM/>

<h3>Relative positions</h3>

<p>
  The coordinates given for <code>M</code> and <code>L</code> are the absolute coordinates within the SVG element. 
  We can also give positions that are <i>relative</i> to the current position. We do this using the lowercase 
  <code>m</code> and <code>l</code>. This means that <code>M 50,50 L 50,100 L 100,50</code> is the same as 
  <code>M 50,50 l 0,50 l 50,-50</code>.
</p>

<h2>Curves</h2>
<p>The <code>path</code> element can also be used to draw curves like bezier curves and arcs.</p>

<h3>Bezier curves</h3>
<p>
  In SVG we can draw quadratic (<code>Q</code>) and cubic (<code>C</code>) bezier curves. 
  A <b>quadratic bezier curve</b> is an interpolation between two linear interpolations. 
  In the image below, \(P_0\) and \(P_2\) are the _anchor points_ and \(P_1\) is a _control point_. 
  We interpolate between \(P_0\) and \(P_1\) on one hand, and \(P_1\) and \(P_2\) on the other. 
  We connect those interpolations with a (green) line. Next, we interpolate across that green line 
  to get the bezier curve itself.
</p>

<img src={bezier_quad} alt="" style="max-width: 550px" title=https://en.wikipedia.org/wiki/Bézier_curve#/>

<p>In an SVG <code>path</code>, the \(P_0\) is the last point in the path, followed by the control point \(P_1\), and second anchor point \(P_2\). In the example below, \(P_0\) is <code>20,100</code>, \(P_1\) is <code>100,20</code>, and \(P_2\) is <code>180,100</code>. We also draw the points themselves as a reference (control point is in red).</p>

<BezierQuad/>

<p>A <b>cubic bezier curve</b> takes this one level higher, and therefore uses two control points.</p>

<img src={bezier_cub} alt="" style="max-width: 550px" title=https://en.wikipedia.org/wiki/Bézier_curve#/>

<p>An example:</p>

<BezierCub/>

<h3>Arcs</h3>
<p>
  Arcs are tricky in SVG, so definitely check out the <code>path</code> 
  <a href=https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths target="_blank">tutorials</a> if you need them.
  As with the bezier curves, a curve starts from a certain point that is already defined 
  in the <code>path</code>. So you will need for example a <code>M</code> or <code>L</code>
   directive before the arc itself. The arc is drawing using the <code>A</code> directive, 
   which takes the following arguments:
</p>

<ul>
  <li>radius in x-direction <code>rx</code></li>
  <li>radius in y-direction <code>ry</code></li>
  <li>rotation around x axis</li>
  <li><code>large-arc-flag</code></li>
  <li><code>sweep-flag</code></li>
  <li>x coordinate of end point</li>
  <li>y coordinate of end point</li>
</ul>

<Arcs/>

<p>Notice that the radii <code>rx</code> and <code>ry</code> are scaled so that the arc can reach the end point.</p>

<Arcs2/>

<p>
  For an explanation of the <code>large-arc-flag</code> and <code>sweep-flag</code>, 
  please see the tutorial mentioned above. The image below shows their effect on an arc:
</p>
<img src={arc_flags} alt="" style="max-width: 450px"/>

<h2>Groups and transformations</h2>
<p>
  When putting elements (like circles) on the screen, we can define their positions in <code>cx</code> and <code>cy</code> 
  using the coordinate system that they end up with. Say we want to have 5 circles in a <code>+</code> pattern, like so:
</p>

<Groups0/>

<p>
  Instead of setting the center of the <code>+</code> at <code>(100,100)</code> it might be easier to set it at <code>(0,0)</code> 
  and define the other points relative to that position, and then shift (translate) everything to afterwards. 
  We can do this using the <code>transform</code> directive. <code>transform</code> can be applied to almost any HTML element, 
  but here we will first create a <b>group</b> <code>g</code> around the circles so that we only need to transform 
  the group instead of every circle separately.
</p>

<Translate/>
<p>Apart from translation, <code>transform</code> let's us also scale, and rotate elements, as well as combine any of these. In the example below, the red square gets translated (green), rotated (blue), scaled (black) and scaled after rotation (orange). Note that in the last case, it <i>does</i> matter in which order you perform the transformations: scaling after rotation is not the same as rotation after scaling.</p>

<Scale/>

<h2>SVG Coordinate Systems</h2>
<p>
  Until now, we defined <code>width</code> and <code>height</code> in pixels for the SVG object. Our coordinates were interpreted as these pixel values and,
  for sake of simplicity, we will continue to do so throughout this tutorial. In practice, it can be benefitial to define your canvas coordinates independent
  from the draw/pixel coordinates. This is where <code>viewBox</code> is handy.
</p>
<p>
  In theory, the SVG canvas is endless. However, we will only draw a certain window of this endless canvas; the <code>viewBox</code>.
  Define the parameters with <code>viewBox="<i>origin_x origin_y width height</i>"</code>. 
  The origin you define here will be drawn at the pixel-origin (top-left corner).
  The width and height define the window of the endless canvas that we look through. The window is positioned in a way that 
  the top-left corner matches the viewport-origin and the bottom-right corner matches viewport-origin plus our width & height.
</p>
<p>Improve or test your understanding with the following examples:</p>
<img src={viewbox0} alt="" style="max-width: 850px"/>
<p>
  Both images are taken from a german tutorial at 
  <a href=https://www.mediaevent.de/tutorial/svg-viewbox-koordinaten.html target=_blank>https://www.mediaevent.de/tutorial/svg-viewbox-koordinaten.html</a>. 
  Have a look, if you want more visual examples of the viewBox.
</p>
<img src={viewbox1} alt="" style="max-width: 850px"/>