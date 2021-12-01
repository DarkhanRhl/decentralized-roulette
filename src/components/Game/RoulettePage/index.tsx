import React from 'react'
import Slot from '../../../js/Slot.js'
import Credits from './Credits'

class RoulettePage extends React.Component<any, any> {
	componentDidMount() {
		const config = {
			inverted: false,
		}
		const slot = new Slot(document.getElementById('slot'), config)
	}
	render() {
		return (
			<div>
				Jackpot: <span id="jp">42 000 000 MJTN</span>
				<Credits />
			</div>
		)
	}
}

export default RoulettePage
