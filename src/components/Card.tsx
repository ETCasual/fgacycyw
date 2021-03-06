/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useRouter } from 'next/router'

type CardProps = {
	image: string
	to?: string
	name?: string
	home?: boolean
	className?: string
	textColor?: string
	hoverTextColor?: string
}
export const Card: React.FC<CardProps> = ({
	image,
	to,
	name,
	home,
	textColor = '#000',
	hoverTextColor = '#210440',
	className = ''
}) => {
	const router = useRouter()
	return (
		<div
			className={`w-full h-[100px] sm:h-[150px] group transform transition ease-in-out duration-300 hover:scale-[1.025] mb-2 cursor-pointer rounded-none sm:rounded-md bg-center bg-cover sm:bg-cover relative z-[1] bg-no-repeat ${className}`}
			onClick={() => {
				to ? router.push(to) : null
			}}
			style={{ backgroundImage: `url('${image}')` }}
		>
			{home ? (
				<div
					className="w-full h-full group absolute z-[2] rounded-xl"
					style={{
						backgroundImage:
							'linear-gradient(to bottom, rgba(0, 0, 0, 0), #FDB095 85%, #E5958E)'
					}}
				/>
			) : null}
			{name ? (
				<p
					className={`absolute group group-hover:text-[${hoverTextColor}] transition ease-in-out duration-300 z-[3] left-4 bottom-3 font-montserrat font-semibold text-[${textColor}] text-lg`}
				>
					{name}
				</p>
			) : null}
		</div>
	)
}
