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
		<div>
			<h1>Hello World!</h1>
			<h2 className={styles['custom-header']}>{count}</h2>
			<button onClick={handleClick} className={styles.button}>Click me</button>
			<br />
			<Link to={'/about'}>about</Link>
			<br />
			<Link to={'/shop'}>shop</Link>
			<Outlet />
		</div>
	)
}