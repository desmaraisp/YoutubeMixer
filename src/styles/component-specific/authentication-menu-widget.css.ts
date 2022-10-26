import { style } from "@vanilla-extract/css";
import { borderedPadded } from "../shared/bordered-padded.css";
import { centeredText, centeredVariants } from "../shared/centered-item.css";
import { flexboxVariants } from "../shared/flexbox.css";

export const AuthenticationMenuWidgetStyle = style([ centeredVariants.p80, borderedPadded, flexboxVariants.centered, centeredText, {
	flexDirection: 'column',
	gap: "15px",
	marginTop: "25px",
	padding: "25px"
}])

export const AuthenticationMenuWidgetBodyStyle = style([ centeredVariants.p80, flexboxVariants.centered, {
	flexDirection: 'column',
	gap: "15px"
}])