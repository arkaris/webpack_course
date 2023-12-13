import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackOptions } from "./types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export function buildPlugins({ mode, paths: { html }, analyzer, skipTypeCheck }: WebpackOptions): Configuration["plugins"] {
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({ template: html }),
		new DefinePlugin({
			__BUILD_MODE__: JSON.stringify(mode),
		})
	]

	if (!skipTypeCheck) {
		plugins.push(new ForkTsCheckerWebpackPlugin())
	}

	if (mode === "development") {
		plugins.push(new ReactRefreshWebpackPlugin())
	}

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