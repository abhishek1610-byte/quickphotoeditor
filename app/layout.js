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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
  // WebApplication JSON-LD Schema for Google Search Rich Snippets
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a' }}>
        {children}
      </body>
    </html>
  );
}
