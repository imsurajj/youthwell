"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams getting started",
    price: 29,
    features: [
      "Basic wellness assessments",
      "Mood tracking & journaling",
      "10GB data storage",
      "Limited analytics & insights",
      "2 Team workspaces",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Professional",
    description: "Best for growing organizations and mental health providers",
    price: 79,
    features: [
      "Advanced wellness assessments",
      "Team collaboration tools",
      "15GB data storage", 
      "Enhanced analytics & reporting",
      "5 Team workspaces",
      "Priority support & consultation"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    description: "Advanced solutions for large organizations and healthcare systems",
    price: 199,
    features: [
      "Custom wellness programs",
      "Enterprise integrations",
      "50GB data storage",
      "Unlimited analytics & insights",
      "Unlimited team workspaces",
      "Dedicated success manager"
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8">
            Pricing
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Plans that work best for your{" "}
              <span className="underline decoration-primary decoration-4 underline-offset-8">
                wellness journey
              </span>
            </h2>
            <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan to support mental health and wellness in your organization
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 rounded-2xl border transition-all",
                plan.popular
                  ? "border-primary/20 bg-primary/5 shadow-lg"
                  : "border-border bg-card hover:shadow-md"
              )}
            >
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                >
                  Get started
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground mb-4">
                  {plan.name === "Starter" 
                    ? "What included:" 
                    : plan.name === "Business" 
                    ? "Everything in Starter, plus:" 
                    : "Everything in Business, plus:"}
                </h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom plan?{" "}
            <a href="#" className="text-primary hover:text-primary/80 underline underline-offset-4">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
