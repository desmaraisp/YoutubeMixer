import { style } from '@vanilla-extract/css';

export const applicationWrapperStyle = style({
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "stretch",
	padding: "10px 10px",
	boxSizing: "border-box"
});

export const bodyStyle = style({
	flexGrow: 1,
	flexShrink: 0
})

export const footerStyle = style({
	marginTop: "25px",
	flexShrink: 0,
	paddingBottom: "5px"
})