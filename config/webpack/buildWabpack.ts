import { Configuration } from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from "./buildPlugins";
import { WebpackOptions } from "./types";

export function buildWebpack(options: WebpackOptions): Configuration {
	const { mode, paths: { entry, output } } = options
	const isDev = mode === "development"

	const config: Configuration = {
		mode: mode,
		entry: entry,
		output: {
			path: output,
			filename: '[name].[contenthash].js',
			clean: true
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		devtool: isDev && "inline-source-map",
		devServer: isDev ? buildDevServer(options) : undefined
	}
	return config
}