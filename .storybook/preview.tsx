import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },

  globalTypes: {
    reducedMotion: {
      description: 'Emulate prefers-reduced-motion',
      toolbar: {
        title: 'Reduced motion',
        icon: 'accessibility',
        items: [
          { value: 'no-preference', title: 'No preference' },
          { value: 'reduce', title: 'Reduce' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    reducedMotion: 'no-preference',
  },

  decorators: [
    (Story, { globals }) => (
      <div data-reduced-motion={globals.reducedMotion === 'reduce'}>
        <Story />
      </div>
    ),
  ],
}

export default preview
