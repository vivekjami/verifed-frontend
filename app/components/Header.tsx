"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative border-t border-blue-800 bg-blue-950  supports-[backdrop-filter]:bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 lg:px-8 w-full">
        <div className="flex items-center gap-2 absolute left-4">
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
          <span className="text-xl sm:text-2xl font-bold">VerifED</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8 xl:gap-10 mx-auto">
          {[{ href: "#features", label: "Features" }, { href: "#how-it-works", label: "How It Works" }, { href: "#security", label: "Security" }].map((item) => (
            <Link key={item.href} href={item.href} className="text-blue-300 hover:text-white transition-colors text-base lg:text-lg">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 absolute right-4">
          <Link href="/dashboard">
            <Button variant="outline" className="hidden sm:flex text-base lg:text-lg border-blue-400 text-blue-300 hover:text-black hover:border-white">
              Get Started
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden text-blue-300 hover:text-white" onClick={toggleMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

      </div>
  
      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 bg-blue-950/90 backdrop-blur-md md:hidden flex flex-col items-center justify-center space-y-6 text-white"
          >
            {[
              { href: "#features", label: "Features" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#security", label: "Security" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl text-blue-800 hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="w-48 sm:hidden border-blue-400 text-blue-300 hover:text-black hover:border-blue-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
