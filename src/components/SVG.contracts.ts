import React from 'react'

export interface SVGProps extends React.SVGProps<SVGSVGElement> {}
export interface SVGPropsFillStroke extends SVGProps {
	fill?: string
	stroke?: string
}
