import { flexboxVariants } from '@/styles/shared/flexbox.css'
import { captureUnderscoreErrorException } from '@sentry/nextjs'
import NextErrorComponent, { ErrorProps } from 'next/error'
import { NextPageContext } from 'next/types'


export async function getInitialProps(contextData: NextPageContext) {
	// In case this is running in a serverless function, await this in order to give Sentry
	// time to send the error before the lambda exits
	await captureUnderscoreErrorException(contextData)

	// This will contain the status code of the response
	return NextErrorComponent.getInitialProps(contextData)
}

export default function Error({ ...props }: ErrorProps) {
	return <h2 className={flexboxVariants.verticalCentered}>{props.statusCode}: An error has occurred</h2>
}