import type { Configuration } from "webpack-dev-server"
import { BuildMode, WebpackOptions } from "./types"

export function buildDevServer({ mode, port }: WebpackOptions): Configuration {
	return {
		port,
		historyApiFallback: true,
		open: mode === "development"
	}
}