import { globalStyle } from "@vanilla-extract/css";
import { combinedThemeVars } from "../theme/combined-theme-vars";


globalStyle('html, body', {
	background: combinedThemeVars.bgColor,
	color: combinedThemeVars.textColor,
	fontFamily: combinedThemeVars.fontFamily,
});