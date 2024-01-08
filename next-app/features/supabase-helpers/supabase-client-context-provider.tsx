import { createBrowserClient } from "@supabase/ssr";
import { Session } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

type ContextReturnType = {
	supabaseAuthClient: SupabaseAuthClient,
	session: Session | null
};

export const SupabaseContext = createContext<ContextReturnType>({
	supabaseAuthClient: undefined as any,
	session: null
});

type ContextProviderProps = {
	children: ReactNode;
	PUBLIC_SUPABASE_URL: string,
	PUBLIC_SUPABASE_ANON_KEY: string
};

export function SupabaseClientContextProvider({ children, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL }: ContextProviderProps) {
	const [session, setSession] = useState<Session | null>(null);
	const { auth } = useMemo(() => {
		return createBrowserClient(
			PUBLIC_SUPABASE_URL,
			PUBLIC_SUPABASE_ANON_KEY
		)
	}, [PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL])

	useEffect(() => {
		const fct = async () => {
			const session = (await auth.getSession()).data.session;
			setSession(session);
		};
		fct();
	}, [auth, setSession]);

	return (
		<SupabaseContext.Provider value={{
			 supabaseAuthClient: auth,
			 session
		}}>
			{children}
		</SupabaseContext.Provider>
	);
}