import { style } from "@vanilla-extract/css";

export const fullWidth = style({
	width: "100%"
})
export const fullHeight = style({
	height: "100%"
})

export const fullSize = style([fullWidth, fullHeight, {
	
}])