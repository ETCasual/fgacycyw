/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { AppProps } from 'next/app'
import initAuth from '../services/auth/next-firebase-auth'

import { useReactPWAInstall } from 'react-pwa-install'
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

	const { supported, isInstalled } = useReactPWAInstall()

	const handleload = () => {
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
				{HtmlRef && supported() && !isInstalled() ? handleload() : null}
				{HtmlRef && isOffline()
					? setTimeout(() => {
							toast.error('⚠️ Please connect to the Internet', {
								position: 'bottom-center',
								hideProgressBar: true,
								closeOnClick: false,
								pauseOnHover: true,
								draggable: false,
								autoClose: false
							})
					  }, 5000)
					: null}
			</ToastContainer>
		</>
	)
}
export default MyApp
