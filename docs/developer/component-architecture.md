# Component Architecture

## Table of Contents

- [Component Types](#component-types)
  - [Pages](#pages)
  - [Layouts](#layouts)
  - [Component](#components)
- [Building New Components](#building-new-components)
  - [The Component Directory](#the-component-directory)
    - [Your Component's File](#your-components-file)
    - [Vitest/Testing Library Tests](#vitesttesting-library-tests)
    - [Storybook Stories](#storybook-stories)
    - [CSS Modules](#css-modules)
  - [Adding a New Page](#adding-a-new-page)

## Component Types

There are three types of components in SIM's hierarchy: pages, layouts, and components. In technical terms, these are all React components, but they represent distinct concepts and live in their own eponymous directories within `/src/`. Components are typically composed. For example, a page component may have a child layout that is made up of multiple other components and has plain components as children.

### Pages

Pages represent a page of the site with its own path. Paths are defined in `/src/routing/paths.ts`. (More information about paths and routing is available in the [routing docs](/docs/developer/routing.md).) A page is the highest-level component and consists of many child components, possibly including a [layout](#layouts). Page components live in the `/src/pages/` directory.

### Layouts

A layout is a component that contains structural elements common to multiple pages. They are used to reuse things like page headers, playthrough selects, or controls that should look similar on multiple pages. For example, if you want to add pages to search through inventory items and infrastructure, you might implement a `SearchLayout` that has a page header, search bar, and container to render results. Layout components live in the `/src/layouts/` directory.

### Components

A component is any other React component that may be used as part of a layout or page. Components are the most common component type and can represent headers, footers, forms, buttons, or any other collection of HTML elements. Component-components live in the `/src/components/` directory.

## Building New Components

When building a new component, you will first need to identify whether your new component should be a page, a layout, or a plain component.

A component should be a page if:

1. The component is rendered at one particular route
2. The component is not rendered at any other route
3. The component and its children constitute the entirety of what a user sees when they visit that route

A component should be a layout if it does not meet the criteria for a page and:

1. The design is used for multiple pages
2. The design encompasses structural elements like headers and controls for the entire page

Any component that doesn't meet the criteria for a page or layout should be a component and live in the `/src/components/` directory.

### The Component Directory

The type of component you are building determines whether your component should be kept in `/src/pages/`, `/src/layouts/`, or `/src/components/`. Once you have determined this, you will want to create a directory called `/myComponent/` within the appropriate parent directory. This directory will contain, in general, four files:

- `myComponent.tsx` - the definition of your component itself. The component should be exported as a default export from this file.
- `myComponent.stories.tsx` - Storybook stories for your component. These should cover as many component states as possible and incorporate different props for components that take props.
- `myComponent.test.tsx` - Vitest tests for your component
- `myComponent.module.css` - a [CSS module](https://github.com/css-modules/css-modules) to house styles scoped to your component.

Any snapshots taken as part of your Vitest tests will be stored in a `/src/<parentDirectory>/myComponent/__snapshots__/` directory. This directory will be generated on your first test run - you should not create it yourself.

Sometimes there will be other files in your component's directory as well, such as images specific to a given component.

#### Your Component's File

Most components take props. The type of the props should be defined in one or more interfaces above the definition of your component. These interfaces may be exported if they are needed for your stories, Vitest tests, parent components, or other modules.

```ts
import { type MouseEvent } from 'react'

interface MyComponentProps {
  title: string
  quantity: number
  description: string
  onClick: (e: MouseEvent) => void
}

const MyComponent = ({
  title,
  quantity,
  description,
  onClick,
}: MyComponentProps) => {
  // Component code goes here
})

export default MyComponent
```

SIM uses exclusively functional components. Class components should not be used.

#### Vitest/Testing Library Tests

For reasons of [test isolation](https://dana-scheider.medium.com/troubleshooting-dom-leakage-between-tests-with-react-testing-library-a7c5343bb614), it is recommended that you use the custom functions exported from the [test utils module](/src/support/testUtils.tsx) instead of importing `render` from Testing Library directly. Assertions should then be made against the rendered wrapper instead of against `screen`. This prevents global DOM state from leaking between tests and keeps your tests order-independent.

Vitest tests should cover all logic in your component, especially anything that can't be captured in Storybook or is not obvious in stories. If data from the API is required for your Vitest tests, you can mock it using [MSW](https://mswjs.io).

Wherever possible, your tests should include snapshots of each relevant state.

#### Storybook Stories

SIM uses [Storybook](https://storybook.js.org) to develop components in isolation. All components, including pages and layouts, should have stories. The stories should cover as many component states as possible. If data from the API is needed for your stories, it is recommended to mock this data in a context rather than mocking an actual API call. API calls should be mocked with MSW only if the call is made as a result of user interaction with a component. Data that is fetched before a component is rendered should be mocked as a context value.

#### CSS Modules

CSS should be written mobile-first. The smallest viewport width officially supported is 320px, with standard breakpoints at 480px, 600px, 768px, 1024px, 1200px, and 1404px. This means that we use `min-width` media queries exclusively unless there is a clear rationale for using `max-width` instead:

```css
.root {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  font-size: 1rem;
  line-height: 1.3;
}

@media(min-width: 1025px) {
  .root {
    font-size: 2rem;
    line-height: 2;
  }
}
```

When you make a PR, the PR template will ask you to upload screenshots of all relevant states at each breakpoint. You should upload screenshots at each breakpoint even if your component doesn't actually use all breakpoints in its CSS.

### Adding a New Page

To add a new page component, you'll need to take the additional step of adding your page to `/src/routing/paths.ts` and to the `pages` array in `/src/routing/pageRoutes.tsx`. In the latter, you will need to indicate the TSX code to be rendered:

```tsx
const pages: Page[] = [
  // other pages go here...
  {
    pageId: 'myPage',
    title: `${siteTitle} | My Page`,
    description: 'Appropriate description for your new page',
    tsx: (
      <MyContextProvider>
        <MyPage />
      </MyContextProvider>
    ),
    paths: paths.myPage, // this may also be scoped, e.g. paths.dashboard.myPage
  }
]
```

If you can't render your page in `/src/routing/pageRoutes.tsx` without props that can't be known until runtime, you may be dealing with a layout component and not a page.