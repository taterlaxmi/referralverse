import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    const res = await fetch(url, {
      next: {
        revalidate: 1500,
      },
    });

    if (!res.ok) {
      throw new Error(`Server returned status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        // Cache on Netlify CDN Edge for 10 minutes, allowing fast CDN delivery and saving serverless run credits
        'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=30'
      }
    });
  } catch (error: any) {
    console.error('Error fetching dynamic codes server-side:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
