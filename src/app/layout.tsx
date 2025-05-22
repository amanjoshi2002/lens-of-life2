import './globals.css';
import type { Metadata } from 'next';
import { Limelight, Poppins } from 'next/font/google';
import WhatsAppButton from '../../components/WhatsAppButton';
import CallButton from '../../components/CallButton';
import GoogleAnalytics from '../../components/GoogleAnalytics';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
});

export const metadata: Metadata = {
  title: 'Lens Of Life Creation',
  description: 'Luxury portrait photography capturing life\'s most precious moments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={poppins.className}>
        {children}
        <WhatsAppButton />
        <CallButton />
      </body>
    </html>
  );
}