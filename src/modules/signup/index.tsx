import React, { useState } from 'react'
import * as Yup from 'yup'
// import ProgressBar from '@ramonak/react-progress-bar'
import Head from 'next/head'
import { Layout } from '../../components'
import { NextPage } from 'next'
import { Field, Form, Formik } from 'formik'
import { firebase } from '../../services/firebase'
import { signupErrors } from '../../utils/errors'
import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa'

const SignUp: NextPage = () => {
	const [disabled, setDisabled] = useState<boolean>()
	const router = useRouter()
	return (
		<>
			<Head>
				<title>Sign Up | FGACYCYW KL</title>
			</Head>
			{/* <Layout noFooter noNav className="relative"> */}
			<FaChevronLeft
				onClick={() => router.push('/login')}
				className="absolute top-5 lg:top-11 left-5"
				size={30}
				color="#210440"
			/>
			<div className="w-full px-5 sm:px-20">
				<p className="font-montserrat text-[#210440] text-3xl font-bold mt-5 mb-2 lg:mt-10 lg:mb-5 text-center">
					Sign Up
				</p>
				{/* <div className="w-full px-3">
						<ProgressBar
							bgColor="#210440"
							completed={progress}
							className="w-full"
							isLabelVisible={false}
						/>
					</div> */}
			</div>
			<div className="w-full px-5 sm:px-20 flex flex-col my-auto">
				<p className="font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-5">
					Firstly!
					<span className="inline sm:hidden">
						<br />
					</span>{' '}
					Let us know your credentials!{' '}
					<span className="inline lg:hidden">
						<br />
					</span>
					So we know how to log you in!
				</p>

				<Formik
					initialValues={{
						email: '',
						password: '',
						passwordConfirmation: ''
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email('Invalid Email Address')
							.required('Required'),
						password: Yup.string()
							.min(8, 'Must be 8 characters or more')
							.required('Required'),
						passwordConfirmation: Yup.string()
							.min(8, 'Must be 8 characters or more')
							.required('Required')
							.test(
								'passwords-match',
								'Passwords must match',
								function (value) {
									return this.parent.password === value
								}
							)
							.required('Required')
					})}
					onSubmit={async (values, { setErrors }) => {
						setDisabled(true)
						try {
							await firebase
								.auth()
								.createUserWithEmailAndPassword(
									values.email,
									values.password
								)
								.then((user) =>
									fetch(
										`/api/auth/signupNotion/${user.user?.uid}?email=${user.user?.email}`
									).then(() => router.push('/'))
								)
						} catch (err) {
							switch (err.code) {
								case 'auth/email-already-in-use': {
									setErrors({
										email: 'This email is in use.',
										password: ''
									})
									setDisabled(false)
									break
								}
								case 'auth/invalid-email': {
									setErrors({
										email: 'Invalid email',
										password: ''
									})
									setDisabled(false)
									break
								}
								case 'auth/weak-password': {
									setErrors({
										email: '',
										password:
											'Password must have more than 6 characters'
									})
									setDisabled(false)
									break
								}
								case 'auth/operation-not-allowed': {
									setErrors({
										email: '',
										password: ''
									})
									setDisabled(false)
									console.log(
										signupErrors.operationNotAllowed
									)
									break
								}
							}
						}
					}}
				>
					{({ errors, touched, values }) => (
						<Form className="w-full mx-auto flex flex-col items-center">
							<div className="flex flex-col items-end">
								<div className="flex flex-col sm:flex-row items-center">
									<label
										className="block text-lg font-montserrat leading-none w-full sm:w-[100px] sm:my-0 my-3"
										htmlFor="email"
									>
										Email
									</label>

									<Field
										id="email"
										name="email"
										placeholder={
											values.email !== '' ? null : 'Email'
										}
										className={`${
											errors.email && touched.email
												? 'ring-offset-1 ring-2 ring-red-600'
												: !errors.email && touched.email
												? 'ring-offset-1 ring-2 ring-green-600'
												: 'ring-offset-1 ring-2 ring-[#210440]'
										}  focus-within:outline-none ml-0 sm:ml-10 text-[#210440] lg:w-[400px] md:w-[300px] w-[250px] bg-gray-200 text-center font-montserrat text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
									/>
								</div>
								{errors.email && touched.email ? (
									<div className="text-red-700 sm:h-7 h-3 self-end">
										{errors.email}
									</div>
								) : (
									<div className="sm:h-7 h-3" />
								)}
								<div className="flex flex-col sm:flex-row items-center">
									<label
										className="block text-lg font-montserrat  leading-none  w-full sm:w-[100px]  sm:my-0 my-3"
										htmlFor="password"
									>
										Password
									</label>

									<Field
										id="password"
										name="password"
										type="password"
										placeholder={
											values.password !== ''
												? null
												: 'Password'
										}
										className={`${
											errors.password && touched.password
												? 'ring-offset-1 ring-2 ring-red-600'
												: !errors.password &&
												  touched.password
												? 'ring-offset-1 ring-2 ring-green-600'
												: 'ring-offset-1 ring-2 ring-[#210440]'
										}  focus-within:outline-none  ml-0 sm:ml-10 text-[#210440] bg-gray-200 lg:w-[400px] md:w-[300px] w-[250px] text-center font-montserrat text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
									/>
								</div>
								{errors.password && touched.password ? (
									<div className="text-red-700 sm:h-7 h-3 self-end">
										{errors.password}
									</div>
								) : (
									<div className="sm:h-7 h-3" />
								)}
								<div className="flex flex-col sm:flex-row items-center">
									<label
										className="block text-lg font-montserrat  leading-none  w-full sm:w-[100px]  sm:my-0 my-3"
										htmlFor="passwordConfirmation"
									>
										Confirm Password
									</label>

									<Field
										id="passwordConfirmation"
										name="passwordConfirmation"
										type="password"
										placeholder={
											values.passwordConfirmation !== ''
												? null
												: 'Password'
										}
										className={`${
											errors.passwordConfirmation &&
											touched.passwordConfirmation
												? 'ring-offset-1 ring-2 ring-red-600'
												: !errors.passwordConfirmation &&
												  touched.passwordConfirmation
												? 'ring-offset-1 ring-2 ring-green-600'
												: 'ring-offset-1 ring-2 ring-[#210440]'
										}  focus-within:outline-none  ml-0 sm:ml-10 text-[#210440] bg-gray-200 lg:w-[400px] md:w-[300px] w-[250px] text-center font-montserrat text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
									/>
								</div>
								{errors.passwordConfirmation &&
								touched.passwordConfirmation ? (
									<div className="text-red-700 sm:h-7 h-3 self-end">
										{errors.passwordConfirmation}
									</div>
								) : (
									<div className="sm:h-7 h-3" />
								)}
								<button
									type="submit"
									disabled={disabled}
									className="rounded-[4px] bg-[#210440] mt-3 text-[#fff] font-montserrat lg:text-base text-base py-2 text-center w-full transform hover:scale-[1.025] hover:text-[#210440] hover:bg-[#FFBA00] transition ease-in-out duration-500"
								>
									Sign Up
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			{/* </Layout> */}
		</>
	)
}

export default SignUp
