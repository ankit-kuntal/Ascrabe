import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ascrabe - Sell Your Scrap, Earn Cash',
  description: 'Ascrabe makes it easy to sell newspapers, electronics, plastic, metal, and more. Schedule a pickup and get paid instantly.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Ascrabe - Sell Your Scrap, Earn Cash',
    description: 'Easy scrap selling platform with instant pickup and payment',
    url: 'http://localhost:3000',
    siteName: 'Ascrabe',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#10b981',
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
