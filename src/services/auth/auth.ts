import { firebase } from '../firebase'

export const login = async (options?: {
	email?: string
	password?: string
}): Promise<firebase.auth.UserCredential> => {
	// checking if proper arguments are passed in
	if (!options)
		throw new TypeError(
			'`options` cannot be undefined when using password login.'
		)
	const { email, password } = options
	if (!email)
		throw new TypeError(
			'`email` cannot be undefined when using password login.'
		)
	if (!password)
		throw new TypeError(
			'`password` cannot be undefined when using password login.'
		)

	const user = await firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
	return user
}

export const fetchSignInMethodsForEmail = async (
	email: string
): Promise<string[]> => {
	const methods = await firebase.auth().fetchSignInMethodsForEmail(email)
	return methods
}
