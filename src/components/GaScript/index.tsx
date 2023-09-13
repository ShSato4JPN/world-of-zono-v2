"use client";
import Script from "next/script";

function GaScript(): JSX.Element {
  return (
    <>
      <Script
        defer
        id="ga-connect"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script defer id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag("config", '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
      </Script>
    </>
  );
}

export default GaScript;
