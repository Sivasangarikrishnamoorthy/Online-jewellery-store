import React from 'react';
import './globals.css';

const metadata = {
  title: 'Online jewelluxe App',
  description: 'Online jewelluxe App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <base href="/Online-jewellery-store/" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
      </head>
      <body style={{ backgroundColor: 'white' }}>{children}</body>
    </html>
  );
}
