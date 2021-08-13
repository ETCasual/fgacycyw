import create from 'zustand'
import { combine, persist } from 'zustand/middleware'

const createState = persist(
	combine({ uid: [] as string[] }, (set, get) => ({
		// setProgress: (progress: number) => set({ progress }),
		setRegistered: (uid: string) => {
			const newUidArr = get().uid
			console.log(newUidArr)
			newUidArr.push(uid)
			set({ uid: newUidArr })
		}
	})),
	{ name: 'registration-state' }
)

export const useRegister = create(createState)
