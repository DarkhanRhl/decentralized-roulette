/*
| Developed by Dirupt
| Filename : StartonCardActions.tsx
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

import * as React from 'react'
import { Card, CardProps, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

/*
|--------------------------------------------------------------------------
| CONTRACTS
|--------------------------------------------------------------------------
*/
export interface IStartonCardProps extends CardProps {
	children: React.ReactNode
}
type StyleProps = CardProps
type StyleClassKey = 'cardContainer'
type PropClasses = Record<StyleClassKey, string>

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/
const useStyles = makeStyles<Theme, StyleProps, StyleClassKey>((theme) => ({
	cardContainer: {
		// background: '#FFFFFF 0% 0% no-repeat padding-box',
		background: `${theme.palette.background.card} no-repeat padding-box`,
		boxShadow: '0px 24px 99px #0083BC1A',
		borderRadius: 20,
		minWidth: 250,
		minHeight: 50,
		overflow: 'initial',
	},
}))

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/
// eslint-disable-next-line react/display-name
const StartonCard: React.FC<IStartonCardProps> = React.forwardRef((props: IStartonCardProps, remoteRef) => {
	const classes: PropClasses = useStyles({} as StyleProps)
	const { children, ...restProps } = props
	return (
		<Card {...restProps} classes={{ root: classes.cardContainer }} ref={remoteRef}>
			{children}
		</Card>
	)
})

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/
export { StartonCard }
