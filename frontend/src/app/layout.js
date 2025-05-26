import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: 'Traffic Turbine',
  description: 'Traffic Turbine Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
