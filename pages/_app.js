import "../styles/globals.css";
import { StoreProvider } from "../utils/store";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      {/* <DefaultSeo {...SEO} /> */}
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
