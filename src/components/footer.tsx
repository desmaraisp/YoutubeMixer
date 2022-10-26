import React from "react";
import { flexboxVariants } from '../styles/shared/flexbox.css';

export function Footer({ footerClassName }: { footerClassName?: string }) {
	return (
		<footer className={footerClassName}>
			<div className={flexboxVariants.gapped}>
				<a target='_blank' href='https://philippedesmarais.netlify.app/'>About me</a>
				<a target='_blank' href='https://github.com/CephalonAhmes/YoutubeMixer'>Source code</a>
			</div>
		</footer>
	);
}