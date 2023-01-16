const path = require("path");

module.exports = {
    entry: "/src/render-cube.js",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 3000,
        static: path.join(__dirname, "src"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    "options": {
                        "presets": [ "@babel/preset-env", ]
                    }
                },
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         "style-loader",
            //         "css-loader", // for styles
            //     ],
            // },
        ],
    },
    resolve: {
        extensions: [".js"],
    },
};
