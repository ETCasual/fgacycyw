/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'

const SvgComponent = (
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 11.2 11.2"
			{...props}
		>
			<path
				d="M11.1 10.59L8.82 8.31a5.12 5.12 0 10-.52.51l2.28 2.28a.37.37 0 00.52 0 .36.36 0 000-.51zM2 8.06a4.3 4.3 0 113 1.26 4.3 4.3 0 01-3-1.26z"
				fill={props.color}
				data-name="Layer 2"
			/>
		</svg>
	)
}

export default SvgComponent
