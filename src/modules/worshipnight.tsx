/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dialog } from '@headlessui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { Layout, Loader } from '../components'
import 'react-vertical-timeline-component/style.min.css'
import ProgressBar from '@ramonak/react-progress-bar'

import { toBase64 } from '../utils/helpers'
import { WorshipNightProps } from '../pages/worshipnight'
import { useRouter } from 'next/router'

const WorshipNight: NextPage<WorshipNightProps> = ({
	user,
	registration_data,
	registered
}) => {
	// console.log(JSON.stringify(registration_data, null, 2))
	const [mounted, setMounted] = useState<boolean>(false)
	const [isModalOpen, setModalState] = useState<boolean>(false)
	const [isDisabled, setDisabled] = useState<boolean>(false)
	const [progress, setProgress] = useState<number>(0)
	const [file, setFile] = useState<File | null>()
	const router = useRouter()

	const uploadtoNotion = async (file: File, user: Notion.User) => {
		console.log('uploading to imgbb')
		console.log('user submission: ' + user)
		const imgB64 = await toBase64(file)

		if (imgB64 instanceof Error) {
			console.error('Failed to encode Image')
			alert('图片上传失败，请重新加载网页😬')
			return
		}
		const res = await fetch('/api/registerWorship', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify({
				user: user,
				reciept: imgB64
			})
		})
		if (res.ok) {
			setDisabled(false)
			setProgress(100)
		} else {
			alert(
				'对不起，上传当中出现了状况，请重新加载网页再尝试 😕\n若问题再现 请告诉组长 😉'

				// JSON.stringify(user, null, 2)
			)
			setProgress(0)
			setDisabled(false)
			setModalState(false)
		}
	}
	useEffect(() => {
		setTimeout(() => {
			setMounted(true)
		}, 2000)
	}, [])

	if (!mounted) return <Loader />

	return (
		<>
			<Head>
				<title>Worship Night | FGACYCYW KL</title>
			</Head>
			<Layout
				currentPage="home"
				className="overflow-hidden relative"
				user={user}
				noFooter
				hscreen={false}
				itemscenter={false}
			>
				<Dialog
					as="div"
					open={isModalOpen}
					className="fixed inset-0 z-10 backdrop-blur-[2px]"
					onClose={() => setModalState(false)}
				>
					<div className="w-[310px] sm:w-[500px] px-3 sm:px-6 py-4 bg-[#31065f] fixed top-1/2 left-1/2 flex flex-col items-center text-white rounded-[4px] shadow-2xl transform -translate-y-1/2 -translate-x-1/2">
						<p className="text-3xl font-bebas tracking-[0.025em] font-bold text-center">
							报名步骤{' '}
							<span role="img" aria-label="bookmark-tab">
								📑
							</span>
						</p>
						<div className="w-full px-3 mt-2 mb-5">
							<ProgressBar
								bgColor="rgb(5, 150, 105)"
								completed={progress}
								className="w-full"
								height="10px"
								isLabelVisible={false}
							/>
						</div>

						{progress == 0 ? (
							<img
								src={'/assets/tng/tng-ss-personal.png'}
								alt="Tng-ss"
								className="object-cover mx-auto w-[200px] sm:w-[400px]"
							/>
						) : progress == 33 ? (
							<img
								src={'/assets/tng/tng-ss-sent.png'}
								alt="Tng-ss"
								className="object-cover mx-auto w-[200px] sm:w-[400px]"
							/>
						) : null}
						{progress == 0 ? (
							<p className="font-semibold text-lg my-2 px-5">
								1. 用户们需使用{' '}
								<span className="text-yellowmain">
									TNG E-Wallet
								</span>{' '}
								Scan 以上的QR码把对应的报名费 (RM5) 提交
								<br />
								或以{' '}
								<span className="text-yellowmain">
									TNG E-Wallet Transfer
								</span>{' '}
								的方式提交给{' '}
								<span className="text-yellowmain">
									+60163379314
								</span>
							</p>
						) : progress == 33 ? (
							<>
								<p className="font-semibold text-lg my-2 px-5">
									2. 用户们需把付费之后的
									<span className="text-yellowmain">
										单据使用 YWKL App 提交上来
									</span>
									给官方审查
								</p>
								<p className="font-semibold text-lg my-2 px-5">
									3.
									用户们可以在审查成功的前提下，在下一天得着您的{' '}
									<span className="text-yellowmain">
										专属ID 以及 Zoom Link
									</span>
								</p>
							</>
						) : null}

						{progress == 0 ? (
							<button
								onClick={() => setProgress(33)}
								className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
							>
								Next
							</button>
						) : progress == 33 ? (
							<div className="w-full flex gap-2">
								<button
									onClick={() => setProgress(0)}
									className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
								>
									Back
								</button>
								<button
									onClick={() => setProgress(66)}
									className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
								>
									Next
								</button>
							</div>
						) : progress == 66 ? (
							<>
								<p className="my-1 text-lg font-semibold font-sans">
									Reciept, 单据
								</p>
								<input
									type="file"
									id="screenshot"
									name="screenshot"
									accept="image/png, image/jpeg"
									onChange={(event) =>
										setFile(event.currentTarget.files![0])
									}
									className="mb-4 focus-within:outline-none text-PRIMARY w-full bg-gray-200 text-center font-montserrat text-sm sm:text-base py-2 px-3 rounded-[4px] placeholder-[#a67bd4]"
								/>
								<div className="w-full flex gap-2">
									<button
										onClick={() => setProgress(33)}
										className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-[100px] transform hover:scale-[1.035]  transition ease-in-out duration-500"
									>
										Back
									</button>
									<button
										disabled={isDisabled}
										onClick={() => {
											file
												? setProgress(80)
												: alert('请上传您的截图')
											file ? setDisabled(true) : null

											file
												? uploadtoNotion(
														file as File,
														user as Notion.User
												  )
												: null
										}}
										className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
									>
										Submit
									</button>
								</div>
							</>
						) : progress == 80 ? (
							<p>Sending Data ...</p>
						) : (
							<>
								<p className="text-xl sm:text-2xl font-sans font-semibold mt-2 mb-5 text-center">
									上传成功！
									<br />
									请在2-3天后回到这拿取您
									<br />
									<span className="text-yellowmain text-2xl xl:text-3xl">
										专属ID 以及 Zoom Link!
									</span>
								</p>
								<button
									onClick={() => {
										setDisabled(false)
										setModalState(false)
										window.location.reload()
									}}
									className="rounded-[4px] bg-[#10031f] text-[#fff] font-montserrat text-lg lg:py-2 py-1 text-center w-full transform hover:scale-[1.035]  transition ease-in-out duration-500"
								>
									Exit
								</button>
							</>
						)}
					</div>
				</Dialog>
				<img
					src="/assets/worshipnightPoster.png"
					alt="poster"
					className="object-cover object-center h-[215px] w-full"
				/>
				<div className="mt-5 rounded-r-xl bg-SECONDARY px-3 py-2 shadow-md w-[270px] sm:w-[450px]">
					<p className="font-sans text-3xl sm:text-4xl italic text-PRIMARY font-bold mr-5">
						GO BEYOND{' '}
						<span role="img" aria-labelledby="music-note">
							🎵
						</span>
					</p>
				</div>
				<div className="mt-5 rounded-r-xl bg-PRIMARY px-3 py-2 shadow-md w-[300px]">
					<p className="font-sans text-xl sm:text-2xl text-smoothPink font-bold mr-5">
						赞美与敬拜，对你而言只是歌唱罢了吗?
					</p>
				</div>
				<div className="mt-5 rounded-l-xl bg-PRIMARY px-3 py-2 shadow-md sm:w-[450px] w-[300px] place-self-end">
					<p className="font-sans text-xl sm:text-2xl text-smoothPink font-bold mr-5">
						<span className="text-2xl sm:text-3xl">
							腓立比书 4:13
						</span>
						<br />
						我靠着那加给我能力的，凡事都能作。
						<span role="img" aria-labelledby="arm-muscle">
							💪🏻
						</span>
						真正充满能力的赞美与敬拜，是能够带来转化和改变！
						<span role="img" aria-labelledby="high-five">
							🙌🏻
						</span>
					</p>
				</div>
				<div className="mt-5 rounded-r-xl bg-SECONDARY px-3 py-2 shadow-md  w-[170px] sm:w-[200px]">
					<p className="font-sans text-2xl sm:text-3xl text-PRIMARY font-bold mr-5">
						日期:
						<br />
						15/10/2021
						<br />
						(星期五)
					</p>
				</div>
				<div className="mt-5 rounded-r-xl bg-SECONDARY px-3 py-2 shadow-md w-[180px] sm:w-[240px]">
					<p className="font-sans text-2xl sm:text-3xl text-PRIMARY font-bold">
						时间:
						<br />
						8点30分晚上
					</p>
				</div>
				<div className="-mt-32 mb-20 rounded-l-xl bg-yellowmain px-3 py-2 shadow-md sm:w-[250px] w-[120px] place-self-end">
					<p className="font-sans text-2xl sm:text-3xl text-PRIMARY font-bold mr-5">
						方式: <br className="sm:hidden" />
						ZOOM
					</p>
				</div>

				<div className="mx-auto my-10 rounded-xl w-[300px] sm:w-[450px] bg-SECONDARY shadow-xl items-center font-sans p-2">
					{registered && registration_data?.wnid !== null ? (
						<p className="text-3xl text-center my-2 font-bold text-PRIMARY">
							以下是您的 ID 以及 Zoom Link
						</p>
					) : (
						<p className="text-3xl text-center my-2 font-bold text-PRIMARY">
							您的资料未被审查
							<br />
							请稍等~
						</p>
					)}

					{registered ? (
						<p className="font-sans text-2xl text-PRIMARY font-bold tracking-tighter text-center">
							{registration_data?.wnid !== null
								? registration_data?.wnid
								: null}
						</p>
					) : (
						<>
							<p className="font-sans text-2xl text-PRIMARY font-bold tracking-tighter text-center">
								<span
									role="img"
									aria-labelledby="pin"
									className="mr-1"
								>
									📌
								</span>
								EARLY BIRD 01/10/2021 (RM5)
							</p>
							<p className="font-sans text-2xl text-PRIMARY font-bold tracking-tighter text-center">
								<span
									role="img"
									aria-labelledby="pin"
									className="mr-1"
								>
									📌
								</span>
								AFTER EARLY BIRD 02/10/2021 (RM9)
							</p>
							<p className="font-sans text-2xl text-PRIMARY font-bold tracking-tighter text-center my-3">
								<span
									role="img"
									aria-labelledby="siren"
									className="mr-1"
								>
									🚨
								</span>
								截止日期: 08/10/2021
								<span
									role="img"
									aria-labelledby="siren"
									className="ml-1"
								>
									🚨
								</span>
							</p>

							<p className="font-sans text-2xl text-PRIMARY font-bold tracking-tighter text-center my-3">
								<span
									role="img"
									aria-labelledby="gift"
									className="mr-1"
								>
									🎁
								</span>
								LIMITED EDITION Gift Pack
								<span
									role="img"
									aria-labelledby="gift"
									className="ml-1"
								>
									🎁
								</span>
							</p>
						</>
					)}
					{registered ? null : registered &&
					  registration_data?.wnid !== null ? (
						<button
							// Enter Zoom Link
							onClick={() =>
								router.push('https://zoom.us/j/99376674284')
							}
							className="mt-5 w-full font-bebas text-2xl px-5 py-2 bg-PRIMARY rounded-xl text-white"
						>
							Join Zoom
						</button>
					) : (
						<button
							onClick={() => setModalState(true)}
							className="mt-5 w-full font-bebas text-2xl px-5 py-2 bg-PRIMARY rounded-xl text-white"
						>
							Register Now!
						</button>
					)}
				</div>
			</Layout>
		</>
	)
}

export default WorshipNight
