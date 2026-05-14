import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaskFlow Premium',
  description: 'Manage your tasks with style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      {/* Il padding-top di 2px serve a compensare lo spessore della barra superiore */}
      <body style={{ paddingTop: '2px' }}>
        {children}
      </body>
    </html>
  )
}