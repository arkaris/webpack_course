import { App } from "@/components/App";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { LazyShop_2 } from "@/pages/shop_2/Shop_2.lazy";
import { Suspense } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
	{
		path: "/shop",
		element: <App />,
		children: [
			{
				path: '/shop/page_1',
				element: <Suspense fallback={'Loading...'} > <LazyShop /></Suspense >
			},
			{
				path: '/shop/page_2',
				element: <Suspense fallback={'Loading...'} > <LazyShop_2 /></Suspense >
			},
		]
	},
]

export const router = createBrowserRouter(routes);

export default routes