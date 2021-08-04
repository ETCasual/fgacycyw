/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NextPage } from 'next'
import React, { useState } from 'react'
import { Card, Layout } from '../components'

import { FaInstagram, FaYoutube } from 'react-icons/fa'
import router from 'next/router'
import Head from 'next/head'

const cards = [
	{
		image: '/assets/upcoming.png',
		name: 'Upcoming Events',
		to: '/upcoming'
	},
	{
		image: '/assets/testimonies.png',
		name: 'Testimonies',
		to: '/testimonies'
	}
]

export const user = {
	username: 'ET',
	role: 'user'
}

const Home: NextPage = () => {
	const [aboutUs, setAboutUs] = useState<boolean>(false)

	return (
		<>
			<Head>
				<title>Home | FGACYCYW KL</title>
			</Head>
			<Layout currentPage="home">
				<div className="w-full px-10 sm:px-20 ">
					<p className="font-montserrat text-[#210440] text-5xl font-bold mt-10 mb-5">
						Hello, {user.username}
					</p>
				</div>
				<div className="w-full h-full flex flex-col px-10 sm:px-20">
					<p className="text-xl my-3 font-montserrat text-[#210440] font-semibold">
						Welcome Home!
					</p>
					<div className="flex flex-row w-[150px] justify-between">
						<p
							className={`font-century text-[#210440]  text-lg ${
								!aboutUs
									? 'pb-1 border-b-[3px] border-[#FFBA00]'
									: 'cursor-pointer'
							}`}
							onClick={() => setAboutUs(false)}
						>
							Home
						</p>
						<p
							className={`font-century text-[#210440] text-lg ${
								aboutUs
									? 'pb-1 border-b-[3px] border-[#FFBA00]'
									: 'cursor-pointer'
							}`}
							onClick={() => setAboutUs(true)}
						>
							About Us
						</p>
					</div>
				</div>
				{!aboutUs ? (
					<div className="flex lg:flex-row flex-col gap-5 px-10 sm:px-20 items-center justify-center w-full h-full">
						{cards.map((card, i) => (
							<Card
								home
								key={i}
								to={card.to}
								image={card.image}
								name={card.name}
							/>
						))}
					</div>
				) : (
					<div className="w-full h-full px-10 sm:px-20">
						<p className="text-xl my-3 font-montserrat text-[#210440] font-semibold">
							Follow Us!
						</p>
						<div
							className="pl-0 sm:pl-10 flex flex-row cursor-pointer"
							onClick={() =>
								router.push('https://instagram.com/fgacycyw')
							}
						>
							<div className="rounded-md bg-[#210400] p-1">
								<FaInstagram color="white" size={35} />
							</div>
							<p className="font-montserrat pl-3 self-center text-2xl font-semibold tracking-widest">
								Instagram
							</p>
						</div>
						<div
							className="pl-0 sm:pl-10 flex flex-row cursor-pointer mt-5"
							onClick={() =>
								router.push(
									'https://www.youtube.com/user/fgacyc'
								)
							}
						>
							<div className="rounded-md bg-[#210400] p-1">
								<FaYoutube color="white" size={35} />
							</div>
							<p className="font-montserrat pl-3 self-center text-2xl font-semibold tracking-widest">
								YouTube
							</p>
						</div>
					</div>
				)}
			</Layout>
		</>
	)
}

export default Home
