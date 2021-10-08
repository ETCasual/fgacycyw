import { Client } from '@notionhq/client'
import {
	Page,
	RichTextPropertyValue,
	EmailPropertyValue,
	TitlePropertyValue,
	CheckboxPropertyValue,
	URLPropertyValue
} from '@notionhq/client/build/src/api-types'

export const allowedContent = {
	header: true,
	sub_header: true,
	sub_sub_header: true,
	divider: true,
	text: true,
	bulleted_list: true,
	numbered_list: true,
	image: true,
	video: true,
	audio: true,
	quote: true
}

if (!process.env.NOTION_SECRET_API_KEY) {
	throw new Error(
		'Unable to connect Notion, NOTION_SECRET_API_KEY not provided in .env.local'
	)
}

export default new Client({ auth: process.env.NOTION_SECRET_API_KEY })

export const parseUser = (page: Page): Notion.User => {
	return {
		uid:
			(page.properties.Uid as RichTextPropertyValue).rich_text.length !==
			0
				? (page.properties.Uid as RichTextPropertyValue).rich_text[0]
						.plain_text
				: null,
		fullName:
			(page.properties['Full Name'] as TitlePropertyValue).title
				.length !== 0
				? (page.properties['Full Name'] as TitlePropertyValue).title[0]
						.plain_text
				: null,
		nickname:
			(page.properties.Nickname as RichTextPropertyValue).rich_text
				.length !== 0
				? (page.properties.Nickname as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		contact:
			(page.properties.Contact as RichTextPropertyValue).rich_text
				.length !== 0
				? (page.properties.Contact as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		dob:
			(page.properties.Dob as RichTextPropertyValue).rich_text.length !==
			0
				? (page.properties.Dob as RichTextPropertyValue).rich_text[0]
						.plain_text
				: null,
		email:
			(page.properties.Email as EmailPropertyValue).email.length !== 0
				? (page.properties.Email as EmailPropertyValue).email
				: null,
		ic:
			(page.properties.Ic as RichTextPropertyValue).rich_text.length !== 0
				? (page.properties.Ic as RichTextPropertyValue).rich_text[0]
						.plain_text
				: null,
		gender:
			(page.properties.Gender as RichTextPropertyValue).rich_text
				.length !== 0
				? (page.properties.Gender as RichTextPropertyValue).rich_text[0]
						.plain_text
				: null,
		status:
			(page.properties['Pastoral Status'] as RichTextPropertyValue)
				.rich_text.length !== 0
				? (page.properties['Pastoral Status'] as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		address1:
			(page.properties['Address Line 1'] as RichTextPropertyValue)
				.rich_text.length !== 0
				? (page.properties['Address Line 1'] as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		address2:
			(page.properties['Address Line 2'] as RichTextPropertyValue)
				.rich_text.length !== 0
				? (page.properties['Address Line 2'] as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		smallTeam:
			(page.properties['Small Team'] as RichTextPropertyValue).rich_text
				.length !== 0
				? (page.properties['Small Team'] as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		cluster:
			(page.properties.Cluster as RichTextPropertyValue).rich_text
				.length !== 0
				? (page.properties.Cluster as RichTextPropertyValue)
						.rich_text[0].plain_text
				: null,
		cg:
			(page.properties.CG as RichTextPropertyValue).rich_text.length !== 0
				? (page.properties.CG as RichTextPropertyValue).rich_text[0]
						.plain_text
				: null,
		registered: (page.properties.Registered as CheckboxPropertyValue)
			.checkbox
	}
}

export const parseRegData = (page: Page): Notion.WorshipNightReg => {
	return {
		wnid:
			(page.properties.WNID as RichTextPropertyValue).rich_text.length !==
			0
				? (page.properties.WNID as RichTextPropertyValue).rich_text[0]
						.plain_text
				: null,
		registered:
			(page.properties.Receipt as URLPropertyValue) == undefined
				? (page.properties.Approval as CheckboxPropertyValue).checkbox
				: (page.properties.Receipt as URLPropertyValue).url.length !== 0
				? true
				: false
	}
}
