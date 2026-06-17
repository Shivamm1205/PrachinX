import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Simple mock auth: accept any non-empty credentials
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing credentials" }, { status: 400 });
    }

    const user = {
      email,
      firstName: "Demo",
      lastName: "User",
      username: email.split("@")[0],
      role: "user",
    };

    const token = "mock-token-" + Math.random().toString(36).slice(2, 10);

    return NextResponse.json({ success: true, data: { token, ...user } });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Auth error" }, { status: 500 });
  }
}
