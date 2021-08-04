import React from 'react'
import Slider from 'react-slick'

type TextsType = {
	text: string
	textColor: string
	bgColor: string
}

type CarouselProps = {
	imgSrc?: string[]
	texts?: TextsType[]
	className?: string
}

export const MyCarousel: React.FC<CarouselProps> = ({
	imgSrc,
	className = '',
	texts
}) => (
	<Slider
		infinite
		speed={500}
		slidesToShow={1}
		autoplay
		autoplaySpeed={5000}
		arrows={false}
		className={`w-screen h-full ${className}`}
	>
		{imgSrc
			? imgSrc.map((img, i) => (
					<img
						src={img}
						key={i}
						alt={img}
						className="w-full object-center object-contain h-32 lg:h-52"
					/>
			  ))
			: null}
		{texts
			? texts.map((text, i) => (
					<div
						className={`z-[3] h-32 lg:h-52 w-full flex flex-row justify-center items-center bg-[${text.bgColor}]`}
						key={i}
					>
						<p
							className="text-2xl lg:text-5xl font-montserrat font-bold text-center"
							style={{ color: text.textColor }}
						>
							{text.text}
						</p>
					</div>
			  ))
			: null}
	</Slider>
)
