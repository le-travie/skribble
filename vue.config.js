module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        port: 3454,
        proxy: {
            "^/api": {
                target: "http://localhost:8080/api/v1",
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: { "^/api": "/" },
            },
        },
    },
};
