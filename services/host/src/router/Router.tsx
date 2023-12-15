import { App } from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
import aboutRoutes from "about/Router"
import shopRoutes from "shop/Router"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			...aboutRoutes,
			...shopRoutes,
		]
	},
]);