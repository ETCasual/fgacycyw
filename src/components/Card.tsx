/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useRouter } from 'next/router'

type CardProps = {
	image: string
	to?: string
	name?: string
	home?: boolean
}
export const Card: React.FC<CardProps> = ({ image, to, name, home }) => {
	const router = useRouter()
	return (
		<div
			className="w-full h-[200px] lg:h-[300px] cursor-pointer rounded-none sm:rounded-md bg-center bg-cover relative z-[1] bg-no-repeat"
			onClick={() => {
				to ? router.push(to) : null
			}}
			style={{ backgroundImage: `url('${image}')` }}
		>
			{home ? (
				<div
					className="w-full h-full absolute z-[2] rounded-xl"
					style={{
						backgroundImage:
							'linear-gradient(to bottom, rgba(0, 0, 0, 0), #FDB095 85%, #E5958E)'
					}}
				/>
			) : null}
			{name ? (
				<p className="absolute z-[3] left-10 bottom-5 font-montserrat font-semibold text-white text-lg">
					{name}
				</p>
			) : null}
		</div>
	)
}
