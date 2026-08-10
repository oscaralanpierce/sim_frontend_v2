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
enabled. We have configured Storybook to easily toggle reduced-motion behavior on and off in the browser. However,
this is easy to forget, so we prefer to have separate stories for reduced-motion states.

Unfortunately, there is extra code involved in configuring components to render with reduced motion styling in
Storybook, whether being viewed as separate stories or using browser controls. Because reduced motion settings
are impossible to actually emulate in the browser without enabling them on the device operating system, the
Storybook stories and toolbar won't actually apply styles from the reduced-motion media query. Instead, we
need to apply styles identical to those in the media query in the `data-reduced-motion` global style.

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
the behavior will not be visible in Storybook, but without the media query, it won't be visible to actual users with the setting enabled.

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
