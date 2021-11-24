/*
| Developed by Dirupt
| Filename : StartonCardActions.stories.tsx
| Description : Starton card story
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

import * as React from 'react'
import { Typography } from '@material-ui/core'
import { StartonCard } from './StartonCard'

/*
|--------------------------------------------------------------------------
| STORY CONFIG
|--------------------------------------------------------------------------
*/
export default { title: 'StartonCard' }

/*
|--------------------------------------------------------------------------
| PREVIEWS
|--------------------------------------------------------------------------
*/
export const classicCard: React.FC = () => (
	<StartonCard className="w-1/2 h-64 flex flex-row justify-center items-center">
		<Typography>Starton Card</Typography>
	</StartonCard>
)
