"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import ContactSection from "../../components/contactSection";
import WhatsAppButton from "../../components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}