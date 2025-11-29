declare global {
  interface Window {
    dataLayer: Array<any>;
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const ENABLE_DEV = import.meta.env.VITE_GA_ENABLE_DEV === 'true';

export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: Measurement ID no configurado');
    return;
  }

  if (import.meta.env.DEV && !ENABLE_DEV) {
    console.log('Google Analytics: Deshabilitado en modo desarrollo');
    return;
  }

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      console.log('Google Analytics inicializado correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar Google Analytics:', error);
  }
};

export enum AnalyticsEvent {
  JSON_CONVERTED = 'json_converted',
  JSON_COPIED = 'json_copied',
  JSON_CLEARED = 'json_cleared',
  
  CONVERSION_ERROR = 'conversion_error',
  
  MODAL_CLOSED = 'modal_closed',
}

export const trackEvent = (
  eventName: AnalyticsEvent | string,
  eventParams?: {
    [key: string]: string | number | boolean;
  }
): void => {
  if (!GA_MEASUREMENT_ID || (import.meta.env.DEV && !ENABLE_DEV)) return;

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams || {});
    }
  } catch (error) {
    console.error('Error al enviar evento a Google Analytics:', error);
  }
};

export const trackPageView = (path: string, title?: string): void => {
  if (!GA_MEASUREMENT_ID || (import.meta.env.DEV && !ENABLE_DEV)) return;

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title || document.title,
      });
    }
  } catch (error) {
    console.error('Error al enviar página vista a Google Analytics:', error);
  }
};

export const trackConversion = (metadata?: {
  hasDynatracePrefix?: boolean;
  documentCount?: number;
  signatoryCount?: number;
}): void => {
  trackEvent(AnalyticsEvent.JSON_CONVERTED, {
    has_dynatrace_prefix: metadata?.hasDynatracePrefix || false,
    document_count: metadata?.documentCount || 0,
    signatory_count: metadata?.signatoryCount || 0,
  });
};

export const trackError = (errorType: string, errorMessage?: string): void => {
  trackEvent(AnalyticsEvent.CONVERSION_ERROR, {
    error_type: errorType,
    error_message: errorMessage || 'Unknown error',
  });
};

