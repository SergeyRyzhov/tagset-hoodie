"use strict";

const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var WebappManifest = require("webapp-manifest-plugin");
var WebappManifestPlugin = WebappManifest.default;

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
var publicPath =
  process.env.NODE_ENV === "production"
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath;

var pathWithoutSlash =
  publicPath.indexOf("/") == publicPath.length - 1
    ? publicPath.slice(0, -1)
    : publicPath;
function mapIcons(icons) {
  return icons.map(function(icon) {
    icon.src = pathWithoutSlash + "/static/icons/" + icon.src;
    return icon;
  });
}

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
      /*{
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: "pre",
        include: [resolve("src"), resolve("test")],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },*/
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
      logo: "./static/icons/logo.svg",
      prefix: "icons-[hash]/",
      emitStats: false,
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
      startUrl: pathWithoutSlash + "/index.html",
      scope: pathWithoutSlash + "/",
      backgroundColor: "#290716",
      themeColor: "#290716",
      icons: mapIcons([
        {
          src: "logo.svg",
          sizes: "any",
          type: "image/svg+xml"
        },
        {
          src: "android-chrome-36x36.png",
          sizes: "36x36",
          type: "image/png"
        },
        {
          src: "android-chrome-48x48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "android-chrome-72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "android-chrome-96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "android-chrome-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "android-chrome-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "android-chrome-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]),
      preferRelatedApplications: false
    })
  ]
};
