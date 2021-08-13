/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { AppProps } from 'next/app'
import initAuth from '../services/auth/next-firebase-auth'

import ReactPWAInstallProvider, { useReactPWAInstall } from 'react-pwa-install'
import 'aos/dist/aos.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import React, { useEffect, useState } from 'react'

initAuth()

function MyApp({ Component, pageProps }: AppProps) {
	const [HtmlRef, setHtmlRef] = useState<string>('')
	useEffect(() => {
		setHtmlRef(window.location.pathname)
	}, [])

	const { pwaInstall, supported, isInstalled } = useReactPWAInstall()

	const handleload = () => {
		pwaInstall({
			title: 'Install YWKL',
			logo: '/logo-medium.png'
		})
			.then(() =>
				toast.info(
					`🚀\nAndroid: Click on Options and Install App / Install YWKL!,\niOS: Click on share then Add to Home Screen`,
					{
						position: 'bottom-center',
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					}
				)
			)
			.catch((err) => {
				console.log('opted Out: ' + err)
			})
	}

	const isOffline = (): boolean => {
		if (window.navigator.onLine) {
			return false
		} else {
			return true
		}
	}

	return (
		<>
			<ReactPWAInstallProvider enableLogging>
				<Component {...pageProps} />
				<ToastContainer
					position="bottom-center"
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover
					limit={1}
				>
					{supported() && !isInstalled() ? handleload : null}
					{HtmlRef && isOffline()
						? setTimeout(() => {
								toast.error(
									'⚠️ Please connect to the Internet',
									{
										position: 'bottom-center',
										hideProgressBar: true,
										closeOnClick: false,
										pauseOnHover: true,
										draggable: false
									}
								)
						  }, 5000)
						: null}
				</ToastContainer>
			</ReactPWAInstallProvider>
		</>
	)
}
export default MyApp
