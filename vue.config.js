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
  },
  css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
  pluginOptions: {
    moment: {
      locales: ["zh-cn"], // 时间插件，选择中国时区
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

