import { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import notion from '../../lib/notion'
import { getEnvVar } from '../../utils/helpers'

const sendRegWorship = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const reciept = req.body.reciept
	const properties: Notion.User = req.body.user

	const { env: dbId, error } = getEnvVar('NOTION_WORSHIPNIGHT_DATABASE_ID')
	if (error) throw error

	const { env: imgbbApi, error: error2 } = getEnvVar('IMGBB_API_KEY')
	if (error2) throw error2

	const form = new FormData()
	form.append('image', reciept)

	// Send a POST request to upload the image to ImgBB
	const fetchRes = await fetch(
		`https://api.imgbb.com/1/upload?key=${imgbbApi}`,
		{
			method: 'POST',
			body: form as unknown as BodyInit
		}
	)
	const imgbbRes = await fetchRes.json()

	// If uploading fails fail the request
	if (!(fetchRes.status === 200)) {
		res.status(404).json(new Error('Unable to upload image to ImgBB'))
		return
	}

	try {
		const checkRes = await notion.databases.query({
			database_id: dbId as string,
			filter: {
				and: [
					{
						property: 'Uid',
						text: { equals: properties.uid as string }
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
								content:
									properties.fullName?.toUpperCase() as string
							}
						}
					]
				},
				Receipt: {
					type: 'url',
					url: imgbbRes.data.url
				},
				'Full Address': {
					type: 'rich_text',
					rich_text: [
						{
							type: 'text',
							text: {
								content: ((properties.address1 as string) +
									' ' +
									properties.address2) as string
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

export default sendRegWorship
