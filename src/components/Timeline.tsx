import React from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

type TimelineProps = {
	active: boolean
	sessionNo: string
	speaker: string
	sessionTitle: string
	icon: React.ReactNode
	date: string
}

export const Timeline: React.FC<TimelineProps> = ({
	active,
	sessionNo,
	sessionTitle,
	speaker,
	icon,
	date
}) => {
	return (
		<VerticalTimelineElement
			className="vertical-timeline-element--work"
			contentStyle={{
				background: active ? '#FFBA00' : '#fff',
				border: `2px solid #210440`
			}}
			contentArrowStyle={{
				borderRight: `7px solid  #210440`
			}}
			dateClassName="font-montserrat font-semibold text-xl"
			iconClassName={`bg-[${active ? '#FFBA00' : '#ffb59b'}]`}
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
			<h1 className="font-montserrat font-semibold text-xl">{date}</h1>
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
	)
}
