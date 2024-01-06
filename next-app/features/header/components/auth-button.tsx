import { Anchor, Button } from '@mantine/core';
import Link from 'next/link';
import { supabaseBrowserClient } from '@/globals/supabase-client';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

export function AuthButton() {
	const [session, setSession] = useState<Session | null>(null);
	const router = useRouter();
	useEffect(() => {
		const fct = async () => {
			const session = (await supabaseBrowserClient.auth.getSession()).data.session;
			setSession(session);
		};
		fct();
	}, []);
	useEffect(() => {
		const unsubscribe = supabaseBrowserClient.auth.onAuthStateChange((event, newSession) => {
			if ((event === 'SIGNED_IN' || event === 'SIGNED_OUT') && session?.user.id !== newSession?.user.id) {
				router.reload();
			}
		});
		return unsubscribe.data.subscription.unsubscribe;
	}, [router, session]);

	if (!session) return <Anchor mx='sm' underline='never' component={Link} href={"/sign-in"}>Sign in</Anchor>;

	return <Button onClick={async () => await supabaseBrowserClient.auth.signOut()}>Sign Out</Button>;
}
