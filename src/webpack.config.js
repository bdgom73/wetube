const path = require("path");

const MiniExtractCSS = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "static");

const config = {
    entry: ["@babel/polyfill",ENTRY_FILE],
    mode: MODE,
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.js&/,
                use:[
                    {
                        loader:"babel-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                {
                    loader: MiniExtractCSS.loader
                    
                },
                {
                    loader:"css-loader" 
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions:{
                            plugins() {
                                return [autoprefixer({overrideBrowserslist: "cover 99.5%"})];
                            }
                        }  
                    }
                },
                { loader: "sass-loader"
                }
                ],
            },
        ],
    },
        output: {
            path: OUTPUT_DIR,
            filename: "[name].js",
        },
        plugins: [
            new MiniExtractCSS({
                filename: "styles.css",
            }),
        ],
    };

    module.exports = config;
   