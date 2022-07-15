const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: path.join(__dirname,'src','index.js'),
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: "/dist/",
        filename: "build.js"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};