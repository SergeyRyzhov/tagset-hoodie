"use strict";

const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var WebappManifest = require("webapp-manifest-plugin");
var WebappManifestPlugin = WebappManifest.default;
var FAVICON_PLUGIN = WebappManifest.FAVICON_PLUGIN;

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
var publicPath =
  process.env.NODE_ENV === "production"
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath;
var iconPath =
  publicPath.indexOf("/") == publicPath.length - 1
    ? publicPath.slice(0, -1)
    : publicPath;
module.exports = {
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: publicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("src"), resolve("test")],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./static/icons/logo.png",
      prefix: "tagset/icons-[hash]/",
      emitStats: true,
      statsFilename: "iconstats-[hash].json",
      persistentCache: true,
      inject: true,
      background: "#fff",
      title: "TAG#SET",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new WebappManifestPlugin({
      name: "TAG#SET",
      shortName: "TAG#SET",
      description: "Site for selecting your own set of tags",
      dir: "auto",
      lang: "en-US",
      display: "standalone",
      orientation: "any",
      startUrl: "/index.html",
      backgroundColor: "#290716",
      themeColor: "#290716",
      // icons: FAVICON_PLUGIN,
      icons: [
        {
          src: iconPath+"/static/icons/logo.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: iconPath+"/static/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: iconPath+"/static/icons/android-chrome-515x512.png",
          sizes: "515x512",
          type: "image/png"
        }
      ],
      preferRelatedApplications: false
      // , relatedApplications: []
      // , scope: "/tagset"
    })
  ]
};
