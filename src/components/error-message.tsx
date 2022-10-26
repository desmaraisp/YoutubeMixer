export function ErrorMessage({ header, message }: { message: string, header?: string }) {
	return (
		<div style={{ backgroundColor: 'red' }}>
			{header && <p>{header}</p>}
			<p>{message}</p>
			
		</div>
	)
}