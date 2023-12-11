import { useCallback, useState } from "react"
import './App.css'

interface Props { }

export const App = (props: Props) => {
	const [count, setCount] = useState<number>(0)

	const handleClick = useCallback(
		() => {
			setCount(count + 1)
		},
		[count],
	)


	return (
		<div>
			<h1>Hello World!</h1>
			<h2>{count}</h2>
			<button onClick={handleClick}>Click me</button>
		</div>
	)
}