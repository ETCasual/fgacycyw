import React, { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HomeIcon from '../graphics/HomeIcon'
import ProfileIcon from '../graphics/ProfileIcon'
import SearchIcon from '../graphics/SearchIcon'

type MobileNavContainerProps = {
	children: React.ReactNode
	className?: string
}

const MobileNavContainer = forwardRef<HTMLDivElement, MobileNavContainerProps>(
	({ className, children }, ref) => (
		<div className={`${className}`} ref={ref}>
			{children}
		</div>
	)
)
MobileNavContainer.displayName = 'MobileNavContainer'

type MobileNavItemProps = {
	targetPath: string
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
	children,
	targetPath
}) => {
	const router = useRouter()
	const isActive = router ? router.asPath.includes(targetPath) : false

	return (
		<Link href={targetPath}>
			<div className="flex cursor-pointer">
				{children &&
					React.Children.map(children, (child) => {
						return React.cloneElement(child as React.ReactElement, {
							className: isActive
								? 'bg-[#FFBA00]'
								: 'bg-[#210440]'
						})
					})}
			</div>
		</Link>
	)
}

export type MobileNavProps = {
	items?: { targetPath: string; icon: JSX.Element }[]
}

export const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
	return (
		<>
			<MobileNavContainer>
				{(
					items as {
						targetPath: string
						icon: JSX.Element
					}[]
				).map((item) => (
					<MobileNavItem
						key={item.targetPath}
						targetPath={item.targetPath}
					>
						{item.icon}
					</MobileNavItem>
				))}
			</MobileNavContainer>
		</>
	)
}
MobileNav.defaultProps = {
	items: [
		{ targetPath: '/home', icon: <HomeIcon /> },
		{ targetPath: '/search', icon: <SearchIcon /> },
		{ targetPath: '/profile', icon: <ProfileIcon /> }
	]
}
