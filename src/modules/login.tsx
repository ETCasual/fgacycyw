import React from 'react'
import { LoginForm } from '../components'
import TitleText from '../graphics/TitleText'
import Head from 'next/head'

const Login: React.FC = () => {
	return (
		<>
			<Head>
				<title>Login | FGACYCYW KL</title>
			</Head>
			<div className="mainwrapper">
				<div
					className="mx-auto w-full h-screen bg-cover flex flex-col bg-center relative z-[1]"
					style={{ backgroundImage: "url('/assets/homeBg.png')" }}
				>
					<div className="flex flex-col m-auto w-full h-1/2 z-[3]">
						<TitleText className="transform scale-90 sm:scale-[0.85] lg:scale-[0.7] my-auto" />
					</div>
					<div className="m-auto lg:w-[500px] sm:w-[400px] w-[300px] z-[3] h-1/2 flex flex-col">
						<LoginForm />
						<div className="flex flex-col items-center mb-2">
							<p className="font-montserrat text-sm text-[#210440]">
								Don&apos;t have an account?
							</p>
							<a href="/signup">
								<p className="font-montserrat text-base underline text-[#210440] transform transition ease-in-out hover:scale-[1.2]">
									Create an account
								</p>
							</a>
						</div>
					</div>
					<div
						className="w-full h-full absolute z-[2]"
						style={{
							backgroundImage:
								'linear-gradient(to bottom, rgba(0, 0, 0, 0), #FDB095 85%, #E5958E)'
						}}
					/>
				</div>
			</div>
		</>
	)
}

export default Login
