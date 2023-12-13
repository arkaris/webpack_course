import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackOptions } from "./types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins({ mode, paths: { html }, analyzer }: WebpackOptions): Configuration["plugins"] {
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({ template: html }),
		new DefinePlugin({
			__BUILD_MODE__: JSON.stringify(mode),
		})
	]

	if (mode === "production") {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}))
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	return plugins
}