import Script from "next/script";

import { config } from "config";

const Scripts = () => (
  <>
    {config?.googleAnalytics?.enable === true && (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.config.measurementId}`}
        />
        <Script
          strategy="afterInteractive"
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${config.googleAnalytics.config.measurementId}', {
              page_path: window.location.pathname,
            });`,
          }}
        ></Script>
      </>
    )}
  </>
);

export default Scripts;
