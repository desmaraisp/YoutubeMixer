import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export function ClientSideRedirect({path}: {path: string}) {
	const router = useRouter();
	
	useEffect(() => {
		router.push(path);
	}, [])

	return <></>;
}
