import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isDisabled = process.env.NEXT_PUBLIC_DISABLE_ANONYMOUS_TELEMETRY === 'true' || process.env.NEXT_PUBLIC_DISABLE_ANONYMOUS_TELEMETRY === 'True';
  const telemetryEnabled = !isDisabled;
  return NextResponse.json({ telemetryEnabled });
}


