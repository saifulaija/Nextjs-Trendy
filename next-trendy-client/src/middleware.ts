import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
type Role = keyof typeof roleBasedPrivateRoutes;
const AuthRoutes = ["/account/login", "/account/register"];
const commonPrivateRoutes = ["/dashboard"];
const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard\/admin/],
  user: [/^\/dashboard\/user/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/account/login", request.url));
    }
  }
  console.log(pathname,accessToken);
  

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodedData;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  console.log(
    role,
    pathname,
    "================================================="
  );

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account/login", "/account/register", "/dashboard/:page*"],
};
