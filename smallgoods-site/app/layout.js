import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={navStyle}>
          < a href=" ">Home</ a>
          < a href="/products">Products</ a>
          < a href="/about">About</ a>
          < a href="/faq">FAQ</ a>
          < a href="/contact">Contact</ a>
        </nav>
        <main style={mainStyle}>{children}</main>
        <footer style={footerStyle}>
           2026 Small Goods Wholesale | OEM & ODM Custom Service
        </footer>
      </body>
    </html>
  )
}

const navStyle = {
  display: 'flex',
  gap: '30px',
  padding: '20px 40px',
  background: '#111',
  justifyContent: 'center'
}

const mainStyle = {
  minHeight: '80vh',
  padding: '40px'
}

const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  background: '#111',
  color: '#fff'
}