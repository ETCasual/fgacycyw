/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	check,
	body,
	ValidationChain,
	ValidationError,
	validationResult
} from 'express-validator'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect, { NextConnect, NextHandler } from 'next-connect'

import { IncomingMessage, ServerResponse } from 'node:http'
import NextCors from 'nextjs-cors'
// import { server } from '../../../config'
// import cors, { CorsOption, CorsOptionDelegate } from 'cors';

/**
 * An interface to define the structure of a middleware
 */
interface NextMiddleware {
	(
		req: NextApiRequest,
		res: NextApiResponse,
		next: NextHandler
	): Promise<void>
}

/**
 * To run each of the validation given on the request body
 * @param validations - Array of ValidationChain used to validate the request body.
 * @returns a middleware
 */
const initValidation = (validations: ValidationChain[]): NextMiddleware => {
	const middleware: NextMiddleware = async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)))
		const errors = validationResult(req)
		if (errors.isEmpty()) return next()
		const err: ValidationError[] = []
		errors.array().map((error) => err.push(error.msg))

		res.status(400).json({ success: false, data: null, error: err })
	}

	return middleware
}

const checkCORS: NextMiddleware = async (req, res, next) => {
	if (process.env.NODE_ENV === 'production') {
		try {
			// Run the cors middleware
			// nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
			await NextCors(req, res, {
				// Options
				methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
				origin: 'https://app.yabee.com.my',
				optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
			})
		} catch (err) {
			console.error(err)
			return res.status(403).json({
				success: false,
				data: null,
				error: { msg: 'Forbidden' }
			})
		}
	} else {
		try {
			// Run the cors middleware
			// nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
			await NextCors(req, res, {
				// Options
				methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
				origin: '*',
				optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
			})
		} catch (err) {
			console.error(err)
			return res.status(403).json({
				success: false,
				data: null,
				error: { msg: 'Forbidden' }
			})
		}
	}

	// Continue the execution of handler
	next()
}

/**
 * Runs a middleware through a GET handler
 * @param middleware - Middleware to run through
 * @returns handler for GET
 */
const get = (
	middleware: NextMiddleware
): NextConnect<IncomingMessage, ServerResponse> => {
	return nextConnect().get(middleware)
}

/**
 * Runs a middleware through a POST handler
 * @param middleware - Middlware to run through
 * @returns handler for POST
 */
const post = (
	middleware: NextMiddleware
): NextConnect<IncomingMessage, ServerResponse> => {
	return nextConnect().post(middleware)
}

/**
 * Default HTTP Handler
 */
const handler = nextConnect<NextApiRequest, NextApiResponse>()

export default handler
export { initValidation, check, checkCORS, body, post, get }
