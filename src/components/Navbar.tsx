"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

// Navigation links constant
const NAVIGATION_LINKS = [
  { title: "Home", href: "/" },
  { title: "Features", href: "#features" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

// Auth configuration constant
const AUTH_CONFIG = {
  login: { title: "Login", href: "/login" },
  signup: { title: "Sign Up", href: "/signup" },
};

// Logo configuration constant
const LOGO_CONFIG = {
  text: "YouthWell",
  icon: "Y",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('Toggle mobile menu clicked, current state:', isMobileMenuOpen);
    const newState = !isMobileMenuOpen;
    console.log('Setting new state to:', newState);
    setIsMobileMenuOpen(newState);
  };

  // Debug state changes
  useEffect(() => {
    console.log('Mobile menu state changed to:', isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);

    // Handle smooth scrolling for features link
    if (href === '#features') {
      e.preventDefault();
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Render navigation link function
  const renderNavLink = (link: typeof NAVIGATION_LINKS[0], isMobile: boolean = false) => {
    return (
      <a 
        key={link.title}
        href={link.href} 
        className={`block text-sm text-muted-foreground hover:text-primary transition-all duration-200 ${
          isMobile 
            ? 'py-3 px-3 rounded-lg hover:bg-accent' 
            : ''
        }`}
        onClick={(e) => handleLinkClick(e, link.href)}
      >
        {link.title}
      </a>
    );
  };

  // Render auth buttons function
  const renderAuthButtons = (isMobile: boolean = false) => (
    <div className={`${isMobile ? 'space-y-3' : 'flex items-center gap-2'}`}>
      <Button 
        variant="ghost" 
        size={isMobile ? "default" : "sm"} 
        className={isMobile ? "w-full justify-start text-sm py-3" : "text-sm"}
        asChild
      >
        <a href={AUTH_CONFIG.login.href}>{AUTH_CONFIG.login.title}</a>
      </Button>
      <Button 
        size={isMobile ? "default" : "sm"} 
        className={isMobile ? "w-full justify-start text-sm py-3" : "text-sm px-4"}
        asChild
      >
        <a href={AUTH_CONFIG.signup.href}>{AUTH_CONFIG.signup.title}</a>
      </Button>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 py-3 px-4 border-b border-border bg-background/95 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">
              {LOGO_CONFIG.icon}
            </span>
          </div>
          <span className="text-xl font-bold text-foreground">
            {LOGO_CONFIG.text}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NAVIGATION_LINKS.map(link => renderNavLink(link))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            ref={mobileMenuButtonRef}
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden w-8 h-8 text-muted-foreground transition-all duration-200 hover:scale-105"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span 
                className={`absolute top-1/2 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                }`}
              />
              <span 
                className={`absolute top-1/2 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute top-1/2 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1'
                }`}
              />
            </div>
          </Button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {renderAuthButtons()}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-t border-border transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-8">
          {/* Navigation Links */}
          <div className="space-y-1 mb-8">
            {NAVIGATION_LINKS.map(link => renderNavLink(link, true))}
          </div>

          {/* Auth Buttons */}
          <div className="pt-6 border-t border-border">
            {renderAuthButtons(true)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
