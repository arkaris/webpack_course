import { Configuration } from "webpack";
import { WebpackOptions } from "./types";
import path from "path";

export function buildResolvers({ paths: { src } }: WebpackOptions): Configuration['resolve'] {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': src,
		}
	}
}