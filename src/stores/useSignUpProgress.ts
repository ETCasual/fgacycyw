import create from 'zustand'
import { combine, persist } from 'zustand/middleware'

type SignUpView = 'step-1' | 'step-2' | 'step-3'

const createState = persist(
	combine({ progress: 0, view: 'step-1' as SignUpView }, (set) => ({
		// setProgress: (progress: number) => set({ progress }),
		setView: (view: SignUpView) => {
			switch (view) {
				case 'step-1':
					set({ progress: 20 })
					break
			}
			set({ view })
		}
	})),
	{ name: 'signup-state' }
)

export const useSignUp = create(createState)
