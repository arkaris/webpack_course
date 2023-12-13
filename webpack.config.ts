import path from "path";
import { buildWebpack } from "./config/webpack/buildWabpack";
import { BuildMode } from "./config/webpack/types";

interface Env {
	mode?: BuildMode
	port?: number
	analyzer?: boolean
}

export default ({ mode, port, analyzer }: Env) => {
	return buildWebpack({
		mode: mode ?? "development",
		port: port ?? 3000,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			output: path.resolve(__dirname, 'build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			pages: path.resolve(__dirname, 'src', 'pages'),
			components: path.resolve(__dirname, 'src', 'components'),
			assets: path.resolve(__dirname, 'src', 'assets'),
		},
		analyzer: analyzer ?? false
	})
}