import PageComponents from '../components/PageComponents'
import board from '../assets/icons/board.svg'
import Board from '../components/Board'

export default function TaskBoard() {
	return (
		<>
			<PageComponents name={'Tablero'} icon={board}>
				<Board />
			</PageComponents>
		</>
	)
}
