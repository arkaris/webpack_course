import path from "path";
import { buildWebpack } from "./config/webpack/buildWabpack";
import { BuildMode } from "./config/webpack/types";

interface Env {
	mode?: BuildMode,
	port?: number
}

export default ({ mode, port }: Env) => {
	return buildWebpack({
		mode: mode ?? "development",
		port: port ?? 3000,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			output: path.resolve(__dirname, 'build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
		}
	})
}