"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setInfo(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) {
        setError(error.message);
        return;
      }
      setInfo("Check your email to confirm your account.");
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 bg-background">
      <div className="w-full max-w-md px-5">
        <div className="p-6">
          <div className={cn("flex flex-col gap-5 items-center text-center")}> 
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-8 h-8 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col gap-5 mt-8">
                <div className="flex flex-col items-center gap-1 text-center">
                  {/* Logo */}
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      Y
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to create your account
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-500 text-left">{error}</p>}
                  {info && <p className="text-sm text-green-600 text-left">{info}</p>}
                  <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </div>
            </form>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
