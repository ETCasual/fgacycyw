import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR
} from 'next-firebase-auth'
import notion, { parseRegData, parseUser } from '../lib/notion'
import { UserProps } from '../interface'
import WorshipNight from '../modules/worshipnight'
import { getEnvVar } from '../utils/helpers'

export interface WorshipNightProps extends UserProps {
	registration_data?: Notion.WorshipNightReg
	registered?: boolean
	approved?: boolean
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser }) => {
	// Get the user token

	const uid = AuthUser.id as string

	const { env: userDatabaseId, error } = getEnvVar('NOTION_USER_DATABASE_ID')
	if (error) throw error
	const { env: worshipDatabaseId, error: error2 } = getEnvVar(
		'NOTION_WORSHIPNIGHT_DATABASE_ID'
	)
	if (error2) throw error2

	try {
		const response = await notion.databases.query({
			database_id: userDatabaseId as string,
			filter: {
				and: [{ property: 'Uid', text: { equals: uid } }]
			}
		})

		const response2 = await notion.databases.query({
			database_id: worshipDatabaseId as string,
			filter: {
				and: [{ property: 'Uid', text: { equals: uid } }]
			}
		})

		const user = parseUser(response.results[0])
		const regData =
			response2.results[0] !== undefined
				? parseRegData(response2.results[0])
				: null
		console.log('regData: ' + JSON.stringify(regData, null, 2))
		console.log('user: ' + JSON.stringify(user, null, 2))
		return {
			props: {
				user: user,
				approved:
					response2.results[0] == undefined
						? false
						: response2.results[0].properties['Approval'],
				registration_data:
					response2.results[0] == undefined ? null : regData,
				registered:
					response2.results[0] == undefined
						? false
						: regData!.registered
			}
		}
	} catch (err) {
		console.error(err)
		return { props: { error: true } }
	}
})

export default withAuthUser<WorshipNightProps>({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(WorshipNight)
