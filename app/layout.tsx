
import React from "react"
import "../styles/global.css"
import Navbar from "./Navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html data-theme="night" >
      <body>
        <div className="flex flex-col h-screen">
          <div>
            <Navbar />
          </div>
          <div className="flex-1 h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

