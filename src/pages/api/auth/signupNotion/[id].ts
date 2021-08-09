/* eslint-disable no-useless-escape */
import notion from '../../../../lib/notion'
import handler from '../../../../utils/handler'
import { getEnvVar } from '../../../../utils/helpers'

export default handler
	// .use(get(checkAuthorizationAndIdToken))
	.get(async (req, res) => {
		const id = req.query.id

		const email = req.query.email

		const uid = id as string

		const { env: userDatabaseId, error } = getEnvVar(
			'NOTION_USER_DATABASE_ID'
		)
		if (error) throw error

		try {
			const result = await notion.pages.create({
				parent: { database_id: userDatabaseId as string },
				properties: {
					Uid: {
						type: 'rich_text',
						rich_text: [
							{
								type: 'text',
								text: {
									content: uid
								}
							}
						]
					},
					Email: {
						type: 'email',
						email: email as string
					}
				}
			})
			return res.status(200).json(result)
		} catch (err) {
			console.error(err)
			return res.status(500).end('Internal Server Error: ' + err)
		}
	})
