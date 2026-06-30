import { describe, expect, it } from 'vitest';
import { getDisplayReferralCodes, getSupabaseSubmissionErrorMessage, normalizeReferralCodes } from '@/app/lib/referral-codes';
import { shouldUseCachedReferralCodeData } from '@/app/lib/referral-code-data';

describe('normalizeReferralCodes', () => {
  it('returns a cleaned list from a single code string', () => {
    expect(normalizeReferralCodes('ABC123')).toEqual(['ABC123']);
  });

  it('returns a cleaned list from mixed input values', () => {
    expect(normalizeReferralCodes([' ABC123 ', '  ', 'XYZ999'])).toEqual(['ABC123', 'XYZ999']);
  });

  it('returns an empty array when no usable values are provided', () => {
    expect(normalizeReferralCodes(['', '   ', undefined as unknown as string])).toEqual([]);
  });

  it('returns a helpful message when Supabase blocks inserts due to RLS', () => {
    expect(getSupabaseSubmissionErrorMessage(new Error('new row violates row-level security policy for table "referral_codes"'))).toContain('INSERT policy');
  });

  it('prefers dynamic codes over the fallback static list', () => {
    expect(getDisplayReferralCodes(['A1', 'B2'], ['STATIC1', 'STATIC2'], 2)).toEqual(['A1', 'B2']);
  });

  it('reuses a cached snapshot until the TTL window expires', () => {
    const cachedEntry = {
      data: { codes: ['OLD1'], source: 'supabase' as const },
      fetchedAt: 1_700_000_000_000,
    };

    expect(shouldUseCachedReferralCodeData(cachedEntry, 1_700_000_000_000 + 59_000)).toBe(true);
    expect(shouldUseCachedReferralCodeData(cachedEntry, 1_700_000_000_000 + 61_000)).toBe(false);
  });
});
