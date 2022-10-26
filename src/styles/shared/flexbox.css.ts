import { style, styleVariants } from '@vanilla-extract/css';

const flexboxBase = style({
	display: 'flex',
});

export const flexboxVariants = styleVariants({
	centered: [flexboxBase, {
		justifyContent: 'center',
		alignItems: 'center'
	}],
	rightAligned: [flexboxBase, {
		justifyContent: 'right',
		alignItems: 'center'
	}],
	leftAligned: [flexboxBase, {
		justifyContent: 'left',
		alignItems: 'center'
	}],
	gapped: [flexboxBase, {
		alignContent: "center",
		justifyContent: "center",
		gap: "15px"
	}],
	even: [flexboxBase, {
		justifyContent: "space-evenly",
		alignContent: "center",
	}],
	vertical: [flexboxBase, {
		flexDirection: 'column'
	}],
	verticalCentered: [flexboxBase, {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}]
});