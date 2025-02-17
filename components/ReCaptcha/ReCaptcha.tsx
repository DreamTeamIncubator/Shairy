import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type reCaptchaTheme = 'dark' | 'light'
declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: string | HTMLElement,
        parameters: {
          'sitekey': string;
          'callback': (response: string) => void;
          'expired-callback': () => void
          'theme': reCaptchaTheme
        },
      ) => void;
      ready: (callback: () => void) => void;
    };
    onRecaptchaLoad: (() => void) | null;
  }
}
type Props = {
  sitekey: string
  changeCaptchaStatus: Dispatch<SetStateAction<boolean>> | (() => void);
  theme?: reCaptchaTheme
};

export const ReCaptcha = ({ sitekey, changeCaptchaStatus, theme = 'dark' }: Props) => {
  const onRecaptchaLoad = () => {
    setIsRecaptchaLoaded(true);
  };
  const captchaCompletedHandler = (response: string) => {
    changeCaptchaStatus(true);
  };
  const captchaExpiredHandler = () => {
    changeCaptchaStatus(false);
  };

  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.onRecaptchaLoad = onRecaptchaLoad;
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      setIsRecaptchaLoaded(true);
    }
    return () => {
      window.onRecaptchaLoad = null;
    };
  }, []);
  useEffect(() => {
    if (isRecaptchaLoaded && recaptchaRef.current) {
      window.grecaptcha.render(recaptchaRef.current, {
        'sitekey': sitekey,
        'callback': captchaCompletedHandler,
        'expired-callback': captchaExpiredHandler,
        'theme': theme,
      });
    }
  }, [isRecaptchaLoaded, sitekey, theme]);

  return (
    <div ref={recaptchaRef}></div>
  );
};