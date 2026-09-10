export const metadata = {
  title: 'QuickPhotoEditor - Free Online Photo Tools',
  description: 'Resize, compress, and edit photos online for free.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
