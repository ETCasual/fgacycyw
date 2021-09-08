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
import YouTube from 'react-youtube'
import Slider from 'react-slick'

const WarriorConference: NextPage<UserProps> = ({ user }) => {
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
				<div className="w-full bg-smoothPink" data-aos="fade-down">
					<p className="font-bebas text-PRIMARY text-3xl lg:text-4xl mt-5 w-full text-center">
						Recap Video
					</p>
					<YouTube
						videoId="tiraeq_19DI"
						className="mx-auto p-3 lg:p-5 rounded-2xl"
						containerClassName="mx-auto aspect-w-16 aspect-h-9 rounded-2xl w-full lg:w-auto mb-5"
						onEnd={() => {
							console.log('Video Ended')
						}}
					/>
				</div>
				<div
					className="bg-white rounded-t-3xl relative w-full flex flex-col -mt-5 z-[5]"
					style={{
						boxShadow: '0px -4px 20px rgba(50, 50, 50, 0.2)',
						WebkitBoxShadow: '0px -4px 20px rgba(50, 50, 50, 0.2)',
						MozBoxShadow: '0px -4px 20px rgba(50, 50, 50, 0.2)'
					}}
				>
					<div className="top-0 bg-white w-full rounded-t-3xl h-[50px] flex items-center">
						<p className="font-chi font-bold text-2xl w-full text-center text-SECONDARY">
							Warriors Conference
						</p>
					</div>
					<div
						className="p-3 lg:p-10 flex flex-col gap-5"
						data-aos="fade-right"
					>
						<div className="w-full bg-PRIMARY rounded-xl elevation-5 p-5">
							<Slider
								infinite
								autoplay
								autoplaySpeed={10000}
								dots={false}
								draggable
								arrows={false}
							>
								<>
									<div className="w-full flex items-center">
										<img
											src="/assets/pp/zh.png"
											alt="ZhiHao"
											className="rounded-full object-contain w-14 h-14 lg:w-20 lg:h-20 absolute z-[2]"
										/>
										<div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-smoothPink transform translate-x-1 translate-y-1" />
										<p className="font-chi text-xl font-bold text-SECONDARY text-left ml-5">
											Session 1<br />
											被遗忘的牧人
										</p>
									</div>
									<p className="mt-5 font-chi text-lg text-smoothPink">
										<span className="font-bold text-sm underline italic">
											Do Re Mi
											<br />
											Do Not Repeat The Same Mistake
										</span>
										<br />
										<br />
										我们都期待自己被神看见，成为 Unseen
										Shepherd 里的{' '}
										<span className="font-bold">
											大卫牧人!{' '}
										</span>
										<br />
										但大卫的拣选可说是一场美丽的误会!
										因在他之前的王，扫罗的愚昧而成就的。原本被神拣选的扫罗，因为自大狂傲，经常在四周引起争战!
										神透过撒母耳先知为百姓选上了这位领袖
										(扫罗)
										后，他却不听从神的吩咐。更因两次愚昧的抉择而被神后悔厌弃!
										<br />
										<br />
										<span className="font-bold ">
											撒上 13: 5~14
											<br />
											撒下 15: 12~23
										</span>
										<br />
										<span className="font-bold text-SECONDARY">
											人的眼光是眼光，神的眼光是拣选!
										</span>
										<br />
										<br />
										今天神没有后悔对你的拣选，他已认定你给你机会!
										<br />
										不要让自己成为扫罗，失去了才后悔!
										<br />
										让你在这世代成为真正爱神和珍惜这拣选的大卫!
									</p>
								</>
								{/* Session 2 */}
								<>
									<div className="w-full flex items-center">
										<img
											src="/assets/pp/phoebe.jpg"
											alt="ZhiHao"
											className="rounded-full object-contain w-14 h-14 lg:w-20 lg:h-20 absolute z-[2]"
										/>
										<div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-smoothPink transform translate-x-1 translate-y-1" />
										<p className="font-chi text-xl font-bold text-SECONDARY text-left ml-5">
											Session 2<br />
											生命与品格
										</p>
									</div>
									<p className="mt-5 font-chi text-lg text-smoothPink">
										<span className="font-bold text-sm underline italic">
											当脱去敬虔的外衣
											<br />
											我们的内心是否为着爱我们的神而活？
										</span>
										<br />
										<br />
										现代许多年轻人都一直刷存在感，希望被看见，连做事的动力都来自人的
										<span className="font-bold">
											“点赞”和掌声。
										</span>
										<br />
										<br />
										当不被看重或被遗忘时，就会觉得自己不重要，失去了前进的动力并且开始停留安逸，甚至自暴自弃。
										<br />
										<br />
										<span className="text-SECONDARY font-bold">
											大卫的生命却恰恰相反！
										</span>
										他的心是被神喜悦及拣选。就算常常被遗忘、不被重视，但大卫从不自怨自艾，更不会因为人的过失而责怪他们！他深深知道生命的意义，就是为神而活。
										<br />
										<br />
										无论是生命最顶峰，或是人生最低谷，大卫都不曾离开神！
										<br />
										<span className="font-bold text-SECONDARY">
											让我们竭力讨神喜悦，成为那合乎神心意的人吧！
										</span>
									</p>
								</>
							</Slider>
						</div>
					</div>{' '}
				</div>
			</Layout>
		</>
	)
}

export default WarriorConference
