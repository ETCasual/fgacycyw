import React from 'react'
import YouTube from 'react-youtube'

type SermonCardProps = {
	title: string
	text: string
	image?: string
	verse?: string
	videoId: string
	className?: string
}

export const SermonCard: React.FC<SermonCardProps> = ({
	title,
	text,
	// image,
	verse,
	videoId,
	className = ''
}) => {
	return (
		<div
			className={`p-3 flex flex-col bg-gradient-to-br  from-[#210440] to-[#5e4ecb] rounded-xl h-[500px]  w-full ${className}`}
		>
			<a
				href={
					videoId
						? `https://youtube.com/watch?v=${videoId}`
						: undefined
				}
				className="mx-auto"
				target={videoId ? '_blank' : '_self'}
				rel="noreferrer"
			>
				<p
					className={`font-montserrat text-2xl font-bold transition ease-in-out duration-300  text-white ${
						videoId ? 'underline hover:text-[#FFBA00]' : null
					}`}
				>
					{title.toUpperCase()}
				</p>
			</a>
			<div className="overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar scrollbar-thumb-gray-500">
				<p className="text-white text-xl text-center font-montserrat mx-auto my-3">
					{verse}
				</p>

				<p className="font-montserrat my-2  text-white">{text}</p>
				{videoId ? (
					<YouTube
						videoId={videoId}
						className="mx-auto"
						containerClassName="w-full aspect-w-16 aspect-h-9 my-10"
					/>
				) : (
					''
				)}
			</div>
		</div>
	)
}
