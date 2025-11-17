import { z } from 'zod';

/**
 * Common validation schemas
 */

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const urlSchema = z.string().url('Invalid URL');

export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

export const currencyCodeSchema = z.string().length(3, 'Currency code must be 3 characters');

export const countryCodeSchema = z.string().length(2, 'Country code must be 2 characters');

export const languageCodeSchema = z.string().length(2, 'Language code must be 2 characters');

/**
 * Client onboarding validation schema
 */
export const clientOnboardingSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  website: urlSchema,
  industry: z.enum([
    'ecommerce_fashion',
    'ecommerce_electronics',
    'b2b_saas',
    'local_service_plumbing',
    'local_service_electrician',
    'healthcare',
    'real_estate',
    'education',
    'finance',
    'other',
  ]),
  targetAudience: z.object({
    demographics: z.object({
      ageRange: z.array(z.number()).length(2).optional(),
      gender: z.enum(['male', 'female', 'all']).optional(),
      locations: z.array(z.string()).default([]),
    }),
    interests: z.array(z.string()).default([]),
    behaviors: z.array(z.string()).optional(),
  }),
  targetCountries: z.array(countryCodeSchema).min(1, 'Select at least one target country'),
  preferredLanguage: languageCodeSchema,
  packageTier: z.enum(['bronze', 'silver', 'gold', 'enterprise']),
  roiExpectation: z.object({
    type: z.enum(['roas', 'leads', 'sales', 'brand_awareness']),
    value: z.number().positive('Value must be positive'),
    metric: z.string().optional(),
  }),
  budgetAllocation: z.object({
    seo: z.number().min(0).max(100),
    googleAds: z.number().min(0).max(100),
    metaAds: z.number().min(0).max(100),
    tiktokAds: z.number().min(0).max(100).optional(),
    linkedinAds: z.number().min(0).max(100).optional(),
    other: z.number().min(0).max(100).optional(),
  }).refine(
    (data) => {
      const total = (data.seo || 0) + (data.googleAds || 0) + (data.metaAds || 0) +
        (data.tiktokAds || 0) + (data.linkedinAds || 0) + (data.other || 0);
      return Math.abs(total - 100) < 1; // Allow small rounding differences
    },
    { message: 'Budget allocation must total 100%' }
  ),
});

export type ClientOnboardingInput = z.infer<typeof clientOnboardingSchema>;

