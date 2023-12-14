declare module "*.jpg" {
	const path: string;
	export default path;
}

declare module "*.png" {
	const path: string;
	export default path;
}

declare module "*.svg" {
	import React from "react";
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}