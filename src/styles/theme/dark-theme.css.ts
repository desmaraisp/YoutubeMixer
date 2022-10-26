import { createTheme } from '@vanilla-extract/css';
import { themeContractVars } from './theme-contract.css'

export const darkTheme = createTheme(themeContractVars, {
	mainColor: '#167dc640',
	textColor: 'white',
	bgColor: '#2C2E33',
	tableBGColors: {
		dark: '#181a1b',
		light: '#282828'
	}
})