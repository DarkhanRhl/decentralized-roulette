import Axios from 'axios'
import Reel from './Reel.js'
import Symbol from './Symbol.js'

export default class Slot {
	constructor(domElement, config = {}) {
		Symbol.preload()

		this.currentSymbols = [
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
		]

		this.nextSymbols = [
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
			['death_star', 'death_star', 'death_star'],
		]

		this.container = domElement

		this.reels = Array.from(this.container.getElementsByClassName('reel')).map(
			(reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]),
		)

		this.spinButton = document.getElementById('spin')
		this.spinButton.addEventListener('click', () => this.spin())

		if (config.inverted) {
			this.container.classList.add('inverted')
		}
	}

	spin() {
		this.onSpinStart()

		this.currentSymbols = this.nextSymbols

		this.nextSymbols = [
			[Symbol.random(), Symbol.random(), Symbol.random()],
			[Symbol.random(), Symbol.random(), Symbol.random()],
			[Symbol.random(), Symbol.random(), Symbol.random()],
			[Symbol.random(), Symbol.random(), Symbol.random()],
			[Symbol.random(), Symbol.random(), Symbol.random()],
		]

		if (this.nextSymbols[0][0] === 'at_at')
			this.nextSymbols = [
				[Symbol.random(), 'darth_vader', Symbol.random()],
				[Symbol.random(), 'darth_vader', Symbol.random()],
				[Symbol.random(), 'darth_vader', Symbol.random()],
				[Symbol.random(), 'darth_vader', Symbol.random()],
				[Symbol.random(), 'darth_vader', Symbol.random()],
			]

		return Promise.all(
			this.reels.map((reel) => {
				reel.renderSymbols(this.nextSymbols[reel.idx])
				return reel.spin()
			}),
		).then(() => this.onSpinEnd())
	}

	onSpinStart() {
		this.spinButton.disabled = true
		console.log('SPIN START')
	}

	async onWin() {
		alert('Congratulation ! You won the 42 000 000 MJTN Jackpot. Check your wallet in few minutes...')
		await Axios.post('http://localhost:3000/credit', { amount: 42000000 })
			.then((res) => {
				console.log('return of the won : ', res)
			})
			.catch((e) => {
				console.log('error : ', e)
			})
	}

	onSpinEnd() {
		if (
			this.nextSymbols[0][0] === this.nextSymbols[1][0] &&
			this.nextSymbols[1][0] === this.nextSymbols[2][0] &&
			this.nextSymbols[2][0] === this.nextSymbols[3][0] &&
			this.nextSymbols[3][0] === this.nextSymbols[4][0]
		)
			this.onWin()
		if (
			this.nextSymbols[0][1] === this.nextSymbols[1][1] &&
			this.nextSymbols[1][1] === this.nextSymbols[2][1] &&
			this.nextSymbols[2][1] === this.nextSymbols[3][1] &&
			this.nextSymbols[3][1] === this.nextSymbols[4][1]
		)
			this.onWin()

		if (
			this.nextSymbols[0][4] === this.nextSymbols[1][2] &&
			this.nextSymbols[1][2] === this.nextSymbols[2][2] &&
			this.nextSymbols[2][2] === this.nextSymbols[3][2] &&
			this.nextSymbols[3][2] === this.nextSymbols[4][2]
		)
			this.onWin()

		this.spinButton.disabled = false
	}
}
