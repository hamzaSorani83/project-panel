import 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.css'
import '../styles/show-project.css'
import Head from 'next/head'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assests/images/favicon.ico"></link>
    </Head>
    <Component {...pageProps} />
    </>
    );
}

export default MyApp
