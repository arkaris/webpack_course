import { WebpackOptions } from "../types";

export function buildBabeloader({ mode }: WebpackOptions) {
	const isDev = mode === "development"

	return {
		loader: "babel-loader",
		options: {
			presets: [
				'@babel/preset-env',
				'@babel/preset-typescript',
				["@babel/preset-react", {
					runtime: isDev ? 'automatic' : 'classic',
				}]
			],
			plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
		}
	}
}