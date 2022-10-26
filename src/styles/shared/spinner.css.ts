import { keyframes, style } from "@vanilla-extract/css"
import { combinedThemeVars } from "../theme/combined-theme-vars"

const rotate = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' }
})


export const spinner = style({
	display: "inline-block",
	width: 80,
	height: 80,

	selectors: {
		'&:after': {
			content: " ",
			display: 'block',
			width: '64px',
			height: '64px',
			margin: '8px',
			borderRadius: '50%',
			border: `6px solid ${combinedThemeVars.textColor}`,
			borderColor: `${combinedThemeVars.textColor} transparent ${combinedThemeVars.textColor} transparent`,
			animation: `${rotate} 1.2s linear infinite`,
		}
	}
})
