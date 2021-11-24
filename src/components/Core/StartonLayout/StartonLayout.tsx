/*
| Developed by Dirupt
| Filename : StartonLayout.tsx
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

import * as React from 'react'
import { AppProps } from 'next/app'
import { Container, Theme, Paper } from '@material-ui/core'
//import { NAV_HEIGHT, NAV_MARGIN } from 'components/Core/StartonNav/StartonNav'
//import { FOOTER_HEIGHT, FOOTER_MARGIN } from 'components/Core/StartonFooter/StartonFooter'
import { StartonNavBar } from 'components/Core'
//import { NAVBAR_HEIGHT } from 'components/Core/StartonNavBar/StartonNavBar'
import { makeStyles } from '@material-ui/styles'

/*
|--------------------------------------------------------------------------
| CONTRACTS
|--------------------------------------------------------------------------
*/

type StyleProps = Record<string, string>
type StyleClassKey = 'container' | 'paper' | 'componentContainer'
type PropClasses = Record<StyleClassKey, string>

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/
const useStyles = makeStyles<Theme, StyleProps, StyleClassKey>(() => ({
	container: {
		/*flexDirection: 'column',
		justifyContent: 'space-between',*/
		paddingLeft: 0,
		paddingRight: 0,
		maxWidth: '100%',
		/*[theme.breakpoints.down('sm')]: {
			paddingLeft: 0,
			paddingRight: 0,
		},*/
	},
	componentContainer: {
		position: 'relative',
		//minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
		minHeight: `100vh`,
	},
	paper: {
		paddingLeft: 0,
		paddingRight: 0,
		minHeight: '100vh',
		maxWidth: '100vw',
	},
}))

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/
const StartonLayout: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	const classes: PropClasses = useStyles({} as StyleProps)
	//const router = useRouter()
	/* const isAuthPage = React.useMemo<boolean>(() => {
		return ['/login', '/register', '/forgot-password', '/reset-password', '/waiting-confirmation'].includes(
			router.pathname,
		)
	}, [router.pathname]) */

	/*return !isAuthPage ? (
		<Container maxWidth="xl" className={classes.container}>
			<StartonNav />
				<Box className={classes.componentContainer}>
					<Component key={router.pathname} {...pageProps} />
				</Box>
			<StartonFooter />
		</Container>
	) : (
		<Component {...pageProps} />
	)*/
	return (
		<Container className={classes.container}>
			<StartonNavBar />
			<Paper className={classes.paper}>
				<Component {...pageProps} />
			</Paper>
		</Container>
	)
}

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/
export { StartonLayout }
