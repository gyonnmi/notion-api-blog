import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

//PropsWithChildren => children 하나만 가져올 때 이거 쓰면 편함
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
