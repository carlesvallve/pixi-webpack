var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build/')
    },

    devServer: {
      contentBase: './build',
      port: 3333,

      // enable history API fallback to HTML5 History API based
			// routing works. This is a good default that will
			// come in handy in more complicated setups.
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',
    },

    // Enable sourcemaps for debugging webpack's output.
    //devtool: "source-map",

    resolve: {
        // Add resolvable extensions.
        extensions: ["", ".js"]
    },

    module: {
        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: "source-map-loader" }
        // ],

        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
          },
          {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
        ],

        // Pixi expects people to be using Browserify. We're not, but we still can use
        // its brfs module to deal with pixi code using "fs".
        // postLoaders: [
        //   { include: path.resolve(__dirname, "node_modules/pixi.js"), loader: "babel" } // loader: "transform?brfs"
        // ]
    },

    externals: [
        // Don't bundle pixi.js, assume it'll be included in the HTML via a script
        // tag, and made available in the global variable PIXI.
        {"pixi.js": "PIXI"}
    ]

};
