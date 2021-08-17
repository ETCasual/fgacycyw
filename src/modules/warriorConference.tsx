/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dialog, Menu, Transition } from '@headlessui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { Fragment, useState, useEffect, createRef } from 'react'
import { FaChevronDown, FaPaintBrush } from 'react-icons/fa'
import { Layout, MyCarousel, Loader, Timeline } from '../components'
import { SermonCard } from '../components/SermonCard'
import { UserProps } from '../interface'
import AOS from 'aos'
import 'react-vertical-timeline-component/style.min.css'
import { GiBlindfold, GiButterfly } from 'react-icons/gi'

import { AiOutlineForm } from 'react-icons/ai'
import { useRegister } from '../stores/useRegister'
import Select from 'react-select'
import YouTube from 'react-youtube'
import { useRef } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import { BsPeopleFill } from 'react-icons/bs'
// import { UserProps } from '../interface'

// const texts = [
// 	{ text: 'Warrior Conference', textColor: '#FFBA00', bgColor: '#210440' }
// ]

const selections = [
	{
		value: 'Photo Editing',
		label: 'Photo Editing'
	},
	{
		value: 'Singing',
		label: 'Singing'
	},
	{
		value: 'Performing Arts (Public Speaking)',
		label: 'Performing Arts (Public Speaking)'
	}
]

const timelineElements = [
	{
		sessionNo: '1',
		date: 'Friday 8.30PM',
		sessionTitle: '被遗忘的牧人',
		speaker: 'Bro. Zhi Hao',
		active: true,
		icon: <GiBlindfold color="#210440" className="transform scale-[1.1]" />
	},
	{
		sessionNo: '2',
		date: 'Saturday 10.30AM',
		sessionTitle: '生命与品格',
		speaker: 'Sis. Phoebe Liew',
		active: false,
		icon: <BsPeopleFill color="#210440" className="transform scale-[1.1]" />
	},
	{
		sessionNo: '3 | Workshops',
		date: 'Saturday 12.45PM',
		sessionTitle: '十八般武艺',
		speaker: 'N/A',
		active: false,
		icon: <FaPaintBrush color="#210440" className="transform scale-[1.1]" />
	},
	{
		sessionNo: '4',
		date: 'Saturday 8.30PM',
		sessionTitle: '关键蜕变',
		speaker: 'Bro. Json',
		active: false,
		icon: <GiButterfly color="#210440" className="transform scale-[1.1]" />
	}
]

const loremipsum =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const dayCards = [1, 2, 3]

const WarriorConference: NextPage<UserProps> = ({ user }) => {
	const [day, setDay] = useState<number>(1)
	const [selectionText, setSelection] = useState<string>('')
	const [isModalOpen, setModalState] = useState<boolean>(false)
	const [thumbnail, setThumbnail] = useState<boolean>(false)
	const [disabled, setDisabled] = useState<boolean>(false)

	const { uid, setRegistered } = useRegister()
	const buttonRef = createRef<HTMLButtonElement>()

	useEffect(() => {
		AOS.init({
			duration: 2000
		})
	}, [])
	const [mounted, setMounted] = useState<boolean>(false)
	useEffect(() => {
		setTimeout(() => {
			setMounted(true)
		}, 2000)
	}, [])

	if (!mounted) return <Loader />

	return (
		<>
			<Head>
				<title>Warrior Conference | FGACYCYW KL</title>
			</Head>
			<Layout
				currentPage="home"
				className="overflow-hidden relative"
				user={user}
				noFooter
				hscreen={false}
			>
				<Dialog
					as="div"
					open={isModalOpen}
					className="fixed inset-0 z-10 backdrop-blur-[2px]"
					onClose={() => setModalState(false)}
				>
					<div className="w-[11/12] px-3 sm:px-6 py-4 bg-[#31065f] fixed top-1/2 left-1/2 flex flex-col items-center text-white rounded-[4px] shadow-2xl transform -translate-y-1/2 -translate-x-1/2">
						<p className="text-4xl font-bebas tracking-[0.025em] text-center mt-5">
							Warrior Conference @ workshop!{' '}
							<span role="img" aria-label="Lightbulb">
								💡
							</span>
						</p>
						<p className="text-2xl font-montserrat text-center my-1">
							These will be your workshop for
							<span className="font-bold"> Session 3</span>
						</p>
						<p className="text-2xl font-montserrat text-center mb-5">
							By submitting, you are registered for
							<span className="font-bold text-[#FFBA00]">
								{' '}
								Warrior Conference!
							</span>
						</p>
						<Select
							className="mx-auto mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base rounded-[4px] placeholder-[#a67bd4]"
							isClearable={false}
							maxMenuHeight={150}
							onChange={(selection) =>
								setSelection(selection?.value as string)
							}
							options={selections}
						/>
						<button
							onClick={
								selectionText
									? async () => {
											setDisabled(true)
											const res = await fetch(
												`/api/registerConference/${selectionText}`,
												{
													method: 'POST',
													headers: {
														'Content-Type':
															'application/json'
													},
													credentials: 'same-origin',
													body: JSON.stringify(user)
												}
											)
											if (res.ok) {
												setRegistered(
													user?.uid as string
												)
												alert('Registered!')
												setModalState(false)
												window.location.reload()
											}
									  }
									: () => alert('Please select a workshop!')
							}
							disabled={disabled}
							className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
						>
							Register!
						</button>
					</div>
				</Dialog>
				<div className="w-full" data-aos="fade-down">
					<MyCarousel
						imgSrc={['/assets/warriorConfBannerSmall.jpg']}
						className="w-screen block sm:hidden"
						heightClass="h-32"
					/>
					<MyCarousel
						imgSrc={['/assets/warriorConfbanner.jpg']}
						className="w-screen hidden sm:block"
						heightClass="h-52"
					/>
				</div>
				<div className="sm:w-2/3 lg:w-1/2 w-full bg-[#ffb59b] sm:bg-transparent">
					{thumbnail == false ? (
						<YouTube
							videoId="osstd3a2kf0"
							className="mx-auto"
							containerClassName="w-full mx-auto aspect-w-16 aspect-h-9 mt-7"
							onEnd={() => {
								console.log('Video Ended')
								buttonRef.current?.click()
								setThumbnail(true)
							}}
						/>
					) : (
						<div className="mx-5 sm:mx-auto mt-3 flex flex-col items-center">
							<button
								className="w-full mb-3 px-5 py-3 text-xl my-2 font-montserrat rounded-md text-white bg-[#210440]"
								onClick={() => setThumbnail(false)}
							>
								Replay Video
							</button>
							<img
								className="mx-auto object-contain px-0 sm:px-10"
								src="/assets/warriorConfposter.jpg"
								alt="warriorConfPoster"
							/>
						</div>
					)}
					<div className="w-full mx-auto rounded-none sm:rounded-xl mb-5 mt-0 sm:mt-5 bg-[#ffb59b] text-[#210440]">
						<div className="w-full py-5 bg-[#210440] text-[#ffba00] rounded-none sm:rounded-t-xl">
							<p className="font-montserrat font-semibold sm:text-5xl text-3xl w-full mx-auto text-center">
								Warrior Conference
							</p>
							<p className="font-montserrat font-semibold sm:text-4xl text-2xl w-full mx-auto text-center">
								The Unseen Shepherd
							</p>
							<p className="font-chiTitle font-semibold sm:text-4xl text-3xl w-full mx-auto text-center">
								看不见的蜕变
							</p>
						</div>
						<VerticalTimeline className="text-[#210440]">
							{timelineElements.map((elem, i) => (
								<Timeline
									active={elem.active}
									key={i}
									date={elem.date}
									icon={elem.icon}
									sessionNo={elem.sessionNo}
									sessionTitle={elem.sessionTitle}
									speaker={elem.speaker}
								/>
							))}
						</VerticalTimeline>
					</div>
				</div>

				{/* TODO: Uncomment all these went d-day comes */}

				{/* <div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 sm:px-20 w-full mt-2">
					<div className="mx-auto hidden sm:flex flex-row gap-5 mt-4">
						{dayCards.map((days, i) => (
							<div
								className={`rounded-3xl transition ease-in-out duration-300 px-2 py-1  w-[150px] cursor-pointer ${
									days == day
										? 'bg-[#FFBA00] text-[#210440]'
										: 'bg-[#210440] text-[#fff] '
								}`}
								onClick={() => setDay(days)}
								key={i}
							>
								<p className="font-bebas text-lg text-center">
									{'Day ' + days}
								</p>
							</div>
						))}
					</div>
					<Menu
						as="div"
						className="w-[200px] mx-auto relative sm:hidden mt-2"
					>
						<div>
							<Menu.Button className="inline-flex justify-between w-full px-2 py-1 font-bebas bg-[#FFBA00] text-base rounded-3xl text-[#210440] hover:bg-opacity-30">
								{'Day ' + day}
								<FaChevronDown
									className="w-3 h-3 self-center ml-2  text-violet-200 hover:text-violet-100"
									aria-hidden="true"
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute left-0 z-[2] w-full origin-top-right rounded-md shadow-lg focus:outline-none">
								<div className="flex flex-col">
									{dayCards.map((days, i) => (
										<Menu.Item key={i}>
											<button
												onClick={() => setDay(days)}
											>
												<p
													className={`
														${
															days == day
																? 'bg-[#FFBA00] text-[#210440]'
																: 'bg-[#210440] text-[#fff] '
														} px-2 py-1`}
												>
													{'Day ' + days}
												</p>
											</button>
										</Menu.Item>
									))}
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				<div className="w-[280px] sm:w-[600px] lg:w-[950px] mx-auto my-2">
					<SermonCard
						title="Kingdom Come"
						text={loremipsum}
						className="mt-2"
						videoId="uGaRPMsFXnc"
						verse="Matthew 6:33 | Psalm 119"
					/>
				</div> */}

				{user?.registered == false &&
				!uid.includes(user.uid as string) &&
				!disabled ? (
					<div className="fixed top-16">
						<Menu as="div" className="fixed bottom-10 left-10">
							<div>
								<Menu.Button
									ref={buttonRef}
									disabled={disabled}
									title={
										'Registration For Warrior Conference'
									}
									className="animate-bounce rounded-2xl flex flex-row items-center from-[#FFBA00] to-[#ffbbbb] bg-gradient-to-br w-full h-[60px]  lg:h-[80px] px-5 py-3 text-[#210440]"
								>
									<AiOutlineForm className="h-10 w-10" />
									<p className="font-bebas text-2xl text-[#210440] ml-2 text-center">
										Register Now!
									</p>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items
									onClick={() => {
										setModalState(true)
										console.log('Opened')
									}}
									className="absolute cursor-pointer bottom-20 lg:bottom-32 w-[200px] bg-white origin-bottom-left ring-2 ring-[#210440] ring-offset-4 text-left px-1 text-[#210440] rounded-md shadow-lg focus:outline-none"
								>
									<Menu.Item>
										<>
											<p className="font-bebas text-xl mt-2">
												Register Here!
											</p>
											<p className="mb-2">
												Click on the button to register!
											</p>
										</>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				) : null}
			</Layout>
		</>
	)
}

export default WarriorConference
