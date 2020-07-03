const path = require("path");

const vueSrc = "./src";

const plugins = [
];

// vue.config.js
module.exports = {
  devServer: {
    port: 8181
  },
  lintOnSave: true,
  runtimeCompiler: true,
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/_variables.scss";'
      }
    }
  },
  configureWebpack: {
    mode: 'development',
    //devtool: 'source-map',
    resolve: {
      alias: {
        "~@": path.join(__dirname, vueSrc),
        "@": path.join(__dirname, vueSrc),
      }
    },
    plugins: plugins
  }
}
