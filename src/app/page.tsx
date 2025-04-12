"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import ContactSection from "../../components/contactSection";
import WhatsAppButton from "../../components/WhatsAppButton";
import Loading from "../../components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <ContactSection />
      <Footer />
      {/* WhatsAppButton removed from here as it's now in layout */}
    </main>
  );
}