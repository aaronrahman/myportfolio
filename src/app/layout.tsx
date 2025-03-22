import type { Metadata } from "next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StarField from "./components/StarField";
import Projects from "./components/Projects";
import Map from "./components/Map";
import Music from "./components/Music";
import Contact from "./components/Contact";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaron's Portfolio",
  description: "A showcase of my work, travels, and music interests.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StarField />
        <Header />
        <Hero />
        <Projects />
        <Map />
        <Music />
        <Contact />
        <main>{children}</main>
      </body>
    </html>
  );
}