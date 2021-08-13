import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../components'

const Error500: NextPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>500 | FGACYCYW KL</title>
			</Head>
			<Layout
				noFooter
				className="overflow-hidden"
				hscreen={false}
				overflowHidden
			>
				<div className="mx-auto my-auto flex flex-col h-screen overflow-hidden items-center justify-center">
					<p className="font-montserrat text-xl mb-2 w-full text-center">
						Opps, something went wrong
					</p>
					<p className="font-montserrat text-xl w-full text-center">
						<a href="https://api.whatsapp.com/send?phone=60172412866">
							<span className="hover:text-[#210440] hover:font-semibold transition ease-in-out duration-300 pb-1 border-b-[1px] hover:border-b-[2px] border-b-[#FFBA00]">
								Contact us
							</span>
						</a>{' '}
						if further assistance is needed
					</p>
				</div>
			</Layout>
		</>
	)
}

export default Error500
