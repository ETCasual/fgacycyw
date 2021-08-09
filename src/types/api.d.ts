declare namespace API {
	type User = {
		fullName: string
		nickname: string
		contact: string
		gender: 'male' | 'female'
		address1: string
		address2: string | null
		smallTeam: string
		cg: string
		dob: Date | string
		cluster: string
		ic: string
		status: string
	}
}
