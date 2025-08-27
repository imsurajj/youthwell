"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is YouthWell and how can it help me?",
      answer: "YouthWell is a comprehensive platform dedicated to youth mental health, wellness, and personal development. We provide professional counseling, wellness programs, career guidance, and community support to help young people navigate life's challenges and build a healthier future."
    },
    {
      question: "Is my information private and secure?",
      answer: "Absolutely. We take your privacy and security very seriously. All personal information, conversations, and data are encrypted and protected by advanced security measures. Your information is never shared with third parties without your explicit consent."
    },
    {
      question: "What age group is YouthWell designed for?",
      answer: "YouthWell is designed for young people between the ages of 13-25. We understand that this age group faces unique challenges and we've tailored our services specifically to meet their needs and developmental stages."
    },
    {
      question: "How do I get started with counseling or therapy?",
      answer: "Getting started is easy! Simply sign up for an account, complete a brief assessment, and you'll be matched with a qualified mental health professional who specializes in youth counseling. You can schedule sessions that fit your schedule."
    },
    {
      question: "Are the wellness programs suitable for beginners?",
      answer: "Yes! Our wellness programs are designed to accommodate all fitness and experience levels. Whether you're just starting your wellness journey or looking to enhance your current routine, we have programs that will meet you where you are."
    },
    {
      question: "Can I access YouthWell from my mobile device?",
      answer: "Absolutely! YouthWell is fully responsive and works seamlessly on all devices including smartphones, tablets, and computers. You can access our platform anytime, anywhere to get the support you need."
    },
    {
      question: "What if I need immediate help or support?",
      answer: "If you're experiencing a mental health crisis or need immediate support, please contact emergency services or a crisis hotline. YouthWell provides ongoing support but is not a crisis intervention service. Your safety is our top priority."
    },
    {
      question: "How much does YouthWell cost?",
      answer: "We offer flexible pricing plans starting at $29/month. All plans include a 14-day free trial so you can experience the full benefits before committing. We also offer special rates for educational institutions and organizations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            FAQ
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
            Frequently Asked{" "}
            <span className="underline decoration-primary decoration-2 underline-offset-4">
              Questions
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about YouthWell and our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <h3 className="text-base font-medium text-foreground pr-3">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-4 pb-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-3">
            Still have questions? We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
            <button className="px-4 py-2 border border-border text-foreground rounded-md text-sm font-medium hover:bg-accent transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
