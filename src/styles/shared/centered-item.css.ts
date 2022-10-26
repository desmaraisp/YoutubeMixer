import { style, styleVariants } from '@vanilla-extract/css';

const centeredBase = style({
	margin: 'auto',
});

export const centeredVariants = styleVariants({
	p90: [centeredBase, {
		width: "90%"
	}],
	p80: [centeredBase, {
		width: "80%"
	}],
});

export const centeredText = style({
	textAlign: 'center'
})