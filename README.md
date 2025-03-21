# @trailskr/eslint-config-trailskr

[![npm](https://img.shields.io/npm/v/@trailskr/eslint-config-trailskr?color=444&label=)](https://npmjs.com/package/@trailskr/eslint-config-trailskr)

Based on [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Differences

- eslint and plugins installations are not required. The following plugins included:
  * eslint-plugin-command
  * eslint-plugin-format
  * eslint-plugin-playwright
  * eslint-plugin-prefer-arrow-functions
  * eslint-plugin-sonarjs

- Added plugin [eslint-plugin-sonarjs](https://github.com/SonarSource/SonarJS/blob/master/packages/jsts/src/rules/README.md).

- By default, exception handling and throwing of try/catch/throw exceptions is prohibited. This is done so that error handling is handled explicitly and typed via TypeScript. You can disable this rule by providing `exceptions: true` option to config

- Some stylistic differences

- More strict rules:
  * no-explicit-any
  * no-shadow
  * prefer-arrow-functions
  * import/no-default-export

## Usage

### Manual installation

```bash
bun add -D @trailskr/eslint-config-trailskr
```

Create a file `eslint.config.ts`:

```js
// eslint.config.ts
import { trailskr } from '@trailskr/eslint-config-trailskr'

export default trailskr(
  {
    // Config settings, see Customization section
  },
  // ... Your own rules in flat style
)
```

### Script in package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```


## IDE Support (auto fix on save)

<details>
<summary>🟦 VS Code support</summary>

<br>

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:


```jsonc
{
  // disable unnecessary extensions
  "i18n-ally.disabled": true,
  "oxc.enable": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ],

  // Enable as default formatter for all supported languages
  "[javascript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[javascriptreact]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[typescript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[typescriptreact]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[vue]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[html]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[markdown]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[json]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[jsonc]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[yaml]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[toml]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[xml]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[gql]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[graphql]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[astro]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[svelte]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[css]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[less]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[scss]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[pcss]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[postcss]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" }
}
```

</details>


<details>
<summary>🟩 Neovim Support</summary>

<br>

Update your configuration to use the following:

```lua
local customizations = {
  { rule = 'style/*', severity = 'off', fixable = true },
  { rule = 'format/*', severity = 'off', fixable = true },
  { rule = '*-indent', severity = 'off', fixable = true },
  { rule = '*-spacing', severity = 'off', fixable = true },
  { rule = '*-spaces', severity = 'off', fixable = true },
  { rule = '*-order', severity = 'off', fixable = true },
  { rule = '*-dangle', severity = 'off', fixable = true },
  { rule = '*-newline', severity = 'off', fixable = true },
  { rule = '*quotes', severity = 'off', fixable = true },
  { rule = '*semi', severity = 'off', fixable = true },
}

local lspconfig = require('lspconfig')
-- Enable eslint for all supported languages
lspconfig.eslint.setup(
  {
    filetypes = {
      "javascript",
      "javascriptreact",
      "javascript.jsx",
      "typescript",
      "typescriptreact",
      "typescript.tsx",
      "vue",
      "html",
      "markdown",
      "json",
      "jsonc",
      "yaml",
      "toml",
      "xml",
      "gql",
      "graphql",
      "astro",
      "svelte",
      "css",
      "less",
      "scss",
      "pcss",
      "postcss"
    },
    settings = {
      -- Silent the stylistic rules in you IDE, but still auto fix them
      rulesCustomizations = customizations,
    },
  }
)
```

### Neovim format on save

There's few ways you can achieve format on save in neovim:

- `nvim-lspconfig` has a `EslintFixAll` command predefined, you can create a autocmd to call this command after saving file.

```lua
lspconfig.eslint.setup({
  --- ...
  on_attach = function(client, bufnr)
    vim.api.nvim_create_autocmd("BufWritePre", {
      buffer = bufnr,
      command = "EslintFixAll",
    })
  end,
})
```

- Use [conform.nvim](https://github.com/stevearc/conform.nvim).
- Use [none-ls](https://github.com/nvimtools/none-ls.nvim)
- Use [nvim-lint](https://github.com/mfussenegger/nvim-lint)

</details>

## Customization

```js
// eslint.config.ts
import { trailskr } from '@trailskr/eslint-config-trailskr'

export default trailskr(
  {
    // ...antfu configuration settings, formatting (formatters) is included by default

    // plugin sonarjs, by default: true*/
    sonarjs: true,
    // Processing of exceptions, by default: false*/
    exceptions: false,
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

Since v1.0, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

| New Prefix | Original Prefix        | Source Plugin                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `import/*` | `import-x/*`           | [eslint-plugin-import-x](https://github.com/un-es/eslint-plugin-import-x)                  |
| `node/*`   | `n/*`                  | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)                     |
| `yaml/*`   | `yml/*`                | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)                        |
| `ts/*`     | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `style/*`  | `@stylistic/*`         | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)           |
| `test/*`   | `vitest/*`             | [@vitest/eslint-plugin](https://github.com/vitest-dev/eslint-plugin-vitest)                |
| `test/*`   | `no-only-tests/*`      | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests)  |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

#### UnoCSS

To enable UnoCSS support, you need to explicitly turn it on:

```js
// eslint.config.ts
import { trailskr } from '@trailskr/eslint-config-trailskr'

export default trailskr({
  unocss: true,
})
```


### Optional Rules

This config also provides some optional plugins/rules for extended usage.

#### `command`

Powered by [`eslint-plugin-command`](https://github.com/antfu/eslint-plugin-command). It is not a typical rule for linting, but an on-demand micro-codemod tool that triggers by specific comments.

For a few triggers, for example:

- `/// to-function` - converts an arrow function to a normal function
- `/// to-arrow` - converts a normal function to an arrow function
- `/// to-for-each` - converts a for-in/for-of loop to `.forEach()`
- `/// to-for-of` - converts a `.forEach()` to a for-of loop
- `/// keep-sorted` - sorts an object/array/interface
- ... etc. - refer to the [documentation](https://github.com/antfu/eslint-plugin-command#built-in-commands)

You can add the trigger comment one line above the code you want to transform, for example (note the triple slash):

<!-- eslint-skip -->

```ts
/// to-function
const foo = async (msg: string): void => {
  console.log(msg)
}
```

Will be transformed to this when you hit save with your editor or run `eslint --fix`:

```ts
async function foo(msg: string): void {
  console.log(msg)
}
```

The command comments are usually one-off and will be removed along with the transformation.

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.ts
import { trailskr } from '@trailskr/eslint-config-trailskr'

export default trailskr(
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "bunx --bun lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
bun add -D lint-staged simple-git-hooks

// to active the hooks
bunx --bun simple-git-hooks
```

## View what rules are enabled

I built a visual tool to help you view what rules are enabled in your project and apply them to what files, [@eslint/config-inspector](https://github.com/eslint/config-inspector)

Go to your project root that contains `eslint.config.ts` and run:

```bash
bunx --bun @eslint/config-inspector
```
