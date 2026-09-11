 export const metadata = {
  title: 'QuickPhotoEditor - Free Online Image Editing & Conversion Tools',
  description: 'Fast, secure, and browser-based online photo editor. Compress, resize, crop images, remove backgrounds, and add custom text instantly without server uploads.',
  keywords: 'image compressor, crop photo, resize image, remove background, add text to photo, online photo editor',
  authors: [{ name: 'QuickPhotoEditor Team' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a' }}>
        {children}
      </body>
    </html>
  );
}
