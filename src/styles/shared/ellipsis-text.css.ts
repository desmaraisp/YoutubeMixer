import { style } from "@vanilla-extract/css";

export const ellipsisText = style({
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis"
})