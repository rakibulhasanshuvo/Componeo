import { NextResponse } from 'next/server'
// The client you created in Step 1
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in search params, use it as the redirection URL
  let next = searchParams.get('next') ?? '/dashboard'

  // Ensure "next" is a relative path to prevent open redirect vulnerabilities
  if (!next.startsWith('/') || next.startsWith('//')) {
    next = '/dashboard'
  }

  // Safety: Ensure 'next' is a valid relative path to prevent Open Redirect vulnerabilities.
  // This check blocks protocols (https://), protocol-relative URLs (//),
  // backslash escapes (/\), and authority-based redirects (@).
  const isSafePath = next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\') && !next.includes('@')
  const safeNext = isSafePath ? next : '/dashboard'

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        // Fix: Use the request's origin and strictly ignore X-Forwarded-Host to prevent Host Header Injection.
        // Note: Full protection against Host Header Injection requires origin validation at the
        // infrastructure/load-balancer level or an explicit allowlist in application code.
        return NextResponse.redirect(`${origin}${safeNext}`)
      }
    } catch (err) {
      // Log the error for debugging purposes if needed
      // console.error('Auth callback error:', err)
      // Fall through to redirect to the error page
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-error`)
}
