import { NextResponse } from 'next/server';
import { getSupabaseSubmissionErrorMessage, validateReferralCodeInput } from '@/app/lib/referral-codes';
import { supabaseAdmin } from '@/app/lib/supabase-admin';
import { supabase } from '@/app/lib/supabase';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unknown error';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appSlug = body?.appSlug || 'kiwi';
    const validation = validateReferralCodeInput(body?.code?.toString());

    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const code = validation.normalized;

    const client = supabaseAdmin ?? supabase;

    if (!client) {
      return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 });
    }

    const { data: existingRows, error: duplicateError } = await client
      .from('referral_codes')
      .select('id')
      .eq('app_slug', appSlug)
      .ilike('code', code);

    if (duplicateError) {
      return NextResponse.json({ error: getSupabaseSubmissionErrorMessage(duplicateError) }, { status: 500 });
    }

    if ((existingRows || []).length > 0) {
      return NextResponse.json({ error: 'This code has already been submitted.' }, { status: 409 });
    }

    const { error } = await client.from('referral_codes').insert({
      app_slug: appSlug,
      code,
    });

    if (error) {
      return NextResponse.json({ error: getSupabaseSubmissionErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
