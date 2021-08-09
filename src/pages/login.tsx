import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR
} from 'next-firebase-auth'
import Login from '../modules/login'

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP
})()

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login)
