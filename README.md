# Microsoft Clarity for Nuxt 2 & 3
## Installation

Add `nuxt-microsoft-clarity` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add nuxt-microsoft-clarity
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install nuxt-microsoft-clarity
  ```

  </code-block>
</code-group>

Then, add `nuxt-microsoft-clarity` to the `modules` section of `nuxt.config.ts`:

```ts[nuxt.config.ts]
{
  modules: [
    'nuxt-microsoft-clarity'
  ],
  clarity: {
    id: '<clarity-project-id>'
  }
}
```

## Contributing

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
