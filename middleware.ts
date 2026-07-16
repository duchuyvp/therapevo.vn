import { NextResponse, type NextRequest } from "next/server";

const REALM = 'Basic realm="Therapevo admin", charset="UTF-8"';

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}

export function middleware(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse(
      "Admin auth is not configured on the server (ADMIN_USERNAME/ADMIN_PASSWORD missing).",
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }
  const sep = decoded.indexOf(":");
  if (sep < 0) return unauthorized();
  const u = decoded.slice(0, sep);
  const p = decoded.slice(sep + 1);
  if (u !== username || p !== password) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
