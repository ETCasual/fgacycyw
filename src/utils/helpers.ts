/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Get an environment variable given its name
 * @param {string} envVar - the environment variable's name
 * @returns {string | Error} the environment variable or an Error if not available
 */
export const getEnvVar = (
	envVar: string
): { env: string | null; error: Error | null } => {
	const x = process.env[envVar]
	if (!x) {
		return {
			env: null,
			error: new Error(
				`Unable to fetch product lines, ${envVar} not provided in .env.local`
			)
		}
	}
	return { env: x, error: null }
}

export const convertto1D = (arrToConvert: string[][]): string[] => {
	let newArr: string[] = []
	for (let i = 0; i < arrToConvert.length; i++) {
		newArr = newArr.concat(arrToConvert[i])
	}
	return newArr
}

export const getDOBfromIC = (
	icno: string
): { parsedDate: string | null; error: Error | null } => {
	if (
		icno.replace(/-|\s/g, '').match(/^(\d{2})(\d{2})(\d{2})-?\d{2}-?\d{4}$/)
	) {
		let year = RegExp.$1
		const month = RegExp.$2
		const day = RegExp.$3
		console.log(year, month, day)

		const now = new Date().getFullYear().toString()

		const decade = now.substr(0, 2)
		if (now.substr(2, 2) > year) {
			year = parseInt(decade.concat(year.toString()), 10).toString()
		}

		const date = new Date(
			year as unknown as number,
			(month as unknown as number) - 1,
			day as unknown as number,
			0,
			0,
			0,
			0
		).toLocaleDateString('en-US', {
			timeZone: 'Asia/Kuala_Lumpur'
		})
		return { parsedDate: date, error: null }
	} else {
		return { parsedDate: null, error: new Error('Not a valid IC string') }
	}
}
