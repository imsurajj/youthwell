"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";



export default function Contact() {
  const [confirmation, setConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setTicketId(result.ticketId);
        setConfirmation(true);
        e.currentTarget.reset();
        setTimeout(() => {
          setConfirmation(false);
          setTicketId(null);
        }, 10000); // Show for 10 seconds
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                         <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 const form = e.currentTarget;
                 if (form.checkValidity()) {
                   handleSubmit(e as React.FormEvent<HTMLFormElement>);
                 } else {
                   form.reportValidity();
                 }
               }
             }}>
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
              
                             <Button type="submit" className="w-full" disabled={isSubmitting}>
                 {isSubmitting ? 'Sending...' : 'Send Message'}
               </Button>
            </form>
            
                                     {confirmation && (
              <div className="mt-4 p-6 border border-green-200 bg-green-50 text-green-800 rounded-lg text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-bold text-green-800">Thank You!</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-lg font-medium text-green-700">
                    Your message has been sent successfully!
                  </p>
                  
                  <p className="text-green-600">
                    We&apos;ve received your inquiry and will get back to you within 24 hours.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200 mt-4">
                    <p className="text-sm text-green-600 mb-2">For your reference:</p>
                    <p className="font-mono text-sm font-medium text-green-700">
                      Ticket: {ticketId}
                    </p>
                  </div>
                  
                  <p className="text-sm text-green-600 mt-3">
                    If you have any urgent questions, please call us directly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
