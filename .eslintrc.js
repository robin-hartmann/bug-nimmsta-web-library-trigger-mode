module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'import',
    'prettier',
    'promise',
    'unicorn',
  ],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/unicorn',
  ],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    curly: ['error', 'all'],
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // https://github.com/basarat/typescript-book/blob/master/docs/tips/defaultIsBad.md
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'node/no-missing-import': [
      'error',
      {
        // some modules like `chalk` have a `.d.ts` file as their index file
        tryExtensions: ['.d.ts', '.ts'],
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
  },
}
