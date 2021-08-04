/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'

function SvgComponent(
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 14.16 12.32"
			{...props}
		>
			<path
				d="M13.45 12.32h-3.9a.71.71 0 01-.71-.71v-3.4a1.76 1.76 0 10-3.52 0v3.4a.71.71 0 01-.71.71H.71a.71.71 0 01-.71-.71V6a1.13 1.13 0 01.42-.88L6.53.19a.9.9 0 011.1 0l6.11 4.93a1.13 1.13 0 01.42.88v5.61a.71.71 0 01-.71.71zm-3.88-.72h3.86V6a.41.41 0 00-.15-.32L7.18.76a.15.15 0 00-.2 0L.88 5.68A.42.42 0 00.72 6v5.6h3.87V8.21a2.49 2.49 0 115 0z"
				fill={props.color}
				data-name="Layer 2"
			/>
		</svg>
	)
}

export default SvgComponent
