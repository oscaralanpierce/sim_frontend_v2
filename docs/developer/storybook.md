# Storybook

We use Storybook to develop components in isolation.

## Table of Contents

- [Running Storybook](#running-storybook)
- [Developing Stories](#developing-stories)
  - [Accessibility in Storybook](#accessibility-in-storybook)
  - [Reduced Motion](#reduced-motion)

## Running Storybook

Run Storybook locally on port 6006 using:

```
yarn storybook
```

## Developing Stories

Stories should cover all component states, including loading and error states, that can be feasibly
included. Mocking of any API calls can be done with MSW.

### Accessibility in Storybook

Many accessibility factors, like ARIA labels and semantic HTML, can be assessed by inspecting elements
in Storybook.

#### Reduced Motion

One important accessibility consideration is users who have enabled a reduced motion setting on their device.
Any elements featuring animations or transitions should provide accommodations for users with this setting
enabled. Unfortunately, without enabling the setting on your own device, it is difficult to mock reduced motion
behavior.

When developing components with reduced motion, this behavior can be emulated by setting special styles in your
CSS module for when the global `data-reduced-motion` attribute is set to `true`. These styles should exactly mirror
the styles in your `prefers-reduced-motion` media query.

```css
@media (prefers-reduced-motion) {
  .root {
    animation: none;
  }

  .expanded {
    transition: none;
  }
}

/**
 * These styles must be fully identical to those in the media
 * query
 */
:global([data-reduced-motion='true']) .root {
  animation: none;
}

:global([data-reduced-motion='true']) .expanded {
  transition: none;
}
```

**Both the media query and the `data-reduced-motion` styles are necessary:** without the `data-reduced-motion` styles,
the behavior will not be visible in Storybook, but without the media query, it won't be visible to users in production.

Then, set this global attribute in Storybook.

```ts
export const Default: AnimatedWidgetStory = {}

export const ReducedMotion: AnimatedWidgetStory = {
  globals: {
    reducedMotion: 'reduce',
  },
}
```

This will enable you to see what your component looks like with and without reduced motion
in Storybook without updating your system settings.
