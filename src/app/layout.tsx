import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import IsHomeProvider from './context/IsHomeContext'
import AuthProvider from './context/AuthContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Controle de Estoque',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>

        <IsHomeProvider>
          <body className={inter.className}>{children}</body>

        </IsHomeProvider>
      </AuthProvider>
    </html>
  )
}
