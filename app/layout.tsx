import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Consultorio',
  description: 'Agende sua consulta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
    </html>
  )
}
