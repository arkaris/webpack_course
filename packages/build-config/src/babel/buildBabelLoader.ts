import { RuleSetRule } from "webpack";
import { WebpackOptions } from "../types";
import { removeDataTestId } from "./removeDataTestid/removeDataTestid";

export function buildBabeloader({ mode }: WebpackOptions): RuleSetRule["use"] {
	const isDev = mode === "development"

	const plugins = [];

	if (mode === "development") {
		plugins.push(require.resolve('react-refresh/babel'))
	}

	if (mode === "production") {
		plugins.push([removeDataTestId, { props: ['data-testid'] }])
	}

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
			plugins,
		}
	}
}