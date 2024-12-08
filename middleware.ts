import { NextRequest, NextResponse } from "next/server";
import { API_ROUTES } from "@/app/utils/apiClient";

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|images|static|public).*)" 
  ],
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  if (accessToken) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (refreshToken) {
    try {
      const requestBody = JSON.stringify({ refresh: refreshToken });
      
      const response = await fetch(API_ROUTES.tokenRefresh, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const data = await response.json();

      if (response.ok && data.access) {
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set('accessToken', data.access, {  sameSite: 'strict' });

        return nextResponse;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  return NextResponse.next();
}
