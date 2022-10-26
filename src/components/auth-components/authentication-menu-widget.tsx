import { AuthenticationMenuWidgetBodyStyle, AuthenticationMenuWidgetStyle } from "@/styles/component-specific/authentication-menu-widget.css";
import { ReactElement, ReactNode } from "react";

export function AuthenticationMenuWidget({ children, title, description }: { children: ReactNode, title: string, description?: ReactElement }) {
	return (
		<div className={AuthenticationMenuWidgetStyle}>
			<h2 style={{ textAlign: 'center' }}>{title}</h2>
			<div>{description}</div>
			<div className={AuthenticationMenuWidgetBodyStyle}>{children}</div>

		</div>
	)
}