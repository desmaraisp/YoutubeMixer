import { style } from "@vanilla-extract/css";
import { breakpoints, combinedThemeVars } from "../theme/combined-theme-vars";
import { flexboxVariants } from "../shared/flexbox.css";

export const playerWrapperStyle = style([ flexboxVariants.even, {
	margin: "30px 5px",

	'@media': {
		[`screen and (max-width: ${breakpoints.md})`]: {
			flexDirection: "column"
		},
	}
}])

export const playerStyle = style({
	padding: "10px",
	aspectRatio: "16/9",
	flexBasis: "60%",

	
	minWidth: "450px",
	boxSizing: 'border-box',

	'@media': {
		[`screen and (max-width: ${breakpoints.md})`]: {
			width: "100%"
		},

	}

})

export const tracksListStyle = style({
	flexBasis:"35%",
	borderRadius: combinedThemeVars.borderRadius,
	border: "1px solid",
	overflow: "hidden"
})