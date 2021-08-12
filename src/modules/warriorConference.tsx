/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Menu, Transition } from '@headlessui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { Fragment, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Layout, MyCarousel } from '../components'
import { SermonCard } from '../components/SermonCard'
// import { UserProps } from '../interface'

const texts = [
	{ text: 'Warrior Conference', textColor: '#FFBA00', bgColor: '#210440' }
]

const loremipsum =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const dayCards = [1, 2, 3]

const WarriorConference: NextPage = () =>
	// {
	// 	user
	// }
	{
		const [day, setDay] = useState<number>(1)
		return (
			<>
				<Head>
					<title>Warrior Conference | FGACYCYW KL</title>
				</Head>
				<Layout currentPage="home" className="h-screen overflow-hidden">
					<div className="h-32 lg:h-52 w-full">
						<MyCarousel texts={texts} className="w-screen" />
					</div>
					<div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 sm:px-20 w-full">
						<div className="mx-auto hidden sm:flex flex-row gap-5 mt-7 ">
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
									<p className="font-montserrat text-lg text-center">
										{'Day ' + days}
									</p>
								</div>
							))}
						</div>
						<Menu
							as="div"
							className="w-[200px] mx-auto relative sm:hidden mt-4"
						>
							<div>
								<Menu.Button className="inline-flex justify-between w-full px-2 py-1 font-montserrat bg-[#FFBA00] text-base rounded-3xl text-[#210440] hover:bg-opacity-30">
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
					<div className="w-[280px] sm:w-[600px] lg:w-[950px]">
						<SermonCard
							title="Kingdom Come"
							text={loremipsum}
							className="mt-5"
							videoId="uGaRPMsFXnc"
							verse="Matthew 6:33 | Psalm 119"
						/>
					</div>
				</Layout>
			</>
		)
	}

export default WarriorConference
