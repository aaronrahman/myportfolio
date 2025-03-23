"use client";

import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Map from "./components/Map";
import Music from "./components/Music";
import Contact from "./components/Contact";

// Dynamically load only on client
const HeaderNoSSR = dynamic(() => import("./components/Header"), { ssr: false });
const StarFieldNoSSR = dynamic(() => import("./components/StarField"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StarFieldNoSSR />
      <HeaderNoSSR />
      <Hero />
      <Projects />
      <Map />
      <Music />
      <Contact />
      <main>{children}</main>
    </>
  );
}