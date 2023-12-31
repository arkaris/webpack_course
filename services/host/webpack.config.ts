import { WebpackOptions, buildWebpack } from "@packages/build-config";
import path from "path";
import webpack from "webpack";
import packageJson from "./package.json"

interface Env {
	mode?: WebpackOptions["mode"]
	port?: number
	analyzer?: boolean
	skip_type_check?: boolean
	ABOUT_REMOTE_URL?: string
	SHOP_REMOTE_URL?: string
}

export default ({ mode, port, analyzer, skip_type_check, ABOUT_REMOTE_URL = 'http://localhost:3001', SHOP_REMOTE_URL = 'http://localhost:3002' }: Env) => {
	const config = buildWebpack({
		mode: mode ?? "development",
		port: port ?? 3000,
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
		name: 'host',
		filename: 'remoteEntry.js',
		remotes: {
			about: `about@${ABOUT_REMOTE_URL}/remoteEntry.js`,
			shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
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