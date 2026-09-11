import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VeilPay | Confidential Split & Payroll Protocol on Midnight Network',
  description: 'Production-grade confidential multi-party split & payroll dApp powered by Midnight Network Compact smart contracts, zero-knowledge solvency proofs, and Lace wallet.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-shadow-void-950 text-white antialiased selection:bg-shadow-purple-neon selection:text-shadow-void-950">
        {children}
      </body>
    </html>
  );
}
