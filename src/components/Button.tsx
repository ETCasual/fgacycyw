/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'

interface ButtonProps {
	className?: string
	onClick?: React.MouseEventHandler
}

export const Button: React.FC<ButtonProps> = (
	props,
	{ className = '', onClick }
) => {
	return (
		<div
			onClick={onClick}
			className={`${className} rounded-[4px] bg-[#FFBA00]`}
		>
			<p className="text-[#210440] font-bebas text-base py-2 text-center">
				{props.children}
			</p>
		</div>
	)
}
