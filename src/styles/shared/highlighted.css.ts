import { style } from "@vanilla-extract/css";
import { combinedThemeVars } from "../theme/combined-theme-vars";

export const highlighted = style({
	backgroundColor: `${combinedThemeVars.mainColor} !important`
})