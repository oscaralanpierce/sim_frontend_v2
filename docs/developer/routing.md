# Routing

The SIM V2 front end uses a `BrowserRouter` from `react-router-dom` to render routes in the app.

## Table of Contents

- [The `paths` Object](#the-paths-object)
- [Page Routes](#page-routes)

## The `paths` Object

The paths used in the application are defined in `/src/routing/paths.ts`. The `Paths` interface is defined at the top of the file and then specific routes are defined in the default export, a `Paths` object.

## Page Routes

The `/src/routing/pageRoutes.tsx` file defines the `PageRoutes` component that is rendered within the root [`App` component](/src/App.tsx). This object encapsulates the router's routes and indicates which TSX components should be rendered when each route is visited.

Pages, along with any context providers they may require, are indicated in the `pages` array using the `tsx` key for each page. If no contexts are required, the TSX may consist of just the page's main component:

```tsx
const pages: Page[] = [
  {
    pageId: 'simplePage',
    title: `${siteTitle} | Simple Page`,
    description: "This page doesn't need any contexts to render",
    tsx: <SimplePage />,
    path: paths.simple,
  },
  {
    pageId: 'pageWithData',
    title: `${siteTitle} | Page with Data`,
    description: 'This page uses data provided by a context',
    tsx: (
      <MyContextProvider>
        <PageWithData />
      </MyContextProvider>
    ),
    paths: paths.pageWithData,
  },
  // other pages go here...
]
```
Adding the path to `paths.ts` and the page data to the `pages` array should be sufficient to render your new page at the route specified. Verify by running the dev server and visiting `http://localhost:5173/your_path`. Paths should be snake cased (although the keys corresponding to each path in `paths.ts` should be camel cased).

If your page requires props that are only known at runtime to render, you are probably trying to develop a [layout component](/docs/developer/component-architecture.md#layouts) and not a page. In fact, in the V1 API, there were no page components that took any props at all, so if your page needs data that cannot be provided via a context, that is a sign that you may be developing a [different type of component](/docs/developer/component-architecture.md).

