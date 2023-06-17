import { flexboxVariants } from "@/styles/shared/flexbox.css";
import React from "react";
import { AuthHeader } from "./auth-components/auth-header";
import { ThemeSelector } from './theme-selector'

export function ApplicationHeader({ headerClassName }: { headerClassName?: string }) {
	return (
		<header className={headerClassName}>
			<div className={flexboxVariants.rightAligned} style={{ gap: "15px" }}>
				<AuthHeader />
				<ThemeSelector />

			</div>
		</header>
	)
}