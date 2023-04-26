module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    camelcase: 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/media-has-caption': 'off',
  },
};
