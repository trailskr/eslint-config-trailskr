import { antfu, combine } from '@antfu/eslint-config'
import maskNet from '@masknet/eslint-plugin'
import preferArrowReturnStyle from 'eslint-plugin-arrow-return-style'
import playwright from 'eslint-plugin-playwright'
import * as preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import sonarjs from 'eslint-plugin-sonarjs'
import { isPackageExists } from 'local-pkg'

const vuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

type Options = Parameters<typeof antfu>[0] & {
  // plugin sonarjs 'full' - enables all rules, by default: true */
  sonarjs?: boolean | 'full'
  /** Processing of exceptions, by default: false */
  exceptions?: boolean
}

type UserConfig = Parameters<typeof antfu>[1]

const optionalConfig = <T extends object>(enabled: unknown, config: T): T => {
  return enabled ? config : {} as T
}

export const trailskr = (options: Options = {}, ...userConfigs: UserConfig[]) => {
  const {
    vue: enableVue = options?.vue || vuePackages.some((pack) => isPackageExists(pack)),
    sonarjs: enableSonar = true,
    exceptions: enableExceptions = false,
  } = options

  const sonarOverride = {
    rules: {
      'sonarjs/no-nested-conditional': 'off',
    },
  } as const

  const sonarConfig = enableSonar === 'full'
    ? sonarjs.configs.recommended
    : combine(sonarjs.configs.recommended, sonarOverride)

  return antfu({
    formatters: true,
    ...options,
  }, {
    // @keep-sorted
    rules: {
      'antfu/curly': 'off', // used 'curly'
      'antfu/if-newline': 'off', // used 'curly'
      'antfu/top-level-function': 'off', // used 'prefer-arrow-functions'
      'camelcase': 'error',
      'curly': ['error', 'multi-line', 'consistent'],
      'no-cond-assign': ['error', 'except-parens'],
      'no-restricted-globals': ['error', {
        name: 'Date',
        message: 'Use dayjs instead',
      }, {
        name: 'global',
        message: 'Use `globalThis` instead.',
      }, {
        name: 'self',
        message: 'Use `globalThis` instead.',
      }],
      'prefer-arrow-callback': 'off',
      'style/arrow-parens': ['warn', 'always'],
      'style/brace-style': ['error', '1tbs'],
      'style/no-extra-parens': ['error', 'all', { conditionalAssign: false, nestedBinaryExpressions: false }],
      'style/quotes': ['error', 'single', {
        allowTemplateLiterals: 'avoidEscape',
        avoidEscape: true,
      }],
      'ts/ban-ts-comment': 'error',
      // enabled below with ignores
      'ts/consistent-type-definitions': 'off',
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
    // https://github.com/u3u/eslint-plugin-arrow-return-style
    plugins: {
      'arrow-return-style': preferArrowReturnStyle,
    },
    rules: preferArrowReturnStyle.configs.recommended.rules,
  }, {
    // https://dimensiondev.github.io/eslint-plugin/
    plugins: {
      '@masknet': maskNet,
    },
    // @keep-sorted
    rules: {
      // https://dimensiondev.github.io/eslint-plugin/src/rules/prefer-early-return
      '@masknet/prefer-early-return': ['error', { maximumStatements: 0 }],
    },
  }, {
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
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  }, {
    files: ['e2e/**'],
    ...playwright.configs['flat/recommended'],
  }, optionalConfig(enableSonar, sonarConfig), ...userConfigs)
}
