import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR
} from 'next-firebase-auth'
import notion, { parseUser } from '../lib/notion'
import { UserProps } from '../interface'
import WarriorConference from '../modules/warriorConference'
import { getEnvVar } from '../utils/helpers'

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser }) => {
	// Get the user token

	const uid = AuthUser.id as string

	const { env: userDatabaseId, error } = getEnvVar('NOTION_USER_DATABASE_ID')
	if (error) throw error

	try {
		const response = await notion.databases.query({
			database_id: userDatabaseId as string,
			filter: {
				and: [{ property: 'Uid', text: { equals: uid } }]
			}
		})
		const user = parseUser(response.results[0])
		console.log('user: ' + JSON.stringify(user, null, 2))
		return { props: { user } }
	} catch (err) {
		console.error(err)
		return { props: { error: true } }
	}
})

export default withAuthUser<UserProps>({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(WarriorConference)
