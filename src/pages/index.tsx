import * as React from 'react'
import { Theme, Box, Paper, Grid, Typography, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Axios from 'axios'
import MachineButtons from '../components/Game/RoulettePage/MachineButtons'
import StartonCardWeb3Provider from 'components/Core/StartonCardWeb3Provider'
import RoulettePage from 'components/Game/RoulettePage'

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export interface IComponentProps {}

type StyleProps = Record<string, string>
type StyleClassKey = 'container' | 'cardSigning' | 'image' | 'pannelTitle' | 'gameContainer'

const useStyles = makeStyles<Theme, StyleProps, StyleClassKey>((theme) => ({
	container: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'nowrap',
	},
	gameContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardSigning: {
		display: 'flex',
		justifyContent: 'start',
		alignItems: 'center',
		[theme.breakpoints.down('lg')]: {
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
	image: {
		marginTop: '1em',
		[theme.breakpoints.up('md')]: {
			textAlign: 'center',
		},
	},
	pannelTitle: {
		[theme.breakpoints.down('xl')]: {
			fontSize: '2.3em',
		},
	},
}))

const HomePage: React.FC = () => {
	//const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
	//const { t } = useTranslation()

	const theme = useTheme()
	const classes = useStyles({} as StyleProps)
	const [verified, setVerified] = React.useState<boolean>(false)

	return (
		<React.Fragment>
			{verified && (
				<Paper className={classes.gameContainer}>
					<div>
						<head className={'center'}>
							<Typography variant="h6" align="center" gutterBottom>
								ROULETTE
							</Typography>
							<title>Slot Machine</title>
						</head>
						<body>
							<div id="slot">
								<div id="jackpot">
									<RoulettePage />
								</div>
								<div id="reels" style={{ display: 'flex', flexDirection: 'row' }}>
									<div className="reel" />
									<div className="reel" />
									<div className="reel" />
									<div className="reel" />
									<div className="reel" />
								</div>
								<MachineButtons />
							</div>
							<script
								crossOrigin="anonymous"
								src="https://polyfill.io/v3/polyfill.min.js?features=default%2CWebAnimations"
							></script>
						</body>
					</div>
				</Paper>
			)}
			{!verified && (
				<Paper className={classes.container}>
					<Grid container>
						<Box
							className={classes.image}
							component={Grid}
							item
							md={5}
							lg={5}
							xl={6}
							display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}
						>
							{theme.palette.type === 'dark' ? (
								<img
									style={{ display: 'inline-block' }}
									alt="logo Light"
									src="/images/logo-light-left-shadow.png"
									width={600}
								/>
							) : (
								<img
									style={{ display: 'inline-block' }}
									alt="logo Dark"
									src="/images/logo-mono-left-shadow.png"
									width={600}
								/>
							)}
							<Typography variant="h3" className={classes.pannelTitle}>
								Blockchain made simple
							</Typography>
						</Box>
						<Grid item className={classes.cardSigning} xs={12} sm={12} md={12} lg={7} xl={6}>
							<StartonCardWeb3Provider setVerified={setVerified} />
						</Grid>
					</Grid>
				</Paper>
			)}
		</React.Fragment>
	)
}

/*
|--------------------------------------------------------------------------
| GET STATIC PROPS GET SERVER
|--------------------------------------------------------------------------
*/

export default HomePage
