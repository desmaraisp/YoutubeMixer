import { style } from "@vanilla-extract/css";
import { combinedThemeVars } from "../theme/combined-theme-vars";

export const borderedPadded = style({
	border: "1px solid",
	padding: "10px",
	borderRadius: combinedThemeVars.borderRadius
})