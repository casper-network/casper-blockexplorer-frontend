module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-use-before-define': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
    'no-plusplus': 0,
    'no-var': 'error',
    'no-restricted-syntax': ['warn'],
    'no-extra-boolean-cast': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-return-assign': ['error', 'except-parens'],
    'lines-between-class-members': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-for-in-array': ['error'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'no-useless-constructor': 0,
    'no-empty-function': 0,
    'no-unused-expressions': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/function-component-definition': 0,
    'jsx-a11y/label-has-associated-control': 0,
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/no-unsafe-argument': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/prefer-optional-chain': ['warn'],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
