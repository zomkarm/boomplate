import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API route working ✓", timestamp: new Date().toISOString() });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ received: body }, { status: 201 });
}
