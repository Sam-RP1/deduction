module.exports = {
    env: {
        node: true,
        browser: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        babelOptions: {
            configFile: './.babelrc',
        },
    },
    plugins: ['react'],
    settings: {
        react: {
            version: 'latest',
        },
    },
    rules: {},
    overrides: [
        {
            files: ['**/*.spec.js', '**/*.spec.jsx'],
            env: {
                jest: true,
            },
        },
    ],
};
