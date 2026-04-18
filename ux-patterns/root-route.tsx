import React from 'react'

// Next.js App Router layout pattern
// This would be used in src/app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
      </head>
      <body>
        <div className='flex min-h-screen flex-col bg-surface-container'>
          <main className='flex flex-1 flex-col'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

// Alternative: Page layout wrapper component
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-surface-container'>
      <main className='flex flex-1 flex-col'>
        {children}
      </main>
    </div>
  )
}