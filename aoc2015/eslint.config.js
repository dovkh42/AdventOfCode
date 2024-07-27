import eslintCspellPluginConfigs from '@cspell/eslint-plugin/configs';
import eslintJs from "@eslint/js";
import eslintSecurity from 'eslint-plugin-security';
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from "globals";

export default [
    eslintJs.configs.recommended,
    eslintSecurity.configs.recommended,
    eslintCspellPluginConfigs.recommended,
    {
        files: ['**/*.{js,cjs,mjs}'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                ...globals.es2024,
                ...globals.node
            }
        },
        plugins: {
            'simple-import-sort': eslintSimpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': "error",
            'simple-import-sort/exports': 'error',

        }
    }
];