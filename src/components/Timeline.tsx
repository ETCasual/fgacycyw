import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import Slider from 'react-slick'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

type TimelineProps = {
	active: boolean
	sessionNo: string
	speaker: string
	sessionTitle: string
	icon: React.ReactNode
	date: string
	speakerDetails1?: {
		workshopTitle: string
		speakerName: string
		speakerIntro: string
	}[]
	speakerDetails2?: {
		workshopTitle: string
		speakerName: string
		speakerIntro: string
	}[]
	speakerDetails3?: {
		workshopTitle: string
		speakerName: string
		speakerIntro: string
	}[]
	speakerDetails4?: {
		workshopTitle: string
		speakerName: string
		speakerIntro: string
	}[]
	elemKey: number
}

export const Timeline: React.FC<TimelineProps> = ({
	active,
	sessionNo,
	sessionTitle,
	speaker,
	icon,
	date,
	speakerDetails1,
	speakerDetails2,
	speakerDetails3,
	speakerDetails4,
	elemKey
}) => {
	const [modalMode, setModalMode] = useState<1 | 2 | 3 | 4 | false>(false)
	return (
		<>
			<Dialog
				as="div"
				open={
					modalMode == 1
						? true
						: modalMode == 2
						? true
						: modalMode == 3
						? true
						: modalMode == 4
						? true
						: false
				}
				className="fixed inset-0 z-10 backdrop-blur-[2px]"
				onClick={() => setModalMode(false)}
				onClose={() => setModalMode(false)}
			>
				<div className="w-[300px] sm:w-[600px] md:w-[750px] px-3 sm:px-6 py-4 bg-[#31065f] fixed top-1/2 left-1/2 flex flex-col items-center text-white rounded-[4px] shadow-2xl transform -translate-y-1/2 -translate-x-1/2">
					{modalMode == 1 ? (
						<ModalDetails data1={speakerDetails1} />
					) : modalMode == 2 ? (
						<ModalDetails data1={speakerDetails2} />
					) : modalMode == 3 ? (
						<ModalDetails data1={speakerDetails3} />
					) : (
						<ModalDetails data1={speakerDetails4} />
					)}
					<button
						onClick={() => setModalMode(false)}
						className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
					>
						Close
					</button>
				</div>
			</Dialog>
			<VerticalTimelineElement
				contentStyle={{
					background: active ? '#FFBA00' : '#fff',
					border: `2px solid #210440`
				}}
				contentArrowStyle={{
					borderRight: `7px solid  #210440`
				}}
				dateClassName="font-montserrat font-semibold text-xl"
				iconClassName={`bg-[${active ? '#FFBA00' : '#ffb59b'}]`}
				onTimelineElementClick={() =>
					setModalMode(
						elemKey == 1
							? 1
							: elemKey == 2
							? 2
							: elemKey == 3
							? 3
							: 4
					)
				}
				icon={
					// <GiBlindfold
					// 	color="#210440"
					// 	className="trasnform scale-[1.1]"
					// />
					icon
				}
			>
				<h1 className="font-montserrat font-semibold text-2xl">
					Session {sessionNo}
				</h1>
				<h1 className="font-montserrat font-semibold text-xl">
					{date}
				</h1>
				<h1 className="font-chiTitle text-2xl">{sessionTitle}</h1>
				{speaker == 'N/A' ? (
					<p className="font-montserrat font-semibold text-2xl">
						Workshops:
						<br />
						Photo Editing
						<br />
						Singing
						<br />
						Public Speaking
					</p>
				) : (
					<p className="font-montserrat font-semibold text-2xl">
						Speaker:
						<br />
						{speaker}
					</p>
				)}
			</VerticalTimelineElement>
		</>
	)
}

type modalDetailsProps = {
	data1?: {
		workshopTitle: string
		speakerName: string
		speakerIntro: string
	}[]
}
const ModalDetails: React.FC<modalDetailsProps> = ({ data1 }) => {
	return (
		<>
			<Slider
				autoplay={data1!.length !== 1 ? true : false}
				className="w-[300px] sm:w-[600px] md:w-[750px]"
				arrows={false}
				// infinite={data1!.length !== 1 ? true : false}
				slidesToShow={1}
			>
				{data1!.map((data) => (
					<>
						<p className="text-4xl font-bebas tracking-[0.025em] font-bold text-center">
							{data.workshopTitle}
						</p>
						<p className="text-xl sm:text-2xl font-montserrat font-semibold text-center my-1">
							{data.speakerName}
						</p>
						<pre className="text-lg sm:text-xl md:text-2xl font-montserrat text-center mb-3">
							{data.speakerIntro}
						</pre>
					</>
				))}
			</Slider>
		</>
	)
}
