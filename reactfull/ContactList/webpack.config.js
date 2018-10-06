var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimytype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimytype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimytype=image/png"
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimytype=image/svg+html"
            },
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: [/node_modules/, /public/],
                loader: "babel-loader",
                query:
                    {
                        presets: ['react']
                    }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
}