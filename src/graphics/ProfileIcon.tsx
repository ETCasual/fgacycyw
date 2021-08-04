/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react'

function SvgComponent(
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 12.23 11.3"
			{...props}
		>
			<defs>
				<style>{`.prefix__cls-1{fill:${props.color}}`}</style>
			</defs>
			<g id="prefix__Layer_2" data-name="Layer 2">
				<g id="prefix__OBJECTS">
					<path
						className="prefix__cls-1"
						d="M8.89 6.49H3.34A3.35 3.35 0 000 9.83v1.11a.36.36 0 10.72 0V9.83a2.62 2.62 0 012.62-2.62h5.55a2.62 2.62 0 012.62 2.62v1.11a.36.36 0 00.72 0V9.83a3.34 3.34 0 00-3.34-3.34zM6.12 6.22A3.11 3.11 0 103 3.11a3.12 3.12 0 003.12 3.11zm0-5.5a2.39 2.39 0 11-2.39 2.39A2.39 2.39 0 016.12.72z"
					/>
				</g>
			</g>
		</svg>
	)
}

export default SvgComponent
