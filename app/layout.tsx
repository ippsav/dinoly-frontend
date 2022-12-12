
import React from "react"
import "../styles/global.css"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html data-theme="night" >
      <body>
        {children}
      </body>
    </html>
  )
}

