import { NextResponse } from "next/server";

export function proxy(request) {
    console.log(request);

    const token = request.cookies.get("token");

    if (!token) {
        return NextResponse.redirect(
            new URL("/sign_in", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/checkout",
};
