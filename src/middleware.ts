import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    // 1. Run the intl middleware
    let res = intlMiddleware(req);

    // 2. Create Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        req.cookies.set(name, value)
                    );
                    res = NextResponse.next({
                        request: req,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        res.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // 3. Refresh session
    const { data: { session } } = await supabase.auth.getSession();

    // 4. Protect /admin routes
    const isNextIntlRoute = req.nextUrl.pathname.match(/^\/(es|en|pt)(\/|$)/);
    const pathnameWithoutLocale = isNextIntlRoute
        ? req.nextUrl.pathname.replace(/^\/(es|en|pt)/, '')
        : req.nextUrl.pathname;

    if (pathnameWithoutLocale.startsWith('/admin')) {
        if (!session) {
            const locale = isNextIntlRoute ? isNextIntlRoute[1] : 'es';
            const redirectUrl = new URL(`/${locale}/login`, req.url);
            redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
        }
    }

    return res;
}

export const config = {
    // Match only internationalized pathnames and api routes
    matcher: ['/', '/(es|pt|en)/:path*', '/api/:path*']
};
