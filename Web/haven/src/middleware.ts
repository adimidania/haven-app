import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isAuthenticated = !!req.auth;

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth/sign-in");

  if (isAuthPage) {
    if (isAuthenticated) {
      return Response.redirect(new URL("/home", req.nextUrl));
    }

    return;
  }

  if (!isAuthenticated && req.nextUrl.pathname !== "/") {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return Response.redirect(
      new URL(`/auth/sign-in?from=${encodeURIComponent(from)}`, req.nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: "/((?!.*\\.|api\\/).*)",
};
