import React from 'react'
import Head from 'next/head'
import { css } from '@emotion/react'
import { PacmanLoader } from 'react-spinners'

const override = css`
	display: block;
`

export const Loader: React.FC = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Loading... | FGACYCYW KL</title>
			</Head>
			<div className="h-screen w-full flex justify-center items-center overflow-hidden -ml-5 sm:ml-0">
				<PacmanLoader color="#210440" css={override} size="60px" />
			</div>
		</>
	)
}
