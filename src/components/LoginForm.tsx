/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

import { useRouter } from 'next/router'
import { login } from '../services/auth'
// import { loginErrors } from '../utils/errors'

// import { login } from '../services/auth/auth'
// import { loginErrors } from '../utils/errors'

export const LoginForm: React.FC = () => {
	const router = useRouter()
	const [show, setshow] = useState<boolean>(false)
	const [disabled, setDisabled] = useState<boolean>(false)

	return (
		<Formik
			initialValues={{ email: '', pw: '' }}
			validateOnBlur={false}
			validationSchema={Yup.object({
				email: Yup.string()
					.email('Invalid Email Address')
					.required('Required'),
				pw: Yup.string()
					.min(8, 'Must be 8 characters or more')
					.required('Required')
			})}
			onSubmit={async (values, { setErrors }) => {
				// console.log(JSON.stringify(values, null, 2))
				setDisabled(true)
				router.push('/home')
				try {
					await login({
						email: values.email,
						password: values.pw
					})
				} catch (err) {
					switch (err.code) {
						case 'auth/invalid-email': {
							// alert(loginErrors.invalidEmail)
							setErrors({ email: 'Invalid email', pw: '' })
							setDisabled(false)
							break
						}
						case 'auth/user-disabled': {
							// alert(loginErrors.userDisabled)
							setErrors({
								email: 'Email has been disabled',
								pw: ''
							})
							setDisabled(false)
							break
						}
						case 'auth/user-not-found': {
							// alert(loginErrors.userNotFound)
							setErrors({
								email: 'Email not registered',
								pw: ''
							})
							setDisabled(false)
							break
						}
						case 'auth/wrong-password': {
							// alert(loginErrors.wrongPassword)
							setErrors({
								email: '',
								pw: 'Password is incorrect'
							})
							setDisabled(false)
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
						type={show ? 'text' : 'password'}
						placeholder={values.pw !== '' ? null : 'Password'}
						className="focus-within:outline-none  text-[#210440] bg-[#fff] w-full text-center font-montserrat text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]"
					/>
					{errors.pw && touched.pw ? (
						<div className="text-red-700">{errors.pw}</div>
					) : (
						<div className="" />
					)}
					<div className=" flex flex-row mx-auto items-center">
						<p
							className="font-montserrat text-lg text-[#210440] mr-2 cursor-pointer"
							onClick={() => setshow(show ? false : true)}
						>
							Show Password
						</p>
						<input
							type="checkbox"
							checked={show}
							className="my-5 w-5 h-5"
							onChange={() => setshow(show ? false : true)}
						/>
					</div>

					<button
						type="submit"
						disabled={disabled}
						className="rounded-[4px] bg-[#210440] text-[#fff] font-montserrat lg:text-base text-sm lg:py-2 py-1 text-center lg:w-[200px] w-[100px] transform hover:scale-[1.2] hover:text-[#210440] hover:bg-[#FFBA00] transition ease-in-out duration-500"
					>
						Log In
					</button>
				</Form>
			)}
		</Formik>
	)
}
