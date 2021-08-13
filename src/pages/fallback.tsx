import React from 'react'
import { RiWifiOffLine } from 'react-icons/ri'
import { NextPage } from 'next'
import Head from 'next/head'

const Fallback: NextPage = () => {
	return (
		<>
			<Head>
				<title>Offline | FGACYCYW KL</title>
			</Head>
			<div className="h-screen flex flex-col item-center">
				<div className="w-full my-auto px-5">
					<RiWifiOffLine
						className="w-44 h-44 lg:w-52 lg:h-52 mx-auto"
						color="#210440"
					/>
					<p className="font-bebas w-full tracking-[0.025em] text-3xl text-center">
						You are currently offline
					</p>
					<p className="font-montserrat w-full tracking-[0.025em] text-xl text-center">
						Please connect to the Internet to use the app.
					</p>
				</div>
			</div>
		</>
	)
}

export default Fallback
