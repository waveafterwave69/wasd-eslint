import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,

    ...pluginVue.configs['flat/recommended'],

    {
        files: ['**/*.{js,mjs,ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': 'warn',
        },
    },
]
