const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
    const SERVER_PATH = argv.mode === 'production' ? './src/server/server-prod.js' : './src/server/server-dev.js';
    return {
        entry: {
            server: SERVER_PATH,
        },
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: '/',
            filename: '[name].js',
        },
        mode: argv.mode,
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: './src/server/routes', to: 'routes' },
                    { from: './src/server/db', to: 'db' },
                    { from: './src/server/logs', to: 'logs' },
                    { from: './src/server/appdata', to: 'appdata' },
                ],
            }),
        ],
    };
};
