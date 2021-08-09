export const loginErrors: {
	invalidEmail: string
	userDisabled: string
	userNotFound: string
	wrongPassword: string
} = {
	invalidEmail: 'The email given is not a valid email address.',
	userDisabled:
		'This account has been disabled, contact customer support for further assistance.',
	userNotFound: 'Unable to find a user with this email.',
	wrongPassword: 'The password is wrong.'
}
export const signupErrors: {
	emailInUse: string
	invalidEmail: string
	weakPassword: string
	operationNotAllowed: string
} = {
	emailInUse: 'This email is already in use by another account.',
	invalidEmail: 'The email given is not a valid email address.',
	weakPassword: 'Password cannot be less than 6 characters.',
	operationNotAllowed:
		'Something is wrong with the server, please contact system admin.'
}
