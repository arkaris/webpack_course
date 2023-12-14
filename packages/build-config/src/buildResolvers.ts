import { Configuration } from "webpack";
import { WebpackOptions } from "./types";

export function buildResolvers({ paths: { pages, components } }: WebpackOptions): Configuration['resolve'] {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@pages': pages,
			'@components': components
		}
	}
}