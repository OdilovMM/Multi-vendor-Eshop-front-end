import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <section className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
