export interface ReferralCodeRecord {
  id: string;
  app_slug: string;
  code: string;
}

export interface ReferralCodeValidationResult {
  isValid: boolean;
  normalized: string;
  error?: string;
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

export function validateReferralCodeInput(input: string | null | undefined): ReferralCodeValidationResult {
  const normalized = input?.toString().trim() || '';

  if (!normalized) {
    return {
      isValid: false,
      normalized,
      error: 'Please enter a referral code.',
    };
  }

  if (normalized.length < 3 || normalized.length > 10) {
    return {
      isValid: false,
      normalized,
      error: 'Referral code should be between 3 and 10 characters long.',
    };
  }

  if (/^(test|demo|sample|dummy|example)$/i.test(normalized)) {
    return {
      isValid: false,
      normalized,
      error: 'Please enter a real referral code.',
    };
  }

  if (/\s/.test(normalized)) {
    return {
      isValid: false,
      normalized,
      error: 'Referral codes should not contain spaces.',
    };
  }

  return {
    isValid: true,
    normalized,
  };
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
