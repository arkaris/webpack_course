import { ModuleOptions, RuleSetRule } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackOptions } from "./types";

export function buildLoaders({ mode }: WebpackOptions): ModuleOptions['rules'] {
	const isDev = mode === "development"

	const cssLoader: RuleSetRule = {
		test: /\.module\.css$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					importLoaders: 1,
					sourceMap: isDev,
					modules: {
						localIdentName: isDev ? "[name]__[local]" : "[hash:base64:8]",
					},
				},
			},
			{
				loader: "postcss-loader",
				options: {
					sourceMap: isDev
				},
			},
		],
		exclude: /node_modules/,
	}

	const tsLoader: RuleSetRule = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	return [cssLoader, tsLoader]
}