import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        }}
      >
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
