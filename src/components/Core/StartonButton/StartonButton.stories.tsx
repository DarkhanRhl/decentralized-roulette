/*
| Developed by Dirupt
| Filename : StartonButton.stories.tsx
| Description : Starton button story
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

import * as React from 'react'
import { StartonButton } from './StartonButton'

/*
|--------------------------------------------------------------------------
| STORY CONFIG
|--------------------------------------------------------------------------
*/
export default {
	title: 'StartonButton',
}

/*
|--------------------------------------------------------------------------
| PREVIEWS
|--------------------------------------------------------------------------
*/
export const defaultButton: React.FC = () => <StartonButton color="primary">Welcome</StartonButton>
export const whiteButton: React.FC = () => (
	<div style={{ backgroundColor: '#0A192B', width: '100%', height: '100vh', padding: 25 }}>
		<StartonButton color="default">White button bro !</StartonButton>
	</div>
)
