import { Inter } from 'next/font/google'
import './globals.scss'
import { AuthProvider } from '@/providers/session'
import ToastProvider from '@/providers/toastProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            <h2 style={{marginTop: '4rem', width: '100%', textAlign: 'center', fontSize: '2rem'}}>Account Abstraction EthSamba 24</h2>
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
