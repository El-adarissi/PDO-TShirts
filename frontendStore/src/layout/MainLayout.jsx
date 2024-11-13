import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import InfoSection from "../components/InfoSection";
import ScrollToTop from "../components/ScrollToTop";
import Collection from "../components/Collection";
const MainLayout = ({ children }) => {
  return (
    <div className="">
      <ScrollToTop />
      <Navbar />
      <div>{children}</div>
      <Collection/>
      <InfoSection />
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
