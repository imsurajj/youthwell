"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

// Navigation links constant
const NAVIGATION_LINKS = [
  { title: "Home", href: "/" },
  { 
    title: "Services", 
    href: "#",
    dropdown: [
      { title: "personalised wellness", href: "/personalwellness", description: "" },
      { title: "anonymous venting chatbot", href: "/chatbot", description: "" },
      { title: "daily wellness reminders", href: "/reminder", description: "" },
      { title: "mood history dashboard", href: "/chatdash", description: "" }
    ]
  },
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setClickedDropdown(null);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownHover = (title: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(title);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent closing when moving to dropdown content
  };

  const handleDropdownClick = (title: string) => {
    if (clickedDropdown === title) {
      setClickedDropdown(null);
    } else {
      setClickedDropdown(title);
    }
  };

  const handleLinkClick = () => {
    setClickedDropdown(null);
    setActiveDropdown(null);
  };

  // Render navigation link function
  const renderNavLink = (link: typeof NAVIGATION_LINKS[0], isMobile: boolean = false) => {
    if (link.dropdown) {
      // For mobile, only show dropdown if mobile menu is open AND this dropdown is clicked
      // For desktop, show dropdown on hover or click
      const isOpen = isMobile 
        ? (isMobileMenuOpen && clickedDropdown === link.title)
        : (clickedDropdown === link.title || activeDropdown === link.title);
       
      return (
        <div 
          key={link.title}
          className="relative dropdown-container"
          onMouseEnter={() => !isMobile && handleDropdownHover(link.title)}
          onMouseLeave={() => !isMobile && handleDropdownLeave()}
        >
          <button 
            className={`flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-all duration-200 ${
              isMobile ? 'w-full text-left py-3 px-3 rounded-lg hover:bg-accent' : ''
            }`}
            onClick={() => handleDropdownClick(link.title)}
          >
            {link.title}
            <ChevronDown className={`size-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Desktop Dropdown */}
          {!isMobile && isOpen && (
            <div className="absolute top-full left-0 mt-2 w-96 bg-popover border border-border rounded-lg shadow-lg z-50">
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="block p-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={handleLinkClick}
                    >
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm opacity-90">{item.description}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Dropdown */}
          {isMobile && isOpen && (
            <div className="pl-4 space-y-1">
              {link.dropdown.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary py-2 px-3 rounded-lg hover:bg-accent transition-all duration-200"
                  onClick={handleLinkClick}
                >
                  {item.title}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a 
        key={link.title}
        href={link.href} 
        className={`block text-sm text-muted-foreground hover:text-primary transition-all duration-200 ${
          isMobile 
            ? 'py-3 px-3 rounded-lg hover:bg-accent' 
            : ''
        }`}
        onClick={handleLinkClick}
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
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden w-8 h-8 text-muted-foreground transition-all duration-200 hover:scale-105"
            aria-label="Toggle mobile menu"
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
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-t border-border transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
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
