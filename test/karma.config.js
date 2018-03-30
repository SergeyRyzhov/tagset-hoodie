/*global module */

module.exports = function(config) {
  config.set({
    // browsers: ["Chrome", "PhantomJS"],
    // browsers: ["Chrome"],
    browsers: ["PhantomJS"],
    frameworks: ["jasmine"],
    files: [
      {
        pattern: "./unit/*.spec.js",
        watched: true
      }
    ],
    // reporters configuration
    reporters: ["mocha"],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    preprocessors: {
      "./unit/*.spec.js": ["webpack"]
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
