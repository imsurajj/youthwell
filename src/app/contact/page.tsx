"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";



export default function Contact() {
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmation(true);
    e.currentTarget.reset();
    setTimeout(() => setConfirmation(false), 5000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-22">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-secondary text-lg">
            We&apos;re here to help! If you have any questions, feedback, or need assistance, 
            please reach out to us using the contact info below or by filling out the form.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="bg-card rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="text-secondary mb-2">
                  For general inquiries, support, or feedback, please email us at:
                </p>
                <a 
                  href="mailto:support@Youthwell.com" 
                  className="text-primary underline font-medium"
                >
                  support@Youthwell.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                                                   <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
              </div>
              
                             <div className="grid gap-2">
                 <Label htmlFor="email">Email</Label>
                                   <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
               </div>
               
                                                               <div className="grid gap-2">
                   <Label htmlFor="message">Message</Label>
                                       <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your inquiry..."
                      required
                      rows={4}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                    />
                 </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
            
            {confirmation && (
              <div className="mt-4 p-3 border border-secondary bg-accent text-secondary rounded-lg">
                Thank you! Your message has been submitted. We&apos;ll get back to you soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
