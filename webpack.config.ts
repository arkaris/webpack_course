import path from "path"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from "webpack"
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"

type Mode = "production" | "development";

interface Env {
	mode?: Mode,
	port?: number
}

export default ({ mode = "development", port = 3000 }: Env) => {
	const isDev = mode === "development"
	const isProd = mode === "production"

	const devServer: DevServerConfiguration = {
		port,
		open: true
	}

	const config: Configuration = {
		mode,
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
			isProd && new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css'
			})
		].filter(Boolean),
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
					exclude: /node_modules/,
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		devtool: isDev && "inline-source-map",
		devServer: isDev ? devServer : undefined
	}
	return config
}