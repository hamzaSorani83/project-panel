import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='theme-mode-dark dark-background theme-color-green'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}