import React from 'react'
import { NextPage } from 'next'
import { Card, Layout, MyCarousel } from '../components'

const texts = [
	{ text: 'YWKL Conference', textColor: '#210440', bgColor: '#FFBA00' },
	{ text: '6 Hours with God', textColor: '#FFBA00', bgColor: '#210440' }
]

const eventCards = ['/assets/upcoming.png', '/assets/6hrswithGod.jpg']

export type UpcomingProps = {
	user?: Notion.User
	userToken?: string
	error?: boolean
}

const Upcoming: NextPage<UpcomingProps> = ({ user, userToken }) => {
	return (
		<Layout currentPage="home">
			<div className="h-32 lg:h-52">
				<MyCarousel texts={texts} heightClass="h-32 lg:h-52" />
			</div>
			<div className="w-full px-3 sm:px-20 ">
				<p className="font-montserrat text-[#210440] text-5xl my-5 font-bold">
					Upcoming Events
				</p>
			</div>

			<div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 sm:px-20 items-center justify-center w-full h-full">
				{eventCards.map((card, i) => (
					<Card key={i} image={card} />
				))}
			</div>
		</Layout>
	)
}

export default Upcoming
