import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

export default [
    { ignores: ['dist', 'node_modules', '.next', '.nuxt'] },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue,jsx,tsx}'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            'no-console': 'warn',
            'no-else-return': 'warn',
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    types: ['function'],
                    format: ['camelCase'],
                    filter: {
                        regex: '(Click|Scroll|Change|Submit|Input|Select|Key|Mouse)||^on[A-Z]',
                        match: true,
                    },
                    prefix: ['handle'],
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                    filter: {
                        regex: '(Click|Scroll|Change|Submit|Input|Select|Key|Mouse)||^on[A-Z]',
                        match: true,
                    },
                    prefix: ['handle'],
                },
            ],
        },
    },

    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
            },
        },
    },

    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...(pluginReact.configs?.recommended?.rules || {}),
            ...(pluginReactHooks.configs?.recommended?.rules || {}),
            'react/react-in-jsx-scope': 'off',
        },
    },
]
