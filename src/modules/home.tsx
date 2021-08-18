/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NextPage } from 'next'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Card, Layout, Loader } from '../components'
import Select from 'react-select'
import * as Yup from 'yup'
import {
	FaChevronDown,
	FaInstagram,
	FaYoutube,
	FaMale,
	FaFemale,
	FaChevronUp
} from 'react-icons/fa'
import { IoIosArrowDropdown } from 'react-icons/io'
import router from 'next/router'
import Head from 'next/head'
import { useAuthUser } from 'next-firebase-auth'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Field, Form, Formik } from 'formik'
import ProgressBar from '@ramonak/react-progress-bar'
import { convertto1D } from '../utils/helpers'
import Slider from 'react-slick'
// import initAuth from '../services/auth/next-firebase-auth'
// import getUserData from '../pages/api/auth/[id]'

export const genders = ['male', 'female']

// TODO: change image
const cards = [
	{
		image: '/assets/warriorConfBannerSmall.jpg',
		name: 'Warriors Conference',
		to: '/warriorConference'
	}
	// {
	// 	image: '/assets/testimonies.png',
	// 	name: 'Testimonies',
	// 	to: '/testimonies'
	// },
	// {
	// 	image: '/assets/DNA.jpeg',
	// 	name: 'Our Church: DNA Series',
	// 	to: '/dna'
	// },
	// {
	// 	image: '/assets/moment.jpg',
	// 	name: 'Moments With Us',
	// 	to: '/moments'
	// }
]

export type HomeProps = {
	user?: Notion.User
	userToken?: string
	error?: boolean
}
export const structure = {
	Move: [
		{
			smallteam: 'Move 1 | Yap Ai Ling',
			cg: ['CYC 15T | Yap Ai Ling']
		},
		{
			smallteam: 'Move 2 | Elaine Teoh Engyin',
			cg: [
				'CYC 04J | Chong You You',
				'CYC 25J | Wong Chu Hui',
				'CYC 37J (A) | Lau Yiew Ming',
				'CYC 37J (B) | Tan Ann Hui',
				'CYC 41J | Shuvia Pang',
				'CYC 43J | Wang Mee Kee'
			]
		},
		{
			smallteam: 'Move 3 | Chhui Chong San',
			cg: [
				'CYC 17J (A) | Wong Pao Xuan',
				'CYC 17J (B) | Chan Lai Teng',
				'CYC 42J | Teo Min Hang',
				'CYC 47J | Chan Pui Yan',
				'CYC 107J | Fong Chung Sang'
			]
		}
	],
	Voice: [
		{
			smallteam: 'Voice 1 | Derek Yeow Han Xiang',
			cg: [
				'CYC 60J (A) | Isabelle Chan Po Teng',
				'CYC 60J (B) | Lee Jia Yin'
			]
		},
		{
			smallteam: 'Voice 2 | Sunil Kumar / Tan Peck Wah',
			cg: [
				'CYC 20J | Sunil Kumar',
				'CYC 23J | Wong Wei Sheng',
				'CYC 100T | Shum Wai Lok'
			]
		},
		{
			smallteam: 'Voice 3 | Teressa Tang',
			cg: [
				'CYC 19J | Emily Him Min Li',
				'CYC 111J (A) | Wang Hao Hua',
				'CYC 111J (B) | Amanda Him Kye Li'
			]
		},
		{
			smallteam: 'Voice 4 | Goh Zheng Yang',
			cg: [
				'CYC 21J | Saw Li Hua',
				'CYC 26J (A) | Beverly Yip Yi-Man',
				'CYC 26J (B) | Goh Zheng Yang',
				'CYC 62T (A) | Jason Mak Kah Chun',
				'CYC 62J (B) | Lie Wai Kien',
				'CYC 90J | Yap Yuan Joe'
			]
		}
	],
	Mind: [
		{
			smallteam: 'Mind 1 | Soon Mei Shi',
			cg: [
				'CYC 113J (A) | Lew Qian Yi',
				'CYC 113J (B) | Chong Liu Ying',
				'CYC 113J (C) | Yew Jia Ying',
				'CYC 35J (A) | Yong Xun Ying',
				'CYC 35J (B) | Thiam Yew Mun',
				'CYC 16J | Law Mei Jia, Christie Micda'
			]
		},
		{
			smallteam: 'Mind 2 | Wong How Han',
			cg: ['CYC 44T | Wong How Han']
		}
	],
	Force: [
		{
			smallteam: 'One Force | Json Low',
			cg: [
				'CYC 71J | Yap Ee Ling',
				'CYC 112J | Queenie Tan Sze Yuee',
				'CYC 77J | Gilbert Hu Chang Hou',
				'CYC 46J (A) | Angeline Tan Ho Yen',
				'CYC 46J (B) | Angeline Tan Ho Yen'
			]
		}
	],
	Heart: [
		{
			smallteam: 'Heart 1 | Foong Dawn Hui',
			cg: [
				'CYC 02S | Choong Zheng Xuan',
				'CYC 79S | Chin Jia Hao',
				'CYC 86J | Teo Jia Yue'
			]
		},
		{
			smallteam: 'Heart 2 | Teo Jia Xin',
			cg: ['CYC 59J | Priscilla Lua Sim Yee', 'CYC 73S | Tan Li Zhang']
		},
		{
			smallteam: 'Heart 3 | Loh Xin Kai',
			cg: [
				'CYC 32S (A) | Joseph Chong Zuo Nian',
				'CYC 32S (B) | Loh Xin Kai'
			]
		}
	],
	Strike: [
		{
			smallteam: 'Strike 1 | Yew Chi Joon / Lee Cheng Yee',
			cg: ['CYC 45S | Ng Hui Yee', 'CYC 74S | Yap Wen Teng']
		},
		{
			smallteam: 'Strike 2 | Khor Tet Woei / Phoebe Liew / Cherie Hoo',
			cg: [
				'CYC 22T | Lim Sheng Kai',
				'CYC 27T | Ling Angel',
				'CYC 51T | Loh Wai Ling'
			]
		}
	]
}

export const pastoralStatuses = [
	'TL / ZL',
	'SCGL',
	'PCGL / CGL',
	'OM',
	'NB',
	'NF'
]

export const clusters = [
	{ value: 'Move', label: 'Move' },
	{ value: 'Voice', label: 'Voice' },
	{ value: 'Mind', label: 'Mind' },
	{ value: 'Force', label: 'Force' },
	{ value: 'Heart', label: 'Heart' },
	{ value: 'Strike', label: 'Strike' }
]
const cg1 = Object.values(structure).map((teams) =>
	teams.map((team) => team.cg.map((cg) => cg))
)
export const [MoveCG, VoiceCG, MindCG, ForceCG, HeartCG, StrikeCG] = cg1

const smallteams1 = Object.values(structure).map((teams) =>
	teams.map((team) => team.smallteam)
)
export const [Move, Voice, Mind, Force, Heart, Strike] = smallteams1

const Home: NextPage<HomeProps> = ({ user, userToken }) => {
	console.log(user?.uid)

	const [modalMode, setModalMode] = useState<boolean>(
		user?.fullName ? false : true
	)
	const [disabled1, setDisabled1] = useState<boolean>(false)
	const [aboutUs, setAboutUs] = useState<boolean>(false)
	const [progress, updateProgress] = useState<number>(0)
	const [mounted, setMounted] = useState<boolean>(false)
	useEffect(() => {
		setTimeout(() => {
			setMounted(true)
		}, 2000)
	}, [])

	if (!mounted) return <Loader />

	return (
		<>
			<Head>
				<title>Home | FGACYCYW KL</title>
			</Head>
			<Layout currentPage="home" user={user} noFooter hscreen={false}>
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
												'Content-Type':
													'application/json'
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
									smallTeam:
										Yup.string().required('Required'),
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
															values.gender ==
															'male'
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
																	(
																		smallteam
																	) =>
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
																	(
																		smallteam
																	) =>
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
																	(
																		smallteam
																	) =>
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
																	(
																		smallteam
																	) =>
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
																	(
																		smallteam
																	) =>
																		Object.create(
																			{
																				value: smallteam,
																				label: smallteam
																			}
																		)
															  )
															: Strike.map(
																	(
																		smallteam
																	) =>
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
																	Object.create(
																		{
																			value: cg,
																			label: cg
																		}
																	)
															  )
															: values.cluster ==
															  'Voice'
															? convertto1D(
																	VoiceCG
															  ).map((cg) =>
																	Object.create(
																		{
																			value: cg,
																			label: cg
																		}
																	)
															  )
															: values.cluster ==
															  'Mind'
															? convertto1D(
																	MindCG
															  ).map((cg) =>
																	Object.create(
																		{
																			value: cg,
																			label: cg
																		}
																	)
															  )
															: values.cluster ==
															  'Force'
															? convertto1D(
																	ForceCG
															  ).map((cg) =>
																	Object.create(
																		{
																			value: cg,
																			label: cg
																		}
																	)
															  )
															: values.cluster ==
															  'Heart'
															? convertto1D(
																	HeartCG
															  ).map((cg) =>
																	Object.create(
																		{
																			value: cg,
																			label: cg
																		}
																	)
															  )
															: convertto1D(
																	StrikeCG
															  ).map((cg) =>
																	Object.create(
																		{
																			value: cg,
																			label: cg
																		}
																	)
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
												{errors.status &&
												touched.status ? (
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

				{/* <div
					className="w-full px-5 sm:px-20 "
					onClick={() => authUser.signOut()}
				>
					<p className="font-bebas text-[#210440] xl:text-5xl lg:text-4xl text-2xl font-bold sm:mt-5 sm:mb-2 mt-3 mb-1 lg:mt-10 lg:mb-5">
						Hello, {user?.nickname}
					</p>
				</div> */}
				<div className="w-full h-full flex flex-col px-5 sm:px-20 mt-10 mb-3">
					{/* <p className="text-xl mb-3 mt-0 lg:mt-3  font-bebas text-[#210440] font-semibold">
						Welcome Home!
					</p> */}
					<div className="sm:flex flex-row w-[300px] justify-between hidden">
						<p
							className={`font-century  text-[#210440] text-lg ${
								!aboutUs
									? 'pb-1 border-b-[3px] border-[#FFBA00]'
									: 'cursor-pointer'
							}`}
							onClick={() => setAboutUs(false)}
						>
							Ready, Go!
						</p>
						<p
							className={`font-century text-[#210440]  text-lg ${
								aboutUs
									? 'pb-1 border-b-[3px] border-[#FFBA00]'
									: 'cursor-pointer'
							}`}
							onClick={() => setAboutUs(true)}
						>
							It all starts here...
						</p>
					</div>
					<Menu as="div" className="w-[170px] relative sm:hidden">
						<div>
							<Menu.Button className="inline-flex justify-between w-full px-4 py-2 text-sm font-montserrat bg-[#210440] text-[#fff] hover:bg-opacity-30">
								{aboutUs
									? 'It all starts here...'
									: 'Ready, GO!'}
								<FaChevronDown
									className="w-3 h-3 self-center ml-2 -mr-1 text-violet-200 hover:text-violet-100"
									aria-hidden="true"
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute left-0 z-[2] w-full origin-top-right rounded-md shadow-lg focus:outline-none">
								<div>
									<Menu.Item>
										<button
											onClick={() =>
												aboutUs
													? setAboutUs(false)
													: setAboutUs(true)
											}
											className="bg-white text-[#210440] border-[1px] border-[#210440] flex items-center w-full px-2 py-2 text-sm"
										>
											{aboutUs
												? 'Ready, GO!'
												: 'It all starts here...'}
										</button>
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				{/* <iframe
					src="https://www.youtube.com/embed/uGaRPMsFXnc"
					title="YouTube video player"
					frameBorder="0"
					className=" px-10 sm:px-20 w-full h-[500px]"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/> */}

				{!aboutUs ? (
					// TODO: sm:grid-cols-1 must chg to grid-cols-2 when develop further
					<>
						<div className="grid sm:grid-cols-1  grid-cols-1 gap-0 sm:gap-3 px-0 sm:px-20 items-center justify-center w-full">
							{cards.map((card, i) => (
								<Card
									key={i}
									to={card.to}
									image={card.image}
									name={card.name}
								/>
							))}
						</div>
						<div className="px-0 w-full sm:px-20 rounded-none sm:rounded-md">
							<Slider
								className="w-full h-[600px] lg:h-[500px] rounded-none sm:rounded-md"
								infinite
								autoplay
								autoplaySpeed={5000}
								dots={false}
								draggable
								arrows={false}
							>
								<div className="flex flex-col items-start px-5 bg-[#210440] pt-7 h-[600px] lg:h-[500px] relative">
									<img
										src="/assets/json.png"
										alt="Json"
										className="absolute right-0 sm:right-5 md:right-20 bottom-0 transform scale-[1] md:scale-[1.4] xl:scale-[2]"
									/>
									<p className="font-chiTitle font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-[#FFBA00]">
										前言 I{' '}
										<span className="hidden sm:inline">
											|{' '}
										</span>
										<br className="inline sm:hidden" />
										年轻就是未来
									</p>
									<div className="flex flex-col xl:flex-row w-full">
										<div className="flex flex-col">
											<pre className="font-chiText leading-[1.25rem] sm:leading-none lg:text-3xl sm:text-2xl text-xl  text-white">{`你认识神在你里面投入的潜能吗?\n你知道你被创造的目的\n是来为了重要的使命与命定吗？`}</pre>
											<pre className="font-chiText leading-[1.25rem] sm:leading-none lg:text-3xl sm:text-2xl text-xl  text-white my-3">{`别让普通埋没你的目的\n别让别人定位你的生命\n发掘你属神的品格\n发现神在你里面的能力！`}</pre>
										</div>
										<pre
											style={{
												WebkitTextStroke:
													'0.5px #FFBA00'
											}}
											className="font-chiText tracking-[-0.075em] sm:leading-none xl:text-7xl lg:text-5xl sm:text-4xl text-3xl xl:self-center font-bold mt-5 md:mt-0 xl:mx-auto text-[#FFb59b] transform transition duration-300 ease-in-out hover:scale-[1.05] hover:text-[#FFBA00] "
										>{`成为命定中的勇士\n成为非凡卓越的你！`}</pre>
									</div>
								</div>

								<div className="flex flex-col bg-[#FFBA00] items-start px-5 pt-7 h-[600px] lg:h-[500px] relative">
									{/* <img
										src="/assets/zh.png"
										alt="Zhi Hao"
										className="absolute right-0 sm:right-5 md:right-20 bottom-0 transform scale-[1] md:scale-[1.7] xl:scale-[2.3]"
									/> */}
									<p className="font-chiTitle font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-[#210440]">
										前言 II | - 寻 -
									</p>
									<div className="flex flex-col w-full">
										<div className="flex flex-col sm:flex-row">
											<pre className="font-chiText leading-[1.25rem] sm:leading-none lg:text-3xl sm:text-2xl text-xl  text-black">{`当撒母耳寻找被\n恩膏的下一任领袖时，\n耶西 (大卫的爸爸)\n却忽略了大卫。\n在这时代或许我们都\n期盼自己的努力被看见\n被重视，被知道，\n出尽法宝的让自己成名。\n但一切的努力所换来的`}</pre>
											<pre className="font-chiText leading-[1.25rem] block lg:hidden sm:leading-none lg:text-3xl sm:text-2xl text-xl  text-black my-2 sm:my-0">{`却与我们的\n付出不成正比\n感觉神很不公平!\n自己就像是\n那被遗忘的。\n但奇妙的神却\n找上了大卫\n看见了他!\n你的未来看似\n在自己的手里\n神却知道你\n未知的未来!`}</pre>
											<pre className="font-chiText leading-[1.25rem] lg:block hidden sm:leading-none lg:text-3xl sm:text-2xl text-xl  text-black my-2 sm:my-0">{`却与我们的付出不成正比\n感觉神很不公平!\n自己就像是那被遗忘的。\n但奇妙的神却\n找上了大卫看见了他!\n你的未来看似\n在自己的手里\n神却知道你未知的未来!`}</pre>
										</div>
										<pre className="font-chiText tracking-[-0.075em] block lg:hidden sm:leading-none xl:text-7xl lg:text-5xl sm:text-4xl text-3xl font-bold mt-2 xl:ml-5 text-[#210440] transform transition duration-300 ease-in-out hover:scale-[1.05]">{`让被遗忘的你\n在这特会里被神寻见!`}</pre>
										<pre className="font-chiText tracking-[-0.075em] lg:block hidden sm:leading-none xl:text-7xl lg:text-5xl sm:text-4xl text-3xl font-bold mt-2 xl:ml-5 text-[#210440] transform transition duration-300 ease-in-out hover:scale-[1.05]">{`让被遗忘的你 在这特会里被神寻见!`}</pre>
									</div>
								</div>
								<div className="flex flex-col bg-[#210440] items-center justify-center px-5 pt-7 h-[600px] lg:h-[500px] relative">
									<div className="flex flex-col text-center items-center justify-center">
										<FaChevronUp
											color="#FFBA00"
											size={150}
											className="animate-bounce"
										/>
										<p className="text-4xl lg:text-6xl text-[#FFBA00] text-center mx-auto font-chiTitle">
											点击以上卡片{' '}
											<br className="md:hidden inline" />
											赶快报名吧!
										</p>
									</div>
								</div>
							</Slider>
						</div>
					</>
				) : (
					<div className="w-full h-full px-10 sm:px-20">
						<p className="text-2xl my-3 font-bebas tracking-[0.025em] text-[#210440] font-semibold">
							Follow Us!
						</p>
						<div
							className="pl-0 sm:pl-10 flex flex-row cursor-pointer"
							onClick={() =>
								router.push('https://instagram.com/fgacycyw')
							}
						>
							<div className="rounded-md bg-[#210400] p-1">
								<FaInstagram color="white" size={35} />
							</div>
							<p className="font-montserrat pl-3 self-center text-2xl font-semibold tracking-widest">
								Instagram
							</p>
						</div>
						<div
							className="pl-0 sm:pl-10 flex flex-row cursor-pointer mt-5"
							onClick={() =>
								router.push(
									'https://www.youtube.com/user/fgacyc'
								)
							}
						>
							<div className="rounded-md bg-[#210400] p-1">
								<FaYoutube color="white" size={35} />
							</div>
							<p className="font-montserrat pl-3 self-center text-2xl font-semibold tracking-widest">
								YouTube
							</p>
						</div>
					</div>
				)}
			</Layout>
		</>
	)
}

export default Home
