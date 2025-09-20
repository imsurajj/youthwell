/**
 * Cookie consent utilities for YouthWell
 */

export type CookieConsentStatus = 'accepted' | 'declined' | null;

export interface CookieConsentData {
  status: CookieConsentStatus;
  timestamp: string | null;
  isExpired: boolean;
}

/**
 * Get the current cookie consent status
 */
export function getCookieConsent(): CookieConsentData {
  if (typeof window === 'undefined') {
    return { status: null, timestamp: null, isExpired: false };
  }

  const status = localStorage.getItem('youthwell-cookie-consent') as CookieConsentStatus;
  const timestamp = localStorage.getItem('youthwell-cookie-timestamp');
  
  // Check if consent is older than 1 year (optional - you can adjust this)
  const isExpired = timestamp ? 
    (Date.now() - new Date(timestamp).getTime()) > (365 * 24 * 60 * 60 * 1000) : 
    false;

  return {
    status,
    timestamp,
    isExpired
  };
}

/**
 * Set cookie consent status
 */
export function setCookieConsent(status: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('youthwell-cookie-consent', status);
  localStorage.setItem('youthwell-cookie-timestamp', new Date().toISOString());
}

/**
 * Clear cookie consent data
 */
export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('youthwell-cookie-consent');
  localStorage.removeItem('youthwell-cookie-timestamp');
}

/**
 * Check if user has accepted cookies
 */
export function hasAcceptedCookies(): boolean {
  const { status } = getCookieConsent();
  return status === 'accepted';
}

/**
 * Check if user has made any cookie choice
 */
export function hasCookieConsent(): boolean {
  const { status } = getCookieConsent();
  return status !== null;
}
