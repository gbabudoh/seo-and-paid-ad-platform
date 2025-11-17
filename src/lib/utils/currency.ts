/**
 * Currency conversion utilities
 */

export interface CurrencyConversion {
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
}

/**
 * Convert amount from one currency to another
 * Note: In production, fetch real-time rates from an API
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  return amount * exchangeRate;
}

/**
 * Format currency for display
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(0).replace(/\d/g, '').trim();
}

