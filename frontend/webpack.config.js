const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, './static'),
        filename: '[name]-bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
        ],
    },
    devServer: {
        port: 3000,
        disableHostCheck: true,
        https: true,
        contentBase: `${__dirname}/static`,
        historyApiFallback: true,
        compress: true,
        proxy: {
            '/rest': 'http://localhost:7000',
            '**': {
                target: 'https://localhost:3000/',
                secure: true,
                headers: {
                    Connection: 'keep-alive',
                },
            },
        },
        hot: true,
        writeToDisk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/src/index.html`,
        }),
    ],
};