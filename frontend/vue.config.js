module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: true,
    proxy: {
      "/api": {
        target: "http://j5a603.p.ssafy.io:8080/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
