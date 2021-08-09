import type { NextApiRequest, NextApiResponse } from 'next'
import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from '../../services/auth/next-firebase-auth'

// Initialize authentication
initAuth()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	try {
		// Unset the auth cookies from user's browser
		await unsetAuthCookies(req, res)
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err)
		return res.status(500).json({ error: 'Unexpected error.' })
	}
	return res.status(200).json({ status: true })
}

export default handler
