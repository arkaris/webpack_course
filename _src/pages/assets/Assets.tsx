import jpg from "@assets/jpg.jpg"
import png from "@assets/png.png"
import Kitty from "@assets/kitty.svg"

interface Props { }
const Assets = ({ }: Props) => {
	return (
		<div>
			<img width={100} src={jpg} />
			<img width={100} src={png} />
			<Kitty width={100} height={100} color={'red'} />
		</div>
	)
}
export default Assets