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
import LoginModal from "./components/sections/Modal/LoginModal"; // Import LoginModal
import { ModalContextProvider } from "./contexts/ModalContext";

// Mobile Menu
import MobileMenu from "./components/sections/MobileMenu/MobileMenu";
import { MobileMenuContextProvider } from "./contexts/MobileMenuContext";
import ClientWrapper from "./components/client-wrapper";

function App() {
  return (
    <ClientWrapper>
      <ModalContextProvider>
        <MobileMenuContextProvider>
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

            {/* Modal for Sign-up */}
            <Modal modal="sign-up">
              <SignUpModal />
            </Modal>

            {/* Modal for Login */}
            <Modal modal="login">
              <LoginModal />
            </Modal>

            <MobileMenu />
          </Page>
        </MobileMenuContextProvider>
      </ModalContextProvider>
    </ClientWrapper>
  );
}

export default App;
