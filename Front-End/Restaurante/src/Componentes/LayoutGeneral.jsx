import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutGeneral = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutGeneral;
