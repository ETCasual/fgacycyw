/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { AppProps } from 'next/app'
import initAuth from '../services/auth/next-firebase-auth'

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

	const shouldPromptInstall = (): string => {
		const userAgent = window.navigator.userAgent.toLowerCase()
		// Detects if device is on iOS
		const isIos = () => {
			return /iphone|ipad|ipod/.test(userAgent)
		}

		// Detects if device is on Android
		const isAndroid = () => {
			return /android/i.test(userAgent)
		}

		// Detects if device is in standalone mode
		const isInStandaloneMode = () =>
			// @ts-ignore
			'standalone' in window.navigator && window.navigator['standalone']

		// Checks if should display install popup notification:
		if (isIos() && !isInStandaloneMode()) {
			return 'ios'
		} else if (isAndroid() && !isInStandaloneMode()) {
			return 'android'
		}
		return 'standalone'
	}

	return (
		<>
			<Component {...pageProps} />
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			>
				{HtmlRef && shouldPromptInstall() == 'ios'
					? toast.info('Click on Share and Add to Home Screen!', {
							position: 'bottom-center',

							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
					  })
					: HtmlRef && shouldPromptInstall() == 'android'
					? toast.info(
							'Click on Options and Install App / Install YWKL!',
							{
								position: 'bottom-center',
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true
							}
					  )
					: null}
			</ToastContainer>
		</>
	)
}
export default MyApp
