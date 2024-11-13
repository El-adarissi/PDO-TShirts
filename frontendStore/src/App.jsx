import Navbar from "./components/Navbar";
import HeaderSection from "./components/HeaderSection";
import Footer from "./components/Footer";
import InfoSection from "./components/InfoSection";
import Collection from "./components/Collection";
import ScrollToTop from "./components/ScrollToTop";
import Main from "./components/main/Main";
import ScrollTop from "./components/scroll/ScrollToTop.jsx";
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <HeaderSection />
      <Main />
      <Collection />
      <InfoSection />
      <Footer />
      <ScrollTop />
    </>
  );
};

export default App;
