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
  const buildId = process.env.NETLIFY_BUILD_ID || process.env.BUILD_ID || 'local';
  return `referral-codes:${buildId}:${slug.toLowerCase().trim() || 'kiwi'}`;
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
    console.info('[referral-codes] serving cached snapshot', { slug: normalizedSlug, cacheKey, count: cachedEntry!.data.codes.length });
    return cachedEntry!.data;
  }

  console.info('[referral-codes] refreshing snapshot', { slug: normalizedSlug, cacheKey });
  const freshData = await fetchCodesFromSupabase(normalizedSlug);
  console.info('[referral-codes] fetched snapshot', { slug: normalizedSlug, count: freshData.codes.length, source: freshData.source });
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
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
  };
}
