import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const canChangeKeys = process.env.NEXT_PUBLIC_CAN_CHANGE_KEYS !== "false";

export async function GET() {
  return NextResponse.json({ canChange: canChangeKeys })
}