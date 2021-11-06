import Document, { Html, Head, Main, NextScript } from "next/document"

/* Used to attach an id to the body to make tailwind more specific because NES.css was overriding some margin styles
 * Please read: https://tailwindcss.com/docs/configuration#selector-strategy
 */

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body id="app">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument