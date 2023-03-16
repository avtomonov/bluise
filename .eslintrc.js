module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:vue-a11y/recommended',
    'plugin:vue/strongly-recommended',
  ],
  plugins: ['vue-a11y', 'vue'],
  // add your custom rules here
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-console': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'vue/max-attributes-per-line': 'off',
    'vue/component-name-in-template-casing': [1, 'kebab-case'],
  },
  settings: {
    'import/core-modules': [
      '@nuxt/config',
      '@nuxt/vue-app',
      '@nuxt/types',
      'purgecss-webpack-plugin',
      'vue',
      'vuex',
      'vue-meta',
      'vue-server-renderer',
      'vue-router',
    ],
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.json', '.ts', '.vue'],
            alias: {
              '~': __dirname + '/app',
              '@': __dirname + '/app',
            },
          },
        },
      },
    },
  },
};
