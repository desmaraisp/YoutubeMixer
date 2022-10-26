import { globalStyle, style } from '@vanilla-extract/css';
import { combinedThemeVars } from '../theme/combined-theme-vars';


export const tableStyle = style({
	padding: "0px",
	width: "100%",
	borderCollapse: "collapse",
})

export const alternatingBackgroundTable = style([tableStyle, {}])


export const tableRow = style({
	width: "100%",
	padding: "0px"
})
export const tableCell = style({
	padding: "0px"
})

globalStyle(`${alternatingBackgroundTable} ${tableRow}:nth-child(even)`, {
	backgroundColor: combinedThemeVars.tableBGColors.dark
});
globalStyle(`${alternatingBackgroundTable} ${tableRow}:nth-child(odd)`, {
	backgroundColor: combinedThemeVars.tableBGColors.light
});
globalStyle(`${alternatingBackgroundTable} ${tableRow}, ${alternatingBackgroundTable} ${tableCell}`, {
	border: "1px solid black"
});


