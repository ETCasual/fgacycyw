import type { NextApiRequest, NextApiResponse } from 'next'
import { setAuthCookies } from 'next-firebase-auth'
import initAuth from '../../services/auth/next-firebase-auth'

// Initialize Authentication
initAuth()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	try {
		// Set auth cookies in user's browser
		await setAuthCookies(req, res)
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err)
		return res.status(500).json({ error: 'Unexpected error.' })
	}
	return res.status(200).json({ status: true })
}

export default handler
