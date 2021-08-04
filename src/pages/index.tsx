/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const Index: NextPage = () => {
	const router = useRouter()
	useEffect(() => {
		router.push('/login')
	})

	return <div></div>
}

export default Index
