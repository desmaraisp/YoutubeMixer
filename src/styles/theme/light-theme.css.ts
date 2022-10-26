import { createTheme } from '@vanilla-extract/css';
import { themeContractVars } from './theme-contract.css'

export const lightTheme = createTheme(themeContractVars, {
	mainColor: '#167dc640',
	textColor: 'black',
	bgColor: 'white',
	tableBGColors: {
		dark: '#a19f9f',
		light: '#d8dadc'
	}

})