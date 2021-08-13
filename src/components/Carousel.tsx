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
	children?: React.ReactNode
	autoplay?: boolean
	infinite?: boolean
	slidesToShow?: number
	heightClass: string
}

export const MyCarousel: React.FC<CarouselProps> = ({
	imgSrc,
	className = '',
	heightClass,
	texts,
	children,
	autoplay = true,
	infinite = true,
	slidesToShow = 1
}) => (
	<Slider
		infinite={infinite}
		speed={500}
		slidesToShow={slidesToShow}
		autoplay={autoplay}
		autoplaySpeed={5000}
		arrows={false}
		className={`h-full ${className}`}
	>
		{imgSrc
			? imgSrc.map((img, i) => (
					<img
						src={img}
						key={i}
						alt={img}
						className={`w-full object-center object-cover ${heightClass}`}
					/>
			  ))
			: null}
		{texts
			? texts.map((text, i) => (
					<div
						className={`z-[3] w-full flex ${heightClass} flex-row justify-center items-center bg-[${text.bgColor}]`}
						key={i}
					>
						<p
							className="text-2xl lg:text-5xl font-bebas font-bold text-center"
							style={{ color: text.textColor }}
						>
							{text.text}
						</p>
					</div>
			  ))
			: null}
		{children}
	</Slider>
)
