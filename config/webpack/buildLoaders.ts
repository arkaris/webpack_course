import { ModuleOptions, RuleSetRule } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { WebpackOptions } from "./types";

export function buildLoaders({ mode, skipTypeCheck }: WebpackOptions): ModuleOptions['rules'] {
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
		use: {
			loader: 'ts-loader',
			options: {
				getCustomTransformers: () => ({
					before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
				}),
				transpileOnly: skipTypeCheck
			}
		},
		exclude: /node_modules/,
	}

	const babelLoader: RuleSetRule = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					["@babel/preset-react", {
						runtime: isDev ? 'automatic' : 'classic'
					}]
				]
			}
		}
	}

	const assetLoader: RuleSetRule = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}

	const svgLoader: RuleSetRule = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: {
			loader: '@svgr/webpack',
			options: {
				icon: true,
				svgoConfig: {
					plugins: [
						{
							name: 'convertColors',
							params: {
								currentColor: true
							}
						}
					]
				}
			}
		}
	}

	return [
		cssLoader,
		// tsLoader,
		babelLoader,
		assetLoader,
		svgLoader
	]
}