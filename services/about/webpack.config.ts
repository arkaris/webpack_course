import { WebpackOptions, buildWebpack } from "@packages/build-config";
import path from "path";
import webpack from "webpack";
import packageJson from "./package.json"

interface Env {
	mode?: WebpackOptions["mode"]
	port?: number
	analyzer?: boolean
	skip_type_check?: boolean
}

export default ({ mode, port, analyzer, skip_type_check }: Env) => {
	const config = buildWebpack({
		mode: mode ?? "development",
		port: port ?? 3001,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			output: path.resolve(__dirname, 'build'),
			public: path.resolve(__dirname, 'public'),
			src: path.resolve(__dirname, 'src'),
		},
		analyzer: analyzer ?? false,
		skipTypeCheck: skip_type_check ?? false
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'about',
		filename: 'remoteEntry.js',
		exposes: {
			'./Router': './src/router/Router.tsx',
		},
		shared: {
			...packageJson.dependencies,
			'react': {
				eager: true,
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			},
		}
	}))

	return config
}