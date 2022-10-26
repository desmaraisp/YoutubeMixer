import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { unStyledButton } from '@/styles/shared/button.css'
import { flexboxVariants } from '@/styles/shared/flexbox.css'


export function ThemeSelector() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false)

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <button className={unStyledButton}
			style={{ width: "30px", height: "30px" }}
			type='button'
		>
		</button>
	}
	
	const isDarkTheme = resolvedTheme === 'dark'
	const label = isDarkTheme ? "Switch to light mode" : "Switch to dark mode"
	const otherTheme = isDarkTheme ? 'light' : 'dark'

	return (
		<button className={`${unStyledButton} ${flexboxVariants.centered}`}
			style={{ width: "30px", height: "30px" }}
			aria-label={label}
			type='button'
			title={label}
			onClick={() => setTheme(otherTheme)}
		>
			<FontAwesomeIcon style={{height: "100%"}} icon={isDarkTheme ? faMoon : faSun} />
		</button>
	)
}