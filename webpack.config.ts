import path from "path";
import { buildWebpack } from "./config/webpack/buildWabpack";
import { WebpackOptions } from "./config/webpack/types";

interface Env {
	mode?: WebpackOptions["mode"]
	port?: number
	analyzer?: boolean
	skip_type_check?: boolean
}

export default ({ mode, port, analyzer, skip_type_check }: Env) => {
	return buildWebpack({
		mode: mode ?? "development",
		port: port ?? 3000,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			output: path.resolve(__dirname, 'build'),
			public: path.resolve(__dirname, 'public'),
			pages: path.resolve(__dirname, 'src', 'pages'),
			components: path.resolve(__dirname, 'src', 'components'),
			assets: path.resolve(__dirname, 'src', 'assets'),
		},
		analyzer: analyzer ?? false,
		skipTypeCheck: skip_type_check ?? false
	})
}