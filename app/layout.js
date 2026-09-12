import Script from 'next/script';
export const metadata = {
  metadataBase: new URL('https://quickphotoeditor.vercel.app'),
  title: {
    default: 'QuickPhotoEditor - Free Online Image Compressor, Resizer & Editor',
    template: '%s | QuickPhotoEditor',
  },
  description: 'Fast, secure, browser-based photo editor. Compress to exact KB, resize dimensions, crop for social media, remove backgrounds, and add custom passport text.',
  keywords: [
    'image compressor',
    'compress image to 50kb',
    'compress image to 20kb',
    'resize image',
    'crop photo passport size',
    'remove background free',
    'add name and date on photo',
    'online photo editor'
  ],
  authors: [{ name: 'QuickPhotoEditor Team' }],
  openGraph: {
    title: 'QuickPhotoEditor - Free Online Image Compressor, Resizer & Editor',
    description: 'Compress, resize, crop, and edit images right in your browser with complete privacy.',
    url: 'https://quickphotoeditor.vercel.app',
    siteName: 'QuickPhotoEditor',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickPhotoEditor - Free Online Image Tools',
    description: 'Edit, resize, and compress your photos instantly with zero uploads.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'YEED3ZCzP6rlvh8DKF_GueN59zenduTvr_bcSreYPEw',
  },
  alternates: {
    canonical: 'https://quickphotoeditor.vercel.app',
  },
  openGraph: {
    title: 'QuickPhotoEditor - Free Online Image Tools',
    description: 'Compress, resize, crop, and edit photos directly in your browser with real-time size preview.',
    url: 'https://quickphotoeditor.vercel.app',
    siteName: 'QuickPhotoEditor',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickPhotoEditor - Free Online Image Tools',
    description: 'Free browser-based photo editing utilities with zero server upload.',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QuickPhotoEditor',
    url: 'https://quickphotoeditor.vercel.app',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Image Compression to exact KB',
      'Pixel and Percentage Dimension Resizer',
      'Passport and Social Media Cropping',
      'Photo Text and Date Watermarking',
      'Instant Background Remover'
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="google-site-verification" content="YEED3ZCzP6rlvh8DKF_GueN59zenduTvr_bcSreYPEw" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3608428593956806"
          crossOrigin="anonymous"
        ></script> 
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a' }}>
        {children}
      </body>
    </html>
  );
}
