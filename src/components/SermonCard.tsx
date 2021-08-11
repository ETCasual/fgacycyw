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
	// verse,
	videoId,
	className = ''
}) => {
	return (
		<div
			className={`p-3 flex flex-col bg-gradient-to-br  from-[#210440] to-[#5e4ecb] rounded-xl h-[500px]  w-full ${className}`}
		>
			<a
				href={videoId ? `{https://youtube.com/watch?v=${videoId}}` : ''}
				className="mx-auto"
			>
				<p
					className={`font-montserrat text-lg font-bold transition ease-in-out duration-300  text-white ${
						videoId ? 'underline hover:text-[#FFBA00]' : null
					}`}
				>
					{title.toUpperCase()}
				</p>
			</a>
			<div className="overflow-y-scroll">
				<p className="font-montserrat my-2 text-white">{text}</p>
				{videoId ? (
					<YouTube videoId={videoId} className="w-full" />
				) : (
					''
				)}
			</div>
		</div>
	)
}
