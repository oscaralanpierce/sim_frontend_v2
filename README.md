# Skyrim Inventory Management V2 [![Hippocratic License HL3-FULL](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-FULL&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/full.html)

This repo houses the README for the Skyrim Inventory Management V2 front end. The original front end lives
[here](https://github.com/oscaralanpierce/skyrim_inventory_management_frontend).

## Table of Contents

- [Production Site](#production-site)
- [Overview](#overview)
- [Developer Informstion](#developer-information)
  - [Running Locally](#running-locally)
    - [Running the Back End](#running-the-back-end)
    - [Running the Front End](#running-the-front-end)
  - [Development Workflows](#development-workflows)
  - [Testing](#testing)
    - [Testing with Vitest](#testing-with-vitest)
      - [Writing Tests](#writing-tests)
    - [Testing with Storybook](#testing-with-storybook)
      - [Writing Stories](#writing-stories)
  - [Deploying from a Local Environment](#deploying-from-a-local-environment)
  - [GitHub Actions](#github-actions)
    - [Tests](#tests)
    - [Deploys](#deploys)
- [License](#license)

## Production Site

https://sim.oscaralanpierce.com

## Overview

Skyrim Inventory Management V2 is a distributed-stack app similar to an ERP system handling inventory, procurement, and logistics in Skyrim. This app is primarily intended for my personal use and is tailored to my playing style, which emphasises logistics and inventory management in the interest of displaying collected items in my various properties.

The SIM V2 API is available in [this repo](https://github.com/oscaralanpierce/sim_api_v2) and does not yet run in production. The SIM V2 front end will be the only authorised client for the time being.

The front end uses [Vite 8](https://vitejs.dev) with [React 19](https://reactjs.org) and [TypeScript 7](https://typescriptlang.org).

## Developer Information

### Running Locally

#### Running the Back End

In order to run the front end locally, you will need to run the back end on `http://localhost:3000`. Additional instructions are available in the README of the back end [repo](https://github.com/oscaralanpierce/sim_api_v2).

#### Running the Front End

Before you can run the front end, you will need to install dependencies. Dependencies are managed with [Yarn](https://yarnpkg.com/) v1. Clone this repository, `cd` into it, and run:

```
yarn
```

You can run the front-end server using:

```
yarn dev
```

In keeping with Vite defaults, the front end is configured to run on `http://localhost:5173` when you run this command. The API's [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy dictates that the front end must run on port 5173 in development.

### Development Workflows

We use [this Trello board](https://trello.com/b/Jo7Z3oUh/sim-project-board) to track work for both this app and the back-end API. When picking up a card, check out a development branch on your local to make the changes you need to make. The branch name should be `<issue-number>-descriptive-name`. An example could be `481-set-up-github-actions`, where 481 is the issue number assigned by Trello.

When you have finished the work, push to GitHub and make a pull request. Link the Trello card in the PR description and fill out the template as fully as possible. The PR description should include:

- **Context:** Any information a reader will need to understand why you've made the changes you have (this information can be duplicated from the Trello card, but needed context should be present in the PR description itself in case we change ticketing systems or the Trello link breaks in the future)
- **Summary of Changes:** A bulletted list summarising the changes you have made
- **Explanation:** A detailed explanation of any technical or design choices you made, tradeoffs you faced, and alternatives considered, including enough detail to make sense to a reviewer or a future developer investigating Git history

All PRs are expected to include updates to documentation (user or developer) and automated tests as appropriate. Tests should cover all possible component states, such as loading states or error states. API docs for the API are available [in the docs directory](https://github.com/oscaralanpierce/sim_api_v2/blob/main/docs/api/README.md) of that repo. The GitHub Actions CI workflow ensures that automated tests pass and that automated test coverage doesn't dip below 95%.

After creating your PR, attach it to the Trello card and move it into the "Reviewing" column. When your PR has been reviewed, you are free to merge.

### Testing

#### Testing with Vitest

[Vitest](https://vitest.dev/) has been set up with [Testing Library](https://testing-library.com) to handle testing of components.

It is recommended, per the docs, to take a behaviour-based approach to testing, using the React Testing Library tooling to interact with elements like a user would. It's important that we write these tests with an eye to ensuring complete coverage of the underlying logic. Not all of this logic will be in the components themselves, so at times we will need to simulate state that may not be directly testable.

To run the tests, you'll first need to run `yarn` to make sure your dependencies are installed and up-to-date. To run the tests, run:

```
yarn test
```

This will run the tests in watch mode, running relevant tests every time you save a file. You can press `q` to exit watch mode and go back to your terminal.

To get test coverage metrics, run:

```
yarn coverage
```

##### Writing Tests

In general, all components should have tests. These live in a file in the component's directory called
`componentName.test.tsx`. Tests should cover any relevant component state, such as verifying that a menu is hidden when a component renders and appears when a button is clicked. Tests should also cover component behaviour varying based on API data. For example, if a component renders normally on a success response and displays an error on an error response, both the success case and error case should have tests. API data can be mocked using [MSW](https://mswjs.io).

Snapshot tests are also recommended for most components and component states.

The details of how to use Vitest and React Testing Library are too extensive to cover in this README. You are encouraged to visit the docs for these tools and read existing test files to learn how to use the tools if you don't already know.

#### Testing with Storybook

[Storybook](https://storybook.js.org/) enables us to develop individual React components in isolation. Run Storybook locally using:

```
yarn storybook
```

Once Storybook is running, you can view your stories by visiting `http://localhost:6006` in your browser.

To ensure Storybook builds before committing or opening a PR, run:

```
yarn build-storybook
```

##### Writing Stories

Stories should reflect as many component states as possible. If you need to mock API data, you can do so using the [MSW](https://mswjs.io) addon. However, it is often best to mock data by simply adding data to a context provider/wrapper and wrapping the story using decorators.

Stories live in the directory with each component, in a file called `componentName.stories.tsx`. A simple example of a story file looks like this:

```tsx
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { contextValue } from '../support/data'
import { MyContext, type MyContextType } from '../contexts/myContext'
import MyComponent from './myComponent'

type MyComponentStory = StoryObj<typeof MyComponent>

const meta: Meta<typeof MyComponent> = {
  title: 'MyComponent',
  decorators: [
    (Story, { parameters }) => (
      <BrowserRouter>
        <MyContext value={parameters['contextValue'] as MyContextType}>
          <Story />
        </MyContext>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const Default: MyComponentStory = {
  parameters: {
    contextValue,
  },
}
```

If your component has multiple states, you can include multiple named exports in your story file. For example, you might have a component that has both success and error states. Then, you might have stories like this:

```tsx
export const Default: MyComponentStory = {
  parameters: {
    contextValue: contextValueSuccess,
  },
}

export const Error: MyComponentStory = {
  parameters: {
    contextValue: contextValueError,
  },
}
```

Stories can also be created for loading states or other states a component may have.

### Deploying from a Local Environment

**NB:** Deployment should always be done via GitHub Actions. **The instructions in this section apply to emergency situations only.**

You can manually deploy to [Firebase](https://firebase.google.com/docs/hosting) if you have access to do so using the Firebase CLI. To install the Firebase CLI, run:

```bash
npm install -g firebase-tools
```

To deploy, `cd` into the root directory from the SIM V2 front end and run:

```bash
firebase login
# (Use browser workflow to log in)
firebase deploy
```

### GitHub Actions

#### Tests

Vitest has been configured to run in CI with GitHub Actions. It runs against all PRs against `main` as well as when `main` is merged.

When working on an epic on a feature branch, you may want to configure GitHub Actions to run against PRs against the feature branch (or merges to that branch) and not just `main`. This can be done in the [pipeline definition file](/.github/workflows/ci.yml) by changing the following block:

```yml
on:
  push:
    branches: [main, your-feature-branch]
  pull_request:
    branches: [main, your-feature-branch]
```

#### Deploys

Deployment to [Firebase hosting](https://firebase.google.com/docs/hosting) is handled automatically by GitHub Actions. A preview is created when a PR is opened and a production deploy is run when a PR is merged to main. When working with previews, take care not to manipulate data at the API as there is only one API instance - **there is no staging API where data can be safely manipulated for testing.**

## License

Skyrim Inventory Management is proudly licensed under the [Hippocratic License](https://firstdonoharm.dev). This open-source license restricts use of source code by organizations or users whose usage maintainers consider unethical. This project uses the full (most restrictive) version of the license, with provisions on ecocide, human trafficking and slavery, genocide, mass surveillance, and other unethical activities.

Pursuant to the above, the maintainers specify that we do not authorize our code to be used by (without limitation) the US military, US Immigration and Customs Enforcement (ICE), the Israeli Defense Force (IDF), or any organisations that have contracts with the above.
