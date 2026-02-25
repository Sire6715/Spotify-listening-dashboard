import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { ContextProvider } from "@/components/context/ContextProvider";
import { useRouter } from "next/router";

const NO_LAYOUT_ROUTES = ["/"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showLayout = !NO_LAYOUT_ROUTES.includes(router.pathname);

  return (
    <ContextProvider>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ContextProvider>
  );
} 