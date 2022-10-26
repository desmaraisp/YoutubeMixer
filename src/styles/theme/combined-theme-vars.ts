import { globalTheme } from "./global-theme.css";
import { themeContractVars } from "./theme-contract.css";

export const breakpoints = {
	xs: "300px",
	sm: "480px",
	md: "850px",
	lg: "1350px",
	xl: "1920px"
} as const

export const combinedThemeVars = { ...globalTheme, ...themeContractVars };
