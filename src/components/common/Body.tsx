"use client";
import { AuthProvider } from "@/src/contexts/AuthProvider";
import store from "@/src/store/store";
import { PropsWithChildren, use } from "react";
import { Provider } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import CartFromLocalStorage from "@/src/utils/CartFromLocalStorage";

function Body({ children }: PropsWithChildren) {
  return (
    <body>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartFromLocalStorage />
        </AuthProvider>
      </Provider>
    </body>
  );
}

export default Body;
