/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { NextPage } from 'next'
import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR
} from 'next-firebase-auth'
import React from 'react'
import { Loader } from '../components'

const Index: NextPage = () => {
	return <Loader />
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
	whenAuthed: AuthAction.REDIRECT_TO_APP
})()

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	whenAuthed: AuthAction.REDIRECT_TO_APP
})(Index)
