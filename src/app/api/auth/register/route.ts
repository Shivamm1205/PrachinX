import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, username, email, password } = body;

    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // In a real app you'd persist the user. Here we return a mock token/user.
    const user = { firstName, lastName, username, email, role: "user" };
    const token = "mock-token-" + Math.random().toString(36).slice(2, 10);

    return NextResponse.json({ success: true, data: { token, ...user } });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Registration error" }, { status: 500 });
  }
}
