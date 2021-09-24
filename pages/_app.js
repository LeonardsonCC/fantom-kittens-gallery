import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import Head from "next/head";
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" /> 
        <link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp