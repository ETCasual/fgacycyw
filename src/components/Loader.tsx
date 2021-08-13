import React from 'react'
import { css } from '@emotion/react'
import { PacmanLoader } from 'react-spinners'

const override = css`
	display: block;
	margin: 0 auto;
`

export const Loader: React.FC = (): JSX.Element => {
	return (
		<div className="h-screen w-screen flex justify-center items-center overflow-hidden">
			<PacmanLoader color="#210440" css={override} size="60px" />
		</div>
	)
}
