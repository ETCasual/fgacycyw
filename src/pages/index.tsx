/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = () => {
	const router = useRouter()
	useEffect(() => {
		router.push('/login')
	})
}

export default Index
