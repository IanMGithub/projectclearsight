import { currentPage } from "./content/site.ts";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { ImageChallenge } from "./components/ImageChallenge.tsx";
import { InstructionGap } from "./components/InstructionGap.tsx";
import { LearnPage } from "./components/LearnPage.tsx";
import { Mission } from "./components/Mission.tsx";
import { Pillars } from "./components/Pillars.tsx";
import { Problem } from "./components/Problem.tsx";
import { StayConnected } from "./components/StayConnected.tsx";
import { Takeaway } from "./components/Takeaway.tsx";

export default function App() {
  const page = currentPage(window.location.pathname);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        {page === "challenge" ? (
          <ImageChallenge />
        ) : page === "learn" ? (
          <LearnPage />
        ) : (
          <>
            <Hero />
            <Problem />
            <InstructionGap />
            <Mission />
            <Pillars />
            <Takeaway />
            <StayConnected />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
