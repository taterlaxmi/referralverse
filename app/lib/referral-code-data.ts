import { normalizeReferralCodes, getCacheTtlSeconds } from '@/app/lib/referral-codes';
import { supabase } from '@/app/lib/supabase';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

export interface ActiveReferralCodeData {
  codes: string[];
  source: 'supabase' | 'fallback';
}

interface CachedReferralCodeEntry {
  data: ActiveReferralCodeData;
  fetchedAt: number;
}

const cache = new Map<string, CachedReferralCodeEntry>();

function getCacheKey(slug: string) {
  return `referral-codes:${slug.toLowerCase().trim() || 'kiwi'}`;
}

export function shouldUseCachedReferralCodeData(entry: CachedReferralCodeEntry | undefined, now = Date.now()) {
  if (!entry) {
    return false;
  }

  return now - entry.fetchedAt < getCacheTtlSeconds() * 1000;
}

async function fetchCodesFromSupabase(slug: string): Promise<ActiveReferralCodeData> {
  const client = supabaseAdmin ?? supabase;

  if (!client) {
    return { codes: [], source: 'fallback' };
  }

  const { data, error } = await client
    .from('referral_codes')
    .select('code,created_at')
    .eq('app_slug', slug)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch referral codes from Supabase:', error.message);
    return { codes: [], source: 'fallback' };
  }

  if (!data || data.length === 0) {
    console.info('Supabase returned no referral codes for app slug:', slug);
  }

  const codes = Array.from(
    new Set(
      (data || [])
        .map((item) => item.code)
        .flatMap((value) => normalizeReferralCodes(value))
    )
  );

  return {
    codes,
    source: 'supabase',
  };
}

export async function getActiveReferralCodes(slug: string): Promise<ActiveReferralCodeData> {
  const normalizedSlug = slug?.toLowerCase().trim() || 'kiwi';
  const cacheKey = getCacheKey(normalizedSlug);
  const now = Date.now();
  const cachedEntry = cache.get(cacheKey);

  if (shouldUseCachedReferralCodeData(cachedEntry, now)) {
    return cachedEntry!.data;
  }

  const freshData = await fetchCodesFromSupabase(normalizedSlug);
  cache.set(cacheKey, {
    data: freshData,
    fetchedAt: now,
  });

  if (freshData.codes.length > 0) {
    return freshData;
  }

  return { codes: [], source: 'fallback' };
}

export async function getReferralCodeCacheHeaders() {
  return {
    'Cache-Control': `public, s-maxage=${getCacheTtlSeconds()}, stale-while-revalidate=1800`,
  };
}
