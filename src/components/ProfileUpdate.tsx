import React, { useState } from 'react'
import Select from 'react-select'
import * as Yup from 'yup'
import { Dialog } from '@headlessui/react'
import { Field, Form, Formik } from 'formik'
import ProgressBar from '@ramonak/react-progress-bar'
import { convertto1D } from '../utils/helpers'
import { FaFemale, FaMale } from 'react-icons/fa'
import {
	clusters,
	Force,
	ForceCG,
	genders,
	Heart,
	HeartCG,
	Mind,
	MindCG,
	Move,
	MoveCG,
	pastoralStatuses,
	Strike,
	StrikeCG,
	Voice,
	VoiceCG
} from '../utils/constants'

type ModalProps = {
	user?: Notion.User
}

export const ProfileUpdate: React.FC<ModalProps> = ({ user }) => {
	const [modalMode, setModalMode] = useState<boolean>(
		user?.fullName ? false : true
	)
	const [progress, updateProgress] = useState<number>(0)
	const [disabled1, setDisabled1] = useState<boolean>(false)
	return (
		<>
			<Dialog
				as="div"
				open={modalMode}
				className="fixed inset-0 z-10 backdrop-blur-[2px]"
				onClose={() => setModalMode(false)}
			>
				<div className="w-[11/12] px-3 sm:px-6 py-4 bg-[#31065f] fixed top-1/2 left-1/2 flex flex-col items-center text-white rounded-[4px] shadow-2xl transform -translate-y-1/2 -translate-x-1/2">
					<>
						<p className="text-4xl font-bebas font-bold text-center">
							Complete Your Profile{' '}
							<span role="img" aria-label="Clipboard">
								📋
							</span>
						</p>
						<div className="w-full px-3 my-2">
							<ProgressBar
								bgColor="rgb(5, 150, 105)"
								completed={progress}
								className="w-full"
								height="10px"
								isLabelVisible={false}
							/>
						</div>
						<Formik
							onSubmit={async (values) => {
								setDisabled1(true)
								console.log('Submitting')
								const res = await fetch(
									`/api/updateProfile/${user?.uid}`,
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										},
										credentials: 'same-origin',
										body: JSON.stringify(values)
									}
								)
								if (res.ok) {
									updateProgress(100)
								} else {
									alert(
										'There are some troubles updating your profile, Please contact developers for support'
									)
									setDisabled1(false)
								}
							}}
							validationSchema={Yup.object({
								fullName: Yup.string()
									.max(
										50,
										'Name must not exceed 50 characters'
									)
									.required('Required'),
								gender: Yup.string()
									.oneOf(genders)
									.required('Required'),
								address1: Yup.string().required('Required'),
								address2: Yup.string(),
								cluster: Yup.string().required('Required'),
								ic: Yup.string()
									.matches(
										/^\d{6}-\d{2}-\d{4}$/,
										'Invalid IC Format'
									)
									.required('Required'),
								nickname: Yup.string()
									.max(
										10,
										'Nickname must not exceed 10 characters'
									)
									.required('Required'),
								contact: Yup.string().matches(
									/^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
									'Invalid malaysian phone number'
								),
								cg: Yup.string().required('Required'),
								smallTeam: Yup.string().required('Required'),
								status: Yup.string().required('Required')
							})}
							initialValues={{
								fullName: '',
								nickname: '',
								contact: '',
								gender: 'male',
								address1: '',
								address2: '',
								smallTeam: '',
								cg: '',
								cluster: '',
								ic: '',
								status: ''
							}}
						>
							{({ setValues, errors, touched, values }) => (
								<Form className="mt-4 flex flex-col items-center">
									{progress == 0 ? (
										<>
											<Field
												id="fullName"
												name="fullName"
												placeholder={
													values.fullName !== ''
														? null
														: 'Full Name, eg: Chin Jia Hao'
												}
												className={`${
													errors.fullName &&
													touched.fullName
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.fullName &&
														  touched.fullName
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
											/>
											{errors.fullName &&
											touched.fullName ? (
												<div className="text-red-600 text-center mb-4">
													{errors.fullName}
												</div>
											) : null}
											<Field
												id="nickname"
												name="nickname"
												placeholder={
													values.nickname !== ''
														? null
														: 'Nickname, eg: John'
												}
												className={`${
													errors.nickname &&
													touched.nickname
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.nickname &&
														  touched.nickname
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
											/>
											{errors.nickname &&
											touched.nickname ? (
												<div className="text-red-600 text-center mb-4">
													{errors.nickname}
												</div>
											) : null}
											<Field
												id="contact"
												name="contact"
												pattern="[0-9]"
												oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
												placeholder={
													values.contact !== ''
														? values.contact
														: 'Phone No., eg: 012-3456789'
												}
												className={`${
													errors.contact &&
													touched.contact
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.contact &&
														  touched.contact
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
											/>
											{errors.contact &&
											touched.contact ? (
												<div className="text-red-600 text-center mb-4">
													{errors.contact}
												</div>
											) : null}
											<div
												className="flex flex-row justify-around w-full mb-4"
												role="group"
												aria-labelledby="my-radio-group"
											>
												<FaMale
													color={
														values.gender == 'male'
															? '#FFBA00'
															: 'white'
													}
													className="cursor-pointer transition ease-linear duration-100"
													size={50}
													onClick={() =>
														setValues(
															{
																...values,
																gender: 'male'
															},
															true
														)
													}
												/>
												<FaFemale
													className="cursor-pointer transition ease-linear duration-100"
													color={
														values.gender ==
														'female'
															? '#FFBA00'
															: 'white'
													}
													size={50}
													onClick={() =>
														setValues(
															{
																...values,
																gender: 'female'
															},
															true
														)
													}
												/>
											</div>
											<button
												className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-base lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
												onClick={() => {
													!errors.fullName &&
													!errors.nickname &&
													!errors.contact &&
													!errors.gender
														? updateProgress(33)
														: null
												}}
											>
												Next
											</button>
										</>
									) : progress == 33 ? (
										<>
											<Field
												id="ic"
												name="ic"
												placeholder={
													values.ic !== ''
														? null
														: 'IC No., eg: 000102-07-2201'
												}
												className={`${
													errors.ic && touched.ic
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.ic &&
														  touched.ic
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
											/>
											{errors.ic && touched.ic ? (
												<div className="text-red-600 text-center mb-4">
													{errors.ic}
												</div>
											) : null}
											<Field
												id="address1"
												name="address1"
												placeholder={
													values.address1 !== ''
														? null
														: 'Address Line 1'
												}
												className={`${
													errors.address1 &&
													touched.address1
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.address1 &&
														  touched.address1
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
											/>
											{errors.address1 &&
											touched.address1 ? (
												<div className="text-red-600 text-center mb-4">
													{errors.address1}
												</div>
											) : null}
											<Field
												id="address2"
												name="address2"
												placeholder={
													values.address2 !== ''
														? null
														: 'Address Line 2'
												}
												className={`${
													errors.address2 &&
													touched.address2
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.address2 &&
														  touched.address2
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]`}
											/>
											{errors.address2 &&
											touched.address2 ? (
												<div className="text-red-600 text-center mb-4">
													{errors.address2}
												</div>
											) : null}

											<Select
												id="cluster"
												name="cluster"
												onChange={(selection) =>
													setValues({
														...values,
														cluster:
															selection?.value as string
													})
												}
												placeholder={
													values.cluster !== ''
														? values.cluster
														: 'Cluster'
												}
												className={`${
													errors.cluster &&
													touched.cluster
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.cluster &&
														  touched.cluster
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] w-full bg-gray-200 text-center font-montserrat text-sm sm:text-base rounded-[4px] placeholder-[#a67bd4]`}
												options={clusters}
												isClearable={false}
												maxMenuHeight={150}
											/>

											{errors.cluster &&
											touched.cluster ? (
												<div className="text-red-600 text-center mb-4">
													{errors.cluster}
												</div>
											) : null}
											<button
												className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-base lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
												onClick={() => {
													!errors.ic &&
													!errors.address1 &&
													!errors.cluster
														? updateProgress(66)
														: null
												}}
											>
												Next
											</button>
										</>
									) : progress == 66 ? (
										<>
											<Select
												id="smallTeam"
												name="smallTeam"
												onChange={(selection) =>
													setValues({
														...values,
														smallTeam:
															selection?.value as string
													})
												}
												placeholder={
													values.smallTeam !== ''
														? values.smallTeam
														: 'Small Team'
												}
												className={`${
													errors.smallTeam &&
													touched.smallTeam
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.smallTeam &&
														  touched.smallTeam
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base rounded-[4px] placeholder-[#a67bd4]`}
												options={
													values.cluster == 'Move'
														? Move.map(
																(smallteam) =>
																	Object.create(
																		{
																			value: smallteam,
																			label: smallteam
																		}
																	)
														  )
														: values.cluster ==
														  'Voice'
														? Voice.map(
																(smallteam) =>
																	Object.create(
																		{
																			value: smallteam,
																			label: smallteam
																		}
																	)
														  )
														: values.cluster ==
														  'Mind'
														? Mind.map(
																(smallteam) =>
																	Object.create(
																		{
																			value: smallteam,
																			label: smallteam
																		}
																	)
														  )
														: values.cluster ==
														  'Force'
														? Force.map(
																(smallteam) =>
																	Object.create(
																		{
																			value: smallteam,
																			label: smallteam
																		}
																	)
														  )
														: values.cluster ==
														  'Heart'
														? Heart.map(
																(smallteam) =>
																	Object.create(
																		{
																			value: smallteam,
																			label: smallteam
																		}
																	)
														  )
														: Strike.map(
																(smallteam) =>
																	Object.create(
																		{
																			value: smallteam,
																			label: smallteam
																		}
																	)
														  )
												}
												isClearable={false}
												maxMenuHeight={150}
											/>

											{errors.smallTeam &&
											touched.smallTeam ? (
												<div className="text-red-600 text-center mb-4">
													{errors.smallTeam}
												</div>
											) : null}
											<Select
												id="cg"
												name="cg"
												onChange={(selection) =>
													setValues({
														...values,
														cg: selection?.value as string
													})
												}
												placeholder={
													values.cg !== ''
														? values.cg
														: 'CG'
												}
												className={`${
													errors.cg && touched.cg
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.cg &&
														  touched.cg
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base rounded-[4px] placeholder-[#a67bd4]`}
												options={
													values.cluster == 'Move'
														? convertto1D(
																MoveCG
														  ).map((cg) =>
																Object.create({
																	value: cg,
																	label: cg
																})
														  )
														: values.cluster ==
														  'Voice'
														? convertto1D(
																VoiceCG
														  ).map((cg) =>
																Object.create({
																	value: cg,
																	label: cg
																})
														  )
														: values.cluster ==
														  'Mind'
														? convertto1D(
																MindCG
														  ).map((cg) =>
																Object.create({
																	value: cg,
																	label: cg
																})
														  )
														: values.cluster ==
														  'Force'
														? convertto1D(
																ForceCG
														  ).map((cg) =>
																Object.create({
																	value: cg,
																	label: cg
																})
														  )
														: values.cluster ==
														  'Heart'
														? convertto1D(
																HeartCG
														  ).map((cg) =>
																Object.create({
																	value: cg,
																	label: cg
																})
														  )
														: convertto1D(
																StrikeCG
														  ).map((cg) =>
																Object.create({
																	value: cg,
																	label: cg
																})
														  )
												}
												isClearable={false}
												maxMenuHeight={150}
											/>

											{errors.cg && touched.cg ? (
												<div className="text-red-600 text-center mb-4">
													{errors.cg}
												</div>
											) : null}
											<Select
												id="status"
												name="status"
												onChange={(selection) =>
													setValues({
														...values,
														status: selection?.value as string
													})
												}
												placeholder={
													values.status !== ''
														? values.status
														: 'Status'
												}
												className={`${
													errors.status &&
													touched.status
														? 'ring-offset-1 ring-2 ring-red-600'
														: !errors.status &&
														  touched.status
														? 'ring-offset-1 ring-2 ring-green-600'
														: 'ring-offset-1 ring-2 ring-[#7e30d1]'
												} mb-4 focus-within:outline-none text-[#210440] lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] bg-gray-200 text-center font-montserrat text-sm sm:text-base rounded-[4px] placeholder-[#a67bd4]`}
												isClearable={false}
												maxMenuHeight={150}
												options={pastoralStatuses.map(
													(status) =>
														Object.create({
															value: status,
															label: status
														})
												)}
											/>
											{errors.status && touched.status ? (
												<div className="text-red-600 text-center mb-4">
													{errors.status}
												</div>
											) : null}
											<button
												disabled={disabled1}
												type="submit"
												className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-base lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
											>
												Update Profile
											</button>
										</>
									) : (
										<div className="w-full flex flex-col items-center">
											<p className="text-white font-bebas text-4xl font-bold text-center mb-4">
												Profile updated!{' '}
												<span
													role="img"
													aria-labelledby="Check Mark"
												>
													✔️
												</span>
											</p>
											<button
												className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-base lg:py-2 py-1 text-center lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] transform hover:scale-[1.035]  transition ease-in-out duration-500"
												onClick={() => {
													setModalMode(false)
													window.location.reload()
												}}
											>
												Close
											</button>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</>
				</div>
			</Dialog>
		</>
	)
}
