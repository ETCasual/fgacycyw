/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { AppProps } from 'next/app'
import initAuth from '../services/auth/next-firebase-auth'

import 'aos/dist/aos.css'
import { shouldPromptInstall } from '../utils/helpers'
// @ts-ignore
import { toast } from 'tailwind-toast'

initAuth()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			{shouldPromptInstall()
				? toast()
						.default(
							'Download Me!',
							'Click on Share and Add to Home Screen!'
						)
						.from('bottom', 'center')
						.show()
				: null}
		</>
	)
}
export default MyApp
