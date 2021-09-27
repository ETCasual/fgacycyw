declare namespace Notion {
	type User = {
		uid: string | null
		fullName: string | null
		nickname: string | null
		ic: string | null
		contact: string | null
		address1: string | null
		address2?: string | null
		email: string | null
		dob: string | null
		cluster: string | null
		gender: string | null
		status: string | null
		smallTeam: string | null
		cg: string | null
		registered: boolean
	}

	type WorshipNightReg = {
		wnid: string | null
		registered: boolean
	}
}
