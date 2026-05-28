import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import litA11yPlugin from 'eslint-plugin-lit-a11y';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.js'],

    plugins: {
      lit: litPlugin,
      'lit-a11y': litA11yPlugin,
      prettier: prettierPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    rules: {
      ...litPlugin.configs.recommended.rules,
      ...litA11yPlugin.configs.recommended.rules,

      'lit/no-invalid-html': 'error',
      'lit/no-useless-template-literals': 'warn',
      'lit/binding-positions': 'error',

      // Просто включаем правило. Оно само прочитает ваш .prettierrc
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    },
  },

  // Отключаем конфликтующие правила стилей ESLint
  eslintConfigPrettier,

  // Исключения (файлы, которые не нужно линтить)
  {
    ignores: ['dist/', 'node_modules/', 'vite.config.ts', 'tailwind.config.js'],
  }
);
