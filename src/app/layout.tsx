import ReactQueryProviders from '@/components/providers/react-query'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Andi | Pokedex App',
  description: 'Andi | Pokedex App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReactQueryProviders>
        <body>{children}</body>
      </ReactQueryProviders>
    </html >
  )
}
