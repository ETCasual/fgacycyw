import { NextApiRequest, NextApiResponse } from 'next'
import notion from '../../../lib/notion'
import { getDOBfromIC, getEnvVar } from '../../../utils/helpers'

const updateProfile = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const uid = req.query.uid

	const properties = req.body as API.User

	const { env: userDatabaseId, error } = getEnvVar('NOTION_USER_DATABASE_ID')

	if (error) throw error

	try {
		const response = await notion.databases.query({
			database_id: userDatabaseId as string,
			filter: {
				and: [{ property: 'Uid', text: { equals: uid as string } }]
			}
		})

		const pageId = response.results[0].id

		const result = await notion.pages.update({
			page_id: pageId,
			archived: false,
			properties: {
				'Full Name': {
					type: 'title',
					title: [
						{
							type: 'text',
							text: {
								content: properties.fullName.toUpperCase()
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
								content: properties.nickname
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
								content: properties.contact
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
								content: properties.gender
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
								content: properties.address1
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
								content: properties.cluster
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
								content: properties.smallTeam
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
								content: properties.cg
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
								content: getDOBfromIC(
									properties.ic
								)?.toLocaleDateString('en-US', {
									timeZone: 'Asia/Kuala_Lumpur'
								}) as string
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
								content: properties.ic
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
								content: properties.status
							}
						}
					]
				}
			}
		})
		console.log(result)
		res.status(200).json(result)
	} catch (err) {
		console.error(err)
		res.status(500).json(err)
	}
}

export default updateProfile
