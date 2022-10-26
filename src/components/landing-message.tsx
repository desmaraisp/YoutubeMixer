import { flexboxVariants } from "@/styles/shared/flexbox.css";
import Link from "next/link";

export function LandingMessage() {
	return (
		<div className={flexboxVariants.verticalCentered}>
			<p>Seamlessly play Youtube and spotify playlists together.</p>
			<Link href="/edit-playlists">
				Get Started
			</Link>
		</div>
	)
}