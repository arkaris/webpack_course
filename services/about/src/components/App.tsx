import { useCallback, useState } from "react"
import styles from './App.module.css'
import { Link, Outlet } from "react-router-dom"

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
		<div data-testid="App">
			<h1>About module</h1>
			<h2 className={styles['custom-header']}>{count}</h2>
			<button onClick={handleClick} className={styles.button}>Click me</button>
			<ul>
				<li><Link to="/about">./</Link></li>
				<li><Link to="/about/page">page</Link></li>
			</ul>
			<Outlet />
		</div>
	)
}