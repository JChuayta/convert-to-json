import { useEffect } from 'react';
import { AnalyticsEvent, trackEvent, trackPageView } from '../utils/analytics';

export const useAnalytics = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return {
    trackConversion: (metadata?: {
      hasDynatracePrefix?: boolean;
      documentCount?: number;
      signatoryCount?: number;
    }) => {
      trackEvent(AnalyticsEvent.JSON_CONVERTED, {
        has_dynatrace_prefix: metadata?.hasDynatracePrefix || false,
        document_count: metadata?.documentCount || 0,
        signatory_count: metadata?.signatoryCount || 0,
      });
    },
    trackCopy: () => {
      trackEvent(AnalyticsEvent.JSON_COPIED);
    },
    trackClear: () => {
      trackEvent(AnalyticsEvent.JSON_CLEARED);
    },
    trackError: (errorType: string, errorMessage?: string) => {
      trackEvent(AnalyticsEvent.CONVERSION_ERROR, {
        error_type: errorType,
        error_message: errorMessage || 'Unknown error',
      });
    },
    trackModalClose: () => {
      trackEvent(AnalyticsEvent.MODAL_CLOSED);
    },
    trackCustomEvent: (eventName: string, params?: Record<string, string | number | boolean>) => {
      trackEvent(eventName, params);
    },
  };
};

