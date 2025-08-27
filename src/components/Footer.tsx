const Footer = () => {
  const footerLinks = {
    company: [
      { title: "About Us", href: "#" },
      { title: "Our Mission", href: "#" },
      { title: "Team", href: "#" },
      { title: "Careers", href: "#" }
    ],
    services: [
      { title: "Mental Health", href: "#" },
      { title: "Wellness Programs", href: "#" },
      { title: "Career Guidance", href: "#" },
      { title: "Community Events", href: "#" }
    ],
    support: [
      { title: "Help Center", href: "#" },
      { title: "Contact Us", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" }
    ]
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">Y</span>
              </div>
              <span className="text-xl font-bold text-foreground">YouthWell</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering youth wellness through comprehensive support, resources, and community.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © 2024 YouthWell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
