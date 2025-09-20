"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasAcceptedCookies } from "@/lib/cookies";

const Hero = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    // For now, we'll check if they have any stored data as a simple auth check
    // In a real app, you'd check JWT tokens, session, etc.
    const checkAuth = () => {
      const hasStoredData = localStorage.getItem('youthwell-selected-mood') || 
                           localStorage.getItem('youthwell-cookie-consent');
      setIsAuthenticated(!!hasStoredData);
      setIsLoading(false);
    };

    // Only check if cookies are accepted
    if (hasAcceptedCookies()) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/about');
    }
  };

  return (
    <section className="py-46 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-5xl font-bold text-foreground mb-6">
          Empowering Youth Wellness
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          A comprehensive platform dedicated to youth mental health, wellness, and personal development. 
          Join our community to discover resources, support, and tools for a healthier future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Loading...
              </span>
            ) : isAuthenticated ? (
              'Go to Dashboard'
            ) : (
              'Get Started'
            )}
          </button>
          <button 
            onClick={handleLearnMore}
            className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
          >
            Learn More
          </button>
        </div>
        
        {/* Auth Status Indicator */}
        {!isLoading && (
          <div className="mt-4 text-sm text-muted-foreground">
            {isAuthenticated ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Welcome back! Click to access your dashboard
              </span>
            ) : (
              <span>New to YouthWell? Sign up to start your wellness journey</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
