
import React from "react"
import "../styles/global.css"
import AuthProviderWrapper from "./AuthProviderWrapper"
import Navbar from "./Navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html data-theme="night" >
      <body>
        <AuthProviderWrapper>
          <div className="flex flex-col h-screen">
            <div>
              <Navbar />
            </div>
            <div className="flex-1 h-full">
              {children}
            </div>
          </div>
        </AuthProviderWrapper>
      </body>
    </html>
  )
}

