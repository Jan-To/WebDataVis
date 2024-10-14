<h1>Styling in Svelte</h1>
<p> 
  We intentionally did not talk a lot about styling in Svelte so far. That is because there are plenty of options to style in Svelte. 
  In general there are two approaches, writing CSS on your own or using a library to do so. Each approach has its benefits and you will 
  probably end up using a mix of both, so let us consider the options.
</p>

<h2>Styling on your own</h2>
<p>
  As we have learned before Svelte has <b>scoped CSS</b> baked in, meaning each component can have its own CSS that is scoped to that component. 
  But how far should you take this approach, especially for more complex projects like data visualization?
</p>
<p>
  Indeed, the scoped styling can come in really handy for our data visualization projects. The CSS will be right next to the component it applies to, 
  findable and relatable. However, we should only use this for CSS that is relevant <b>only</b> in this component and still rely on a consistent global styling.
  That is possible because there are ways to declare global CSS, which can be overwritten by locally scoped CSS, if necessary.
</p>

<ul>
  <li>
    Use <code>:global(x)</code> to declare a global style. E.g. to change the color of all <code>h1</code> headlines, 
    use <code>{`:global(h1){color: blue;}`}</code>
  </li>
  <li>
    Use a <code>styles.css</code> file to import in your <code>App.svelte</code> or <code>+layout.svelte</code>. 
    The styles defined there are applied globally, but will be applied globally. A simple <code>import './styles.css';</code> is enough.
    This is the recommended approach, as it is easier to swap out the <code>styles.css</code> to apply a new theme.
  </li>
</ul>

<h3>Pro's of Custom CSS</h3>
<ul>
  <li>
    <b>Full control over styling:</b> 
    When you write your own CSS, you get complete control over every aspect of the styling. 
    This level of control is especially handy for pixel-perfect customization of every aspect of your chart.
  </li>
  <li>
    <b>Avoid unforeseen conflicts:</b>
    As Svelte is scoped, your custom styles will not be leaking over components, at least not unforeseen. 
    A library might induce global styles that conflicts with yours.
  </li>
  <li>
    <b>Lean Code:</b>
    Writing only what you need will keep your codebase lightweight and usually (slightly) faster than with a library.
  </li>
</ul>

<h3>Con's of Custom CSS</h3>
<ul>
  <li>
    <b>Time Consuming:</b>
    Writing your own code will be more time consuming than just using the code that is already available, 
    as long as you are happy with what is available. Especially reponsive design 
    (e.g. <a href=https://www.w3schools.com/css/css_rwd_mediaqueries.asp>media queries</a>) can be quite challenging.
  </li>
  <li>
    <b>Potential for Inconsistency:</b>
    If your project grows or multiple team members are involved, maintaining consistency across different components could become a challenge. 
    Custom CSS, if not well-structured, could result in inconsistent styling or technical debt over time.
  </li>
</ul>

<p>
  HINT: There is a solution for the second point though:
  Use CSS variables to maintain a consistent color scheme, font sizes, and spacing across components. Define them in your <code>styles.css</code> 
  with <code>--primary-color: red;</code> and use them with <code>color: var(--primary-color)</code>.</p>
<p>
  Writing your own CSS offers flexibility and control but comes with trade-offs in terms of time and maintenance. 
  If you need a fully customized and lightweight solution, writing CSS manually could be the way to go. However, 
  for larger projects or when you need to save time, relying on CSS frameworks or utility libraries might be a more practical solution.
</p>

<h2>Styling with a library</h2>
<p>
  When working with Svelte, several UI/component libraries can help streamline development and enhance styling. 
  Here is a list, from minimalistic and utility-focused to fully-featured, component-rich libraries:
</p>

<ul>
  <li>
    <a href="https://picocss.com/">Pico</a> – A minimal, lightweight CSS framework with accessible default styles, 
    ideal for small projects when you need basic styling with minimal overhead.
  </li>
  <li>
    <a href="https://bulma.io/">Bulma</a> – A simple, yet comprehensive framework for responsive design, 
    perfect for building clean layouts, if you don't want to focus on customization yourself.
  </li>
  <li>
    <a href="https://svelte-headlessui.goss.io/">HeadlessUI</a> – Provides unstyled, accessible components for building 
    fully custom designs, ideal for developers who want control over their UI while ensuring accessibility.
  </li>
  <li>
    <a href="https://skeleton.dev/">SkeletonUI</a> – A Svelte-specific utility library, great for modern, 
    responsive designs with flexibility and customization in mind.
  </li>
  <li>
    <a href="https://www.shadcn-svelte.com/">Shadcn-svelte</a> – Tailwind UI primitives and styled components 
    for highly customizable and accessible interfaces, perfect for complex, tailored applications.
  </li>
  <li>
    <a href="https://flowbite-svelte.com/">Flowbite-Svelte</a> – Offers pre-designed, tailwind-based components, 
    useful when you need a rich component set.
  </li>
  <li>
    <a href="https://getbootstrap.com/">Bootstrap</a> – A comprehensive, responsive framework with numerous pre-built components, 
    great for enterprise-level applications.
  </li>
</ul>

<p>
  Each library caters to different needs and which one you use heavily depends on personal preference, both structurally and visually. 
</p>
<p>
  We don't force you to use one particular (or one at all), but you may consider one down the line of your project.
  If you don't have previous experience in web development, we encourage you to start out without one.
  Ultimately, the choice depends on your preference and scope of your data visualization needs.
</p>


<h2>Layouting with Flexbox / Grid</h2>
<p>
  To be written. For now:
</p>
<ul>
  <li><a href='https://www.youtube.com/watch?v=phWxA89Dy94'>Youtube: Flexbox</a> (8 min)</li>
  <li><a href='https://www.youtube.com/watch?v=i1FeOOhNnwU'>Youtube: Grid</a> (24 min, no need to watch all)</li>
</ul>