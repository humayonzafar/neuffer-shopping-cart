import js from '@eslint/js'
import typescript from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    js.configs.recommended,
    ...typescript.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['**/*.vue', '**/*.ts'],
        languageOptions: {
            parserOptions: {
                parser: typescript.parser,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            // TypeScript
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',

            // Vue
            'vue/multi-word-component-names': 'off',
            'vue/component-api-style': ['error', ['script-setup']],
        },
    },
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
]
