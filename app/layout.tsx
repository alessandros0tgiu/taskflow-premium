import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Manage your tasks with style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}