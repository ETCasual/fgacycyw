import { NextApiRequest, NextApiResponse } from 'next'
import notion from '../../lib/notion'
import { getEnvVar } from '../../utils/helpers'

const sendRegWorship = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const fullname = req.body.fullname
	const address = req.body.address
	const uid = req.body.uid
	const wnid = (Math.floor(Math.random() * 9999) + 1).toString()

	const { env: dbId, error } = getEnvVar('NOTION_WORSHIPNIGHT_DATABASE_ID')
	if (error) throw error

	try {
		const checkRes = await notion.databases.query({
			database_id: dbId as string,
			filter: {
				and: [
					{
						property: 'Uid',
						text: { equals: uid as string }
					}
				]
			}
		})

		console.log('res = ' + JSON.stringify(checkRes.results[0], null, 2))

		if (checkRes.results[0] !== undefined) {
			res.status(500).json(new Error('Registration Exists!'))
			return
		}

		const response = await notion.pages.create({
			parent: { database_id: dbId as string },
			properties: {
				'Full Name': {
					type: 'title',
					title: [
						{
							type: 'text',
							text: {
								content: fullname as string
							}
						}
					]
				},
				'Full Address': {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: address as string
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
								content: uid as string
							}
						}
					]
				},
				Approval: {
					type: 'checkbox',
					checkbox: true
				},
				WNID: {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content:
									wnid.length == 1
										? 'WN000' + wnid
										: wnid.length == 2
										? 'WN00' + wnid
										: wnid.length == 3
										? 'WN0' + wnid
										: 'WN' + wnid
							}
						}
					]
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

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '7mb'
		}
	}
}

export default sendRegWorship
