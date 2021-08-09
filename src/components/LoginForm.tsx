import React from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

import { useRouter } from 'next/router'
import { login } from '../services/auth'
import { loginErrors } from '../utils/errors'

// import { login } from '../services/auth/auth'
// import { loginErrors } from '../utils/errors'

export const LoginForm: React.FC = () => {
	const router = useRouter()

	return (
		<Formik
			initialValues={{ email: '', pw: '', rememberMe: false }}
			validateOnBlur={false}
			validationSchema={Yup.object({
				email: Yup.string()
					.email('Invalid Email Address')
					.required('Required'),
				pw: Yup.string()
					.min(8, 'Must be 8 characters or more')
					.required('Required'),
				rememberMe: Yup.boolean()
			})}
			onSubmit={async (values, { setErrors }) => {
				console.log(JSON.stringify(values, null, 2))
				router.push('/home')
				try {
					await login({
						email: values.email,
						password: values.pw
					})
				} catch (err) {
					switch (err.code) {
						case 'auth/invalid-email': {
							alert(loginErrors.invalidEmail)
							setErrors({ email: 'Invalid email', pw: '' })
							break
						}
						case 'auth/user-disabled': {
							alert(loginErrors.userDisabled)
							setErrors({
								email: 'Email has been disabled',
								pw: ''
							})
							break
						}
						case 'auth/user-not-found': {
							alert(loginErrors.userNotFound)
							setErrors({
								email: 'Email not registered',
								pw: ''
							})
							break
						}
						case 'auth/wrong-password': {
							alert(loginErrors.wrongPassword)
							setErrors({
								email: '',
								pw: 'Password is incorrect'
							})
							break
						}
					}
				}
			}}
		>
			{({ errors, touched, values }) => (
				<Form className="w-full flex flex-col items-center h-full justify-center">
					<Field
						id="email"
						name="email"
						placeholder={values.email !== '' ? null : 'Email'}
						className="focus-within:outline-none  text-[#210440] bg-[#fff] w-full text-center font-montserrat text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]"
					/>
					{errors.email && touched.email ? (
						<div className="text-red-700 h-10">{errors.email}</div>
					) : (
						<div className="h-10" />
					)}
					<Field
						id="pw"
						name="pw"
						type="password"
						placeholder={values.pw !== '' ? null : 'Password'}
						className="focus-within:outline-none  text-[#210440] bg-[#fff] w-full text-center font-montserrat text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]"
					/>
					{errors.pw && touched.pw ? (
						<div className="text-red-700 h-10">{errors.pw}</div>
					) : (
						<div className="h-10" />
					)}
					<button
						type="submit"
						className="rounded-[4px] bg-[#210440] text-[#fff] font-montserrat lg:text-base text-sm lg:py-2 py-1 text-center lg:w-[200px] w-[100px] transform hover:scale-[1.2] hover:text-[#210440] hover:bg-[#FFBA00] transition ease-in-out duration-500"
					>
						Log In
					</button>
				</Form>
			)}
		</Formik>
	)
}
