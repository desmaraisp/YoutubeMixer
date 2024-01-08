import { NextApiHandler } from 'next'
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr'


const handler: NextApiHandler = async (req, res) => {
	const { code } = req.query

	if (code) {
		const supabase = createServerClient(process.env.PUBLIC_SUPABASE_URL!, process.env.PUBLIC_SUPABASE_ANON_KEY!, {
			cookies: {
				get(name: string) {
					return req.cookies[name];
				},
				set(name: string, value: string, options: CookieOptions) {
					res.setHeader("Set-Cookie", serialize(name, value, options));
				},
				remove(name: string, options: CookieOptions) {
					res.setHeader("Set-Cookie", serialize(name, "", options));
				},
			},
		})
		await supabase.auth.exchangeCodeForSession(String(code))
	}

	res.redirect('/')
}

export default handler