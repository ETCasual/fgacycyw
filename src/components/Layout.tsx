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
		icon: (color: string) => <HomeIcon color={color} className="py-2" />,
		pageName: 'home'
	},
	{
		icon: (color: string) => <SearchIcon color={color} className="py-2" />,
		pageName: 'search'
	},
	{
		icon: (color: string) => <ProfileIcon color={color} className="py-2" />,
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

	return (
		<div
			className={`w-full h-screen flex flex-col justify-between ${className}`}
		>
			<div className={`flex w-full flex-col items-center relative`}>
				{children}
			</div>
			{noFooter ? null : (
				<div className="z-10 bg-[#432fbf] sticky flex flex-row h-14 lg:h-16 py-2 bottom-0 justify-around w-full mt-10">
					{categoriesPage.map((page, i) => (
						<div
							key={i}
							className={`rounded-xl w-[80px] sm:w-[130px] h-full cursor-pointer flex flex-row justify-around ${
								isPage == page.pageName ? 'bg-[#5e4ecb]' : null
							}`}
							onClick={() => {
								setPage(page.pageName)
								router.push('/' + page.pageName)
							}}
						>
							{page.icon(
								isPage == page.pageName ? '#fff' : '#6659cd'
							)}
							{isPage == page.pageName ? (
								<p className="font-montserrat text-center self-center text-white hidden sm:inline-block">
									{page.pageName.toUpperCase()}
								</p>
							) : null}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
