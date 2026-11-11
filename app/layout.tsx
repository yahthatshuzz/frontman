import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontman',
  description: 'Video delivery coach — score every take, find your best one.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <nav className="border-b border-border px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Frontman
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/shoot" className="hover:text-accent transition">
              Shoot
            </Link>
            <Link href="/takes" className="hover:text-accent transition">
              Takes
            </Link>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
