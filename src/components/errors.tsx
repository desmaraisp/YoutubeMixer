import { FieldError, GlobalError } from "react-hook-form";

export function FormFieldError({error}: {error: FieldError | undefined}){
	return (<>
		{error && <span style={{color: "red"}}>{error.message}</span>}
	</>)
}

export function FormRootError({error}: {error: Record<string, GlobalError> & GlobalError | undefined}){
	return (<>
		{error && <span style={{color: "red"}}>{error.message}</span>}
	</>)
}

export function ErrorMessage({ message }: { message: string | null}) {
	return (<>
		{message && <span style={{color: "red"}}>{message}</span>}
	</>)
}