import PageComponents from '../components/PageComponents'
import labels from '../assets/icons/labels.svg'
import Board from '../components/Board'

export default function TaskBoard() {
	return (
		<>
			<PageComponents name={'Tablero'} icon={labels}>
				<Board />
			</PageComponents>
		</>
	)
}
