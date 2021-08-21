import { RichTextPropertyValue } from '@notionhq/client/build/src/api-types'
import { NextApiRequest, NextApiResponse } from 'next'
import notion from '../../../lib/notion'
import { getEnvVar } from '../../../utils/helpers'

const sendAttendance = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const user: Notion.User = req.body
	const sessionNo = req.query.sessionNo

	const { env: dbId, error } = getEnvVar('NOTION_ATTENDANCE_DATABASE_ID')
	if (error) throw error
	try {
		const response = await notion.databases.query({
			database_id: dbId as string,
			filter: {
				and: [
					{
						property: 'Uid',
						text: { equals: user.uid as string }
					}
				]
			}
		})

		if (
			(response.results[0].properties.Uid as RichTextPropertyValue)
				.rich_text[0].plain_text
		) {
			res.status(403)
			throw new Error(`User with uid: '${user.uid}' Already Registered!`)
		} else {
			const response1 = await notion.pages.create({
				parent: { database_id: dbId as string },
				properties: {
					'Full Name': {
						type: 'title',
						title: [
							{
								type: 'text',
								text: {
									content: user.fullName as string
								}
							}
						]
					},
					Cluster: {
						type: 'rich_text',
						rich_text: [
							{
								type: 'text',
								text: {
									content: user.cluster as string
								}
							}
						]
					},
					'Small Team': {
						type: 'rich_text',
						rich_text: [
							{
								type: 'text',
								text: {
									content: user.smallTeam as string
								}
							}
						]
					},
					CG: {
						type: 'rich_text',
						rich_text: [
							{
								type: 'text',
								text: {
									content: user.cg as string
								}
							}
						]
					},
					Uid: {
						type: 'rich_text',
						rich_text: [
							{
								type: 'text',
								text: {
									content: user.uid as string
								}
							}
						]
					},
					'Session No': {
						type: 'rich_text',
						rich_text: [
							{
								type: 'text',
								text: {
									content: sessionNo as string
								}
							}
						]
					}
				}
			})
			console.log(response1)
			res.status(200).json(response1)
		}
	} catch (err) {
		console.error(err)
		res.status(500).json(err)
	}
}

export default sendAttendance
