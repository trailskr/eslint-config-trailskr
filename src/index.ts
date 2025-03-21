import { antfu } from '@antfu/eslint-config'
import playwright from 'eslint-plugin-playwright'
import * as preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import sonarjs from 'eslint-plugin-sonarjs'
import { isPackageExists } from 'local-pkg'

const vuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

type Options = Parameters<typeof antfu>[0] & {
  /** Sonarjs plugin, by default: true */
  sonarjs?: boolean
  /** Processing of exceptions, by default: false */
  exceptions?: boolean
}

type UserConfig = Parameters<typeof antfu>[1]

const optionalConfig = (enabled: unknown, config: UserConfig): UserConfig => enabled ? config : {}

export const trailskr = (options: Options = {}, ...userConfigs: UserConfig[]) => {
  const {
    vue: enableVue = options?.vue || vuePackages.some((pack) => isPackageExists((pack))),
    sonarjs: enableSonar = true,
    exceptions: enableExceptions = false,
  } = options

  return antfu({
    formatters: true,
    ...options,
  }, {
    // @keep-sorted
    rules: {
      'antfu/curly': 'off', // used 'curly'
      'antfu/if-newline': 'off', // used 'curly'
      'antfu/top-level-function': 'off', // used 'prefer-arrow-functions'
      'arrow-body-style': ['error', 'as-needed'],
      'curly': ['error', 'multi-line', 'consistent'],
      'prefer-arrow-callback': 'off',
      'style/arrow-parens': ['warn', 'always'],
      'style/brace-style': ['error', '1tbs'],
      'ts/ban-ts-comment': 'error',
      'ts/consistent-type-definitions': ['error', 'type'],
      'ts/no-explicit-any': 'error',
      'ts/no-shadow': 'error',
    },
  }, optionalConfig(!enableExceptions, {
    // @keep-sorted
    rules: {
      'no-restricted-syntax': [
        'error',
        'TSEnumDeclaration[const=true]', // Already added in the config Antfu
        'TSExportAssignment', // Already added in the config Antfu
        'TryStatement',
        'ThrowStatement',
      ],
    },
  }), {
    // https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
    },
    // @keep-sorted
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': ['warn', {
        allowObjectProperties: true,
      }],
    },
  }, optionalConfig(enableVue, {
    rules: {
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/block-lang': ['error', {
        script: { lang: 'ts', allowNoLang: false },
      }],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 },
      }],
      'vue/no-empty-component-block': 'error',
      'vue/no-mutating-props': ['error', { shallowOnly: true }],
      'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],
    },
  }), {
    ignores: ['*', '**/*.d.ts', '**/*.md/*.*'],
    // @keep-sorted
    rules: {
      'import/no-default-export': 'error',
    },
  }, {
    files: ['e2e/**'],
    ...playwright.configs['flat/recommended'],
  }, optionalConfig(enableSonar, sonarjs.configs.recommended), ...userConfigs)
}
