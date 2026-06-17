import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization") || "";
    if (!auth || !auth.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Return a mock user for any token starting with "mock-token"
    const token = auth.replace(/^Bearer\s+/, "");
    if (!token.startsWith("mock-token")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = {
      email: "demo@local", firstName: "Demo", lastName: "User",
      username: "demo", role: "user",
    };

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
