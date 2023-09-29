import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Topbar from '@/components/shared/topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/bottombar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trådar',
  description: 'Trådar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="sv">
        <body className={inter.className}> 
          <Topbar /> 
            <main>
              <LeftSidebar />

              <section className='main-container'>
                <div className='w-full max-w-4xl'>
                  {children}
                </div>
              </section>

              <RightSidebar />
            </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
