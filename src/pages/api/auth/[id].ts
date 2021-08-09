/* eslint-disable no-useless-escape */
import notion, { parseUser } from '../../../lib/notion'
import handler from '../../../utils/handler'
import { getEnvVar } from '../../../utils/helpers'

export default handler
	// .use(get(checkAuthorizationAndIdToken))
	.get(async (req, res) => {
		const { id } = req.query

		const uid = id as string

		const { env: userDatabaseId, error } = getEnvVar(
			'NOTION_USER_DATABASE_ID'
		)
		if (error) throw error

		try {
			const response = await notion.databases.query({
				database_id: userDatabaseId as string,
				filter: {
					and: [
						{ property: 'Full Name', text: { is_not_empty: true } },
						{ property: 'Uid', text: { equals: uid } }
					]
				}
			})
			const user = parseUser(response.results[0])
			console.log('user: ' + JSON.stringify(user, null, 2))
			return res.status(200).json({
				success: true,
				message: `User data with uid \'${uid}\' is retrieved from Notion`,
				data: user
			})
		} catch (err) {
			console.error(err)
			return res.status(500).end('Internal Server Error: ' + err)
		}
	})
