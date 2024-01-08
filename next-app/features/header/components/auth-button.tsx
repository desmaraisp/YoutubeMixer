import { Anchor, Button } from '@mantine/core';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { SupabaseContext } from '@/features/supabase-helpers/supabase-client-context-provider';

export function AuthButton() {
	const { session, supabaseAuthClient } = useContext(SupabaseContext)
	const router = useRouter()

	if (!session) return <Anchor mx='sm' underline='never' component={Link} href={"/sign-in"}>Sign in</Anchor>;

	return <Button onClick={async () => {
		await supabaseAuthClient.signOut()
		router.reload()
	}}>Sign Out</Button>;
}
