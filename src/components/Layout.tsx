/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import React, { createRef, useState } from 'react'
import { BiChurch } from 'react-icons/bi'
import { FaChurch } from 'react-icons/fa'
import { BsFillPersonFill, BsPerson } from 'react-icons/bs'

import useEventListener from '../utils/hooks/useEventListener'

const categoriesPage = [
	{
		icon: (active: boolean) =>
			active ? (
				<FaChurch color="#210440" className="w-12 h-12" />
			) : (
				<BiChurch color="#210440" className="w-12 h-12" />
			),
		pageName: 'home'
	},
	// {
	// 	icon: (color: string) => <SearchIcon color={color} className="py-2" />,
	// 	pageName: 'search'
	// },
	{
		icon: (active: boolean) =>
			active ? (
				<BsFillPersonFill color="#210440" className="w-12 h-12" />
			) : (
				<BsPerson color="#210440" className="w-12 h-12" />
			),
		pageName: 'profile'
	}
]

type LayoutProps = {
	className?: string
	footer?: React.ReactNode
	currentPage?: string
	noFooter?: boolean
}

export const Layout: React.FC<LayoutProps> = ({
	className = '',
	children,
	currentPage,
	noFooter
}) => {
	const router = useRouter()
	const [isPage, setPage] = useState<string | null>(
		currentPage ? currentPage : null
	)

	const scrollElem = createRef<HTMLDivElement>()

	useEventListener(
		'touchstart',
		(e: Event) => {
			if (scrollElem.current!.scrollTop === 0) {
				scrollElem.current!.scrollTop += 1
			} else if (
				scrollElem.current!.scrollTop +
					scrollElem.current!.offsetHeight >=
				scrollElem.current!.scrollHeight
			) {
				scrollElem.current!.scrollTop -= 1
			}
		},
		scrollElem
	)

	return (
		<div className="mainwrapper" ref={scrollElem}>
			<div
				className={`w-full h-screen flex flex-col justify-between ${className}`}
			>
				<div className={`flex w-full flex-col items-center relative`}>
					{children}
				</div>
				{noFooter ? null : (
					<div className="z-10 bg-[#fff] sticky flex flex-row h-14 lg:h-16 py-2 bottom-0 justify-around w-full mt-10 border-[#210440] border-t-[2px]">
						{categoriesPage.map((page, i) => (
							<div
								key={i}
								className={` h-full cursor-pointer`}
								onClick={() => {
									setPage(page.pageName)
									router.push('/' + page.pageName)
								}}
							>
								{page.icon(
									isPage == page.pageName ? true : false
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
