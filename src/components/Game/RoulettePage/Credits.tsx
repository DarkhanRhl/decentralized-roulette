import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Axios from 'axios'

const Credits = () => {
	const [open, setOpen] = React.useState(false)
	const [amount, setAmount] = React.useState(0)

	const handleClose = () => {
		setOpen(false)
	}

	const setChange = (event: any) => {
		setAmount(event.target.value)
	}

	const handleBuy = async (amount: any) => {
		if (amount <= 0) return
		await Axios.post('http://localhost:3000/deposit', { amount: amount })
			.then((res) => {
				console.log('res : ', res)
				// res.code === 200 ? setCredit(amount) : 0
			})
			.catch((e) => {
				console.log('error : ', e)
			})
		setOpen(false)
	}

	const getData = async () => {
		await Axios.get('http://localhost:3000/wallet')
			.then((res) => {
				console.log('res : ', res)
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
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Buy MJTN (Machine Jettons)</DialogTitle>
				<DialogContent>
					<DialogContentText>
						1 Credit equals 1 MJTN ($2). 1 Credit enable you to spin the wheel and try to won the Jackpot.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						inputProps={amount}
						value={amount}
						onChange={setChange}
						label="Amount"
						type="number"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={() => {
							handleBuy(amount)
						}}
					>
						Buy
					</Button>
				</DialogActions>
			</Dialog>
			<Button
				onClick={() => {
					setOpen(true)
				}}
			>
				Buy Credit with MJTN
			</Button>
		</div>
	)
}

export default Credits
