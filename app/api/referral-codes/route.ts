import { NextResponse } from 'next/server';
import { getActiveReferralCodes, getReferralCodeCacheHeaders } from '@/app/lib/referral-code-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || 'kiwi';

    const data = await getActiveReferralCodes(slug);

    if (data.codes.length === 0) {
      console.info('Referral codes API returning fallback for slug:', slug);
    }

    return NextResponse.json(data, {
      headers: {
        ...(await getReferralCodeCacheHeaders()),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching dynamic codes:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
