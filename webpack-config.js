const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
  },

  plugins: [
    new InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "service-worker.js",
    }),
  ],
};
