import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Group, Text } from "@mantine/core";
import { FormErrors, UseFormReturnType } from "@mantine/form";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function FormRootError({ errors, className }: { errors: FormErrors, className?: string }) {
	if (errors['root']) return <Alert className={className} color="red">{errors['root']}</Alert>
}

export function SetRootFormError(form: UseFormReturnType<any>, error: string) {
	form.setErrors({ 'root': error })
}

export function WrappedWithErrorHandler({ children }: { children: ReactNode }) {
	return <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
		<Alert color="red">
			<Group gap={15} justify="center" align="center">
				<Button variant="subtle" onClick={resetErrorBoundary}>
					<FontAwesomeIcon icon={faX} />
				</Button>
				<Text>{error.message}</Text>
			</Group>
		</Alert>
	)}>
		{children}
	</ErrorBoundary>
}