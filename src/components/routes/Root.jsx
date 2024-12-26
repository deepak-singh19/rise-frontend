import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Header />
      <div id="detail">
        <Outlet />
      </div>
      <ScrollRestoration />
      <Footer />
    </>
  );
}
