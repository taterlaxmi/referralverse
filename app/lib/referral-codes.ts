export interface ReferralCodeRecord {
  id: string;
  app_slug: string;
  code: string;
}

export function normalizeReferralCodes(input: string | string[] | null | undefined): string[] {
  if (!input) {
    return [];
  }

  const values = Array.isArray(input) ? input : [input];

  return values
    .map((value) => value?.toString().trim())
    .filter((value): value is string => Boolean(value))
    .filter((value) => value.length > 0);
}

export function getCacheTtlSeconds() {
  const configuredTtl = Number(process.env.REFERRAL_CODES_CACHE_TTL_SECONDS || 60);
  return Number.isFinite(configuredTtl) && configuredTtl > 0 ? configuredTtl : 60;
}

export function getDisplayReferralCodes(
  dynamicCodes: string[] | undefined,
  fallbackCodes: string[],
  maxCodes = 4,
): string[] {
  const source = dynamicCodes && dynamicCodes.length > 0 ? dynamicCodes : fallbackCodes;
  return source.slice(0, maxCodes);
}

export function getSupabaseSubmissionErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (message.toLowerCase().includes('row-level security')) {
    return 'Supabase is blocking the insert because the referral_codes table has no insert policy. Please add an INSERT policy for anonymous/public access.';
  }

  return message || 'Something went wrong while saving the referral code.';
}
