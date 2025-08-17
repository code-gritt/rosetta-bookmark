// Page Layout
import Page from "./components/sections/Page";

// Header
import Header from "./components/sections/Header";
import Navigation from "./components/sections/Navigation";
import Hero from "./components/sections/Hero";
import Reviews from "./components/sections/Reviews";

// Main
import Main from "./components/sections/Main";
import Logos from "./components/sections/Logos";
import Features from "./components/sections/Features";
import FAQs from "./components/sections/FAQs/FAQs";
import Testimonials from "./components/sections/Tesimonials/Testimonials";

// Footer
import Footer from "./components/sections/Footer";

// Modal
import Modal from "./components/sections/Modal/Modal";
import SignUpModal from "./components/sections/Modal/SignUpModal";
import LoginModal from "./components/sections/Modal/LoginModal";
import { ModalContextProvider } from "./contexts/ModalContext";

// Mobile Menu
import MobileMenu from "./components/sections/MobileMenu/MobileMenu";
import { MobileMenuContextProvider } from "./contexts/MobileMenuContext";
import ClientWrapper from "./components/client-wrapper";
import { Routes, Route } from "react-router-dom"; // Import routing components
import Dashboard from "./components/sections/Dashboard";

function App() {
  return (
    <ClientWrapper>
      <ModalContextProvider>
        <MobileMenuContextProvider>
          <Routes>
            {/* Landing page */}
            <Route
              path="/"
              element={
                <Page>
                  <Header>
                    <Navigation />
                    <Hero />
                    <Reviews />
                  </Header>
                  <Main>
                    <Logos />
                    <Features />
                    <FAQs />
                    <Testimonials />
                  </Main>
                  <Footer />
                  <Modal modal="sign-up">
                    <SignUpModal />
                  </Modal>
                  <Modal modal="login">
                    <LoginModal />
                  </Modal>
                  <MobileMenu />
                </Page>
              }
            />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MobileMenuContextProvider>
      </ModalContextProvider>
    </ClientWrapper>
  );
}

export default App;
