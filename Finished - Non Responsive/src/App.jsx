// Page Layout
import Page from "./components/Page";

// Header
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

// Main
import Main from "./components/Main";
import Logos from "./components/Logos";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";

// Footer
import Footer from "./components/Footer";

function App() {
  return (
    <Page>
      <Header>
        <Navigation />
        <Hero />
      </Header>
      <Main>
        <Logos />
        <Features />
        <FAQ />
        <Testimonials />
      </Main>
      <Footer />
    </Page>
  );
}

export default App;
