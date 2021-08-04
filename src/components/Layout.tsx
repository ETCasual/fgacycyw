/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import HomeIcon from '../graphics/HomeIcon'
import ProfileIcon from '../graphics/ProfileIcon'
import SearchIcon from '../graphics/SearchIcon'

const categoriesPage = [
	{
		icon: (color: string) => (
			<HomeIcon color={color} className="h-full w-full py-2" />
		),
		pageName: 'home'
	},
	{
		icon: (color: string) => (
			<SearchIcon color={color} className="h-full w-full py-2" />
		),
		pageName: 'search'
	},
	{
		icon: (color: string) => (
			<ProfileIcon color={color} className="h-full w-full py-2" />
		),
		pageName: 'profile'
	}
]

type LayoutProps = {
	className?: string
	footer?: React.ReactNode
	currentPage?: string
}

export const Layout: React.FC<LayoutProps> = ({
	className = '',
	children,
	currentPage
}) => {
	const router = useRouter()
	const [isPage, setPage] = useState<string | null>(
		currentPage ? currentPage : null
	)
	return (
		<>
			<div
				className={`flex flex-col justify-center items-center relative ${className}`}
			>
				{children}
			</div>
			<div className="z-10 bg-white absolute flex flex-row h-14 lg:h-16 py-2 bottom-0 justify-evenly w-full border-t-2 border-gray-500">
				{categoriesPage.map((page, i) => (
					<div
						key={i}
						className={`rounded-xl w-[80px] sm:w-[90px] lg:w-[100px] h-full cursor-pointer ${
							isPage == page.pageName
								? 'bg-[#210440]'
								: 'bg-[#FFBA00]'
						}`}
						onClick={() => {
							setPage(page.pageName)
							router.push('/' + page.pageName)
						}}
					>
						{page.icon(
							isPage == page.pageName ? '#FFBA00' : '#210440'
						)}
					</div>
				))}
			</div>
		</>
	)
}
