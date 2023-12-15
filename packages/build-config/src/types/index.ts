export interface BuildPaths {
	entry: string
	output: string
	public: string
	src: string
}

type BuildMode = "development" | "production"//?

export interface WebpackOptions {
	mode: BuildMode
	port: number
	paths: BuildPaths
	analyzer: boolean
	skipTypeCheck: boolean
}