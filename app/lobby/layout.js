import Header from "@/components/Header"


export default function RootLayout({ children }) {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    )
  }