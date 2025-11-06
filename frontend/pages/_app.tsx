import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { ContextProvider } from "@/components/context/ContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
