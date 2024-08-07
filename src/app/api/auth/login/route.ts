import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {

  const response = NextResponse.json(
    {},
    { status: 200 }
  )

  // mock. every login is successful and is an admin
  response.cookies.set('role', 'admin');
  return response;
}