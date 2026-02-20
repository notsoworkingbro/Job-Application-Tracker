
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>

        <Navbar />

        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>

      </body>
    </html>
  )
}