import { Configuration } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackOptions } from "./types";

export function buildPlugins({ mode, paths: { html } }: WebpackOptions): Configuration["plugins"] {
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({ template: html }),
	]

	if (mode === "production") {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}))
	}

	return plugins
}