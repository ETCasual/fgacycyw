/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import {
	Card,
	InstagramVideo,
	Layout,
	Loader,
	ProfileUpdate
} from '../components'

import Head from 'next/head'

export type HomeProps = {
	user?: Notion.User
	userToken?: string
	error?: boolean
}

const cards = [
	{
		image: '/assets/worshipnightPoster.png',
		name: '',
		to: '/worshipnight',
		textColor: '#FFF',
		hoverTextColor: '#FFBA00'
	},
	{
		image: '/assets/warriorConfBannerSmall.jpg',
		name: '',
		to: '/warriorConference',
		textColor: '#000',
		hoverTextColor: '#210440'
	}
]

const greetings = [
	'Hello',
	'Hi',
	'Yo',
	'Hey',
	'Hola',
	'こんにちは',
	'Bonjour',
	'Salut',
	'你好'
]

const Home: NextPage<HomeProps> = ({ user, userToken }) => {
	const [mounted, setMounted] = useState<boolean>(false)
	const [failed, setFailed] = useState<boolean>(true)

	const [word, setWord] = useState<string>('Hello')

	useEffect(() => {
		setTimeout(() => {
			setMounted(true)
		}, 2000)

		setInterval(() => {
			setWord(
				greetings[Math.round(Math.random() * (greetings.length - 1))]
			)
		}, 700)
	}, [])

	if (!mounted) return <Loader />

	return (
		<>
			<Head>
				<title>Home | FGACYCYW KL</title>
			</Head>
			<Layout currentPage="home" user={user} noFooter hscreen={false}>
				<ProfileUpdate user={user} />
				<div className="flex flex-col w-full h-[180px] bg-smoothPink justify-center">
					{failed ? (
						<p className="text-PRIMARY font-chi font-bold text-5xl text-center w-full -mt-7">
							{word}!
						</p>
					) : (
						<>
							<p className="text-PRIMARY font-bebas text-4xl text-center w-full my-5">
								Today&apos;s Special!
							</p>
							<InstagramVideo />
						</>
					)}
				</div>
				<div
					className="bg-white rounded-t-3xl w-full flex flex-col p-10 -mt-7 overflow-y-scroll bottomBarHeight scrollbar-none"
					style={{
						boxShadow: '0px -4px 20px rgba(50, 50, 50, 0.2)',
						WebkitBoxShadow: '0px -4px 20px rgba(50, 50, 50, 0.2)',
						MozBoxShadow: '0px -4px 20px rgba(50, 50, 50, 0.2)'
					}}
				>
					<div className="flex flex-col gap-10">
						{cards.map((card, i) => (
							<Card
								key={i}
								to={card.to}
								image={card.image}
								textColor={card.textColor}
								hoverTextColor={card.hoverTextColor}
								name={card.name}
							/>
						))}
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Home
