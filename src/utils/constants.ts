export const genders = ['male', 'female']

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
