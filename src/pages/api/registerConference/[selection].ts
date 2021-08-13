import { NextApiRequest, NextApiResponse } from 'next'
import notion from '../../../lib/notion'
import { getEnvVar } from '../../../utils/helpers'

const sendRegistration = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const properties: Notion.User = req.body
	const selection = req.query.selection

	const { env: dbId, error } = getEnvVar('NOTION_REGISTRATION_DATABASE_ID')
	if (error) throw error
	const { env: dbId2, error: err2 } = getEnvVar('NOTION_USER_DATABASE_ID')
	if (err2) throw err2

	try {
		const response1 = await notion.databases.query({
			database_id: dbId2 as string,
			filter: {
				and: [
					{
						property: 'Uid',
						text: { equals: properties.uid as string }
					}
				]
			}
		})

		const pageId = response1.results[0].id

		await notion.pages.update({
			page_id: pageId,
			archived: false,
			properties: {
				Registered: {
					type: 'checkbox',
					checkbox: true
				}
			}
		})

		const response = await notion.pages.create({
			parent: { database_id: dbId as string },
			properties: {
				'Full Name': {
					type: 'title',
					title: [
						{
							type: 'text',
							text: {
								content:
									properties.fullName?.toUpperCase() as string
							}
						}
					]
				},
				Nickname: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.nickname as string
							}
						}
					]
				},
				Contact: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.contact as string
							}
						}
					]
				},
				Gender: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.gender as string
							}
						}
					]
				},
				'Address Line 1': {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.address1 as string
							}
						}
					]
				},
				'Address Line 2': {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.address2
									? properties.address2
									: ''
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
								content: properties.cluster as string
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
								content: properties.smallTeam as string
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
								content: properties.cg as string
							}
						}
					]
				},
				Dob: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.dob as string
							}
						}
					]
				},
				Workshop: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: selection as string
							}
						}
					]
				},
				Ic: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.ic as string
							}
						}
					]
				},
				'Pastoral Status': {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: properties.status as string
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
								content: properties.uid as string
							}
						}
					]
				},
				Email: {
					type: 'email',
					email: properties.email as string
				}
			}
		})
		console.log(response)
		res.status(200).json(response)
	} catch (err) {
		console.error(err)
		res.status(500).json(err)
	}
}

export default sendRegistration
