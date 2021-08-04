import { NextPage } from 'next'
import React from 'react'
import { LoginForm } from '../components'
import TitleText from '../graphics/TitleText'

// const firebaseConfig = {
// 	apiKey: 'AIzaSyBsMCphihnd55R_ujryu8CG5OHbgAG4gxg',
// 	authDomain: 'fgacycyw-web.firebaseapp.com',
// 	projectId: 'fgacycyw-web',
// 	storageBucket: 'fgacycyw-web.appspot.com',
// 	messagingSenderId: '1043771250555',
// 	appId: '1:1043771250555:web:8591e12f5035cd8d00cfde',
// 	measurementId: 'G-4HD88K0LF1'
// }

const Login: NextPage = () => {
	return (
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
	)
}

export default Login
