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
