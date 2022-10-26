import { createThemeContract } from '@vanilla-extract/css'

export const themeContractVars = createThemeContract({
	mainColor: '',
	textColor: '',
	bgColor: '',
	tableBGColors: {
		dark: '',
		light: ''
	}
})