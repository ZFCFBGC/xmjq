const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "development" ? "/" : "",
  outputDir: ".dist",
  assetsDir: "static",
  //打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://192.168.2.91:8003/eaa/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/login": {
        target: "http://192.168.2.232:8090/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/login": "/",
        },
      },
    },
  },
  //webpack相关配置
  chainWebpack: (config) => {
    config.entry.app = ["./src/main.js"];
    config.resolve.alias.set("@", resolve("src"));
    // less 全局样式注入
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    moment: {
      locales: ["zh-cn"], // 时间插件，选择中国时区
    },
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径，不能使用路径别名
        path.resolve(__dirname, "./src/assets/css/pelling.less"),
      ],
    },
  },
  configureWebpack: {
    //引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
};
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "src/style/global.less"), // 需要全局导入的less
      ],
    });
}
