"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Cookie, Shield, Settings } from "lucide-react";
import { getCookieConsent, setCookieConsent } from "@/lib/cookies";

export function CookieConsent() {
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const { status } = getCookieConsent();
    
    if (!status) {
      // Show popup after 2.5 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent('accepted');
    setShowPopup(false);
  };

  const handleDecline = () => {
    setCookieConsent('declined');
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <Card className="relative w-full max-w-md mx-auto shadow-2xl border-2">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  We value your privacy
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
              Your data helps us provide personalized wellness content and improve our services.
            </p>

            {!showDetails ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">
                    Essential cookies for app functionality
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <span className="text-muted-foreground">
                    Analytics to improve your wellness journey
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                  <p className="text-muted-foreground text-xs">
                    Required for basic app functionality, mood tracking, and personalized wellness plans.
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                  <p className="text-muted-foreground text-xs">
                    Help us understand how you use our app to improve your wellness experience.
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-foreground mb-2">Preference Cookies</h4>
                  <p className="text-muted-foreground text-xs">
                    Remember your settings and preferences for a personalized experience.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-2">
                <Button 
                  onClick={handleAccept}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Accept All
                </Button>
                <Button 
                  onClick={handleDecline}
                  variant="outline"
                  className="flex-1"
                >
                  Decline
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showDetails ? 'Show less' : 'Learn more about cookies'}
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              By using YouthWell, you agree to our{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
