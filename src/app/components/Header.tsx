"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const smoothScroll = (id: string) => {
    if (typeof window !== "undefined") {
      const section = document.querySelector(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false); // Close mobile menu
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 transition-colors ${
        scrolled ? "bg-black bg-opacity-80 backdrop-blur-md" : "bg-transparent"
      } z-50`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[var(--color-foreground)]">
          Aaron&apos;s Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <button onClick={() => smoothScroll("#hero")} className="hover:text-[var(--color-secondary)] transition font-bold">
            Home
          </button>
          <button onClick={() => smoothScroll("#projects")} className="hover:text-[var(--color-secondary)] transition font-bold">
            Projects
          </button>
          <button onClick={() => smoothScroll("#map")} className="hover:text-[var(--color-secondary)] transition font-bold">
            Travelling
          </button>
          <button onClick={() => smoothScroll("#music")} className="hover:text-[var(--color-secondary)] transition font-bold">
            Music
          </button>
          <button onClick={() => smoothScroll("#contact")} className="hover:text-[var(--color-secondary)] transition font-bold">
            Contact
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[var(--color-foreground)]">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-black bg-opacity-80 flex flex-col items-center gap-4 p-4 text-[var(--color-foreground)]">
          <button onClick={() => smoothScroll("#hero")}>Home</button>
          <button onClick={() => smoothScroll("#projects")}>Projects</button>
          <button onClick={() => smoothScroll("#map")}>Places</button>
          <button onClick={() => smoothScroll("#music")}>Music</button>
          <button onClick={() => smoothScroll("#contact")}>Contact</button>
        </nav>
      )}
    </header>
  );
}