import React from 'react'
import Axios from 'axios'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const MachineButtons = () => {
	const [balance, setBalance] = React.useState<number>(0)

	const getData = async () => {
		await Axios.get('http://localhost:3000/wallet')
			.then((res) => {
				console.log('res : ', res)
				setBalance(res.data)
			})
			.catch((e) => {
				console.log('error : ', e)
			})
	}

	const spin = async () => {
		await Axios.get('http://localhost:3000/spin')
			.then((res) => {
				console.log('res : ', res)
				getData()
			})
			.catch((e) => {
				console.log('error : ', e)
			})
	}

	React.useEffect(() => {
		getData()
	}, [])

	return (
		<div>
			<div id="controls" style={{ alignItems: 'center' }}>
				<Button
					type="button"
					id="spin"
					disabled={balance <= 0}
					onClick={() => {
						spin()
					}}
				>
					Spin for 1 Credit
				</Button>
				<div>Credit: {balance}</div>
			</div>
		</div>
	)
}

export default MachineButtons
