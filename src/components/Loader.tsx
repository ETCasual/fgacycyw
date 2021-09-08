import React from 'react'
import Head from 'next/head'
import { css } from '@emotion/react'
import { PacmanLoader } from 'react-spinners'

const override = css`
	display: block;
	margin-left: -20px;
`

export const Loader: React.FC = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Loading... | FGACYCYW KL</title>
			</Head>
			<div className="h-screen w-full bg-smoothPink flex justify-center items-center overflow-hidden">
				<PacmanLoader
					color="rgba(63, 39, 113)"
					css={override}
					size="60px"
				/>
			</div>
		</>
	)
}
