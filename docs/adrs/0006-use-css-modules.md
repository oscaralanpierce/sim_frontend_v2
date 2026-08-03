<!-- Pad out the ADR number with leading 0s if it is less than 4 digits. -->
<!-- The heading/title should match the filename. -->

# 0006. Use CSS Modules

## Date

2026-08-03

## Approved By

@oscaralanpierce

## Decision

We will use CSS modules over plain CSS or styled-components. We will not use Sass/SCSS.

## Glossary

- **CSS Modules:** A CSS file where all class names and animation names are scoped locally by default;
  in React, this typically means they are scoped at the component level rather than for the whole
  document
- **Sass/SCSS:** A CSS extension language allowing nested styles, variables, and other features reducing
  the length and wordiness of CSS code
- **Styled Components:** A CSS-in-JS/TS solution that enables styles to be written in the same files
  as React components (if desired), eliminating the need for CSS files entirely; CSS is generated on build
  ([docs](https://styled-components.com/docs))

## Context

Traditional, document-scoped CSS files for modern web apps are long and difficult to maintain. Cascade order
is very particular and can be brittle; in longer documents, it can be very hard to know which aspect of the
cascade has failed when a style isn't appearing as expected on a particular element. The advent of agentic
engineering simplifies this somewhat, but CSS remains challenging for human maintainers. Tools like Sass and
SCSS have reduced the burden somewhat by organising files in a way that makes cascade order more intuitive.
However, document length can still become an issue when scoping to a full document.

Fortunately, the introduction of CSS modules and styled components means that we are no longer limited to
enormous swathes of CSS that need to cover every edge case in the document. Instead, we can scope CSS to
specific React components. CSS modules function by generating unique class names at build time, enabling
highly granular CSS rules that won't be applied to unintended components. The full CSS bundle is then
generated programmatically. Styled components are somewhat different, allowing styles to be defined alongside
components in TypeScript. Functionally, they, too, scope styles to a specific component and generate a CSS
bundle.

Sass and SCSS (they are similar, but Sass provides additional semantic sugar) are compatible with CSS modules,
but not with styled components.

In V1 of the SIM front end, we used CSS modules. They were easy to use and created no issues.

All of the considered solutions support media queries and advanced CSS features like animations.

## Alternatives Considered

- Plain CSS covering the full document
- CSS modules
- Styled components
- Sass/SCSS (mutually exclusive with styled components, but not with CSS modules or plain CSS)

## Considerations

The main considerations were our experiences with the options considered and the pain points that arose with
each. CSS modules have had no substantial drawbacks in the several years we've been using them. Styled components
have many of the same advantages but also use a TypeScript syntax that is, in our opinion, awkward and can become
burdensome. CSS modules enable separation of concerns without the perils of plain CSS cascades.

### CSS Modules

CSS modules were the favourite out the gate because we have used them before and it was a great experience.
They are compatible with styles defined in JavaScript/TypeScript, so in the event a style needs to be dynamic,
this is possible using variables passed into a `style` attribute:

```tsx
const Widget = ({ foo, children }: WidgetProps) => {
  const colors = {
    '--background-color': THEME_COLOR_LIGHT,
    '--text-color': TEXT_COLOR,
    '--text-color-foo': TEXT_COLOR_BRIGHT,
    '--border': '1px solid red',
    '--border-radius': 3,
  }

  return (
    <div className={styles.root} style={colors}>
      <p className={foo ? styles.text : styles.textFoo}>{children}</p>
    </div>
  )
}
```
The corresponding CSS file then might look like this:
```css
.root {
  background-color: var(--background-color);
  border: var(--border);
  border-radius: var(--border-radius);
}

.text {
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text-color);
  margin: 0 auto;
  text-align: center;
}

.textFoo {
  composes: text;
  color: var(--text-color-foo);
}
```

This style has a few advantages:

- Familiar syntax to anyone has used CSS before
- Supported in React out of the box - no [additional packages](/docs/adrs/0003-avoid-third-party-packages.md) required
- `composes` keyword enables composition of styles without complex cascades or multiple classes

The primary disadvantage of CSS modules is that they require separate CSS files for each component. This is a
trade-off, however: styled components can define styles in the same files as the components themselves, but can
result in bloated TypeScript, especially for larger components.

### Styled Components

Styled components have some of the same advantages as CSS modules. The code above might look like this using styled
components:

```tsx
const Box = styled.div<{ $borderRadius: number, $colors: Colors }>`
  background-color: ${props => props.$colors.themeColorLight};
  border: ${props => `1px solid ${props.$colors.border}$`};
  border-radius: ${props => props.$borderRadius};
`

const Text = styled.div<{ $foo: boolean, $colors: Colors }>`
  font-family: Arial, Helvetica, sans-serif;
  color: ${props => props.$foo ? props.$colors.textColorFoo : props.$colors.textColor};
  margin: 0 auto;
  text-align: center;
`

render(
  <Box borderRadius={3} colors={{ themeColorLight: '#fff', border: 'red'}}>
    <Text foo={false} colors={{ textColorFoo: 'blue', textColor: '#343434' }}>
      {children}
    </Text>
  </Box>
)
```

There would be a learning curve for us to learn the syntax for more complex components, although the barrier
would be lower with agentic engineering. Styled components would require a separate NPM package, which we prefer
to avoid.

### Sass/SCSS

Although Sass is compatible with CSS modules, the fact is we've never had the kinds of problems it solves. CSS
modules have proven lightweight, flexible, and easy to use and understand. For plain CSS, incorporating Sass would
be not only logical but nearly essential. But for CSS modules it would be overkill and would, again, involve an
additional package.

Sass can also encourage antipatterns in CSS modules, where tight scoping is preferred over controlled cascades. For
example, Sass facilitates syntax like this:

```scss
.text {
  font-size: 1.5em;
  color: #343434;

  .foo {
    color: red;
  }
}
```

But in CSS modules, `composes` is preferred:

```css
.text {
  font-size: 1.5em;
  color: #343434;
}

.textFoo {
  composes: text;
  color: red;
}
```
This works because CSS modules typically negate the need for multiple classes (although there are rare exceptions).

## Summary

We will use CSS modules for styling in the SIM front end. We will not use Sass/SCSS.

## Resources and References

- [CSS Module docs](https://github.com/css-modules/css-modules)
- [Sass/SCSS docs](https://sass-lang.com/)
- [Styled Component docs](https://styled-components.com/docs)
