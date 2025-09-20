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

export default function LoginPage() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      
      // Store user data in localStorage for sidebar display
      if (data.user) {
        const userData = {
          name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
          email: data.user.email || email,
          avatar: data.user.user_metadata?.avatar_url || '/avatars/default.jpg',
        };
        
        localStorage.setItem('youthwell-user-logged-in', 'true');
        localStorage.setItem('youthwell-user-data', JSON.stringify(userData));
        
        // Dispatch custom event to update sidebar immediately
        window.dispatchEvent(new CustomEvent('userDataChanged'));
      }
      
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
              <div className="flex flex-col gap-5 mt-10">
                <div className="flex flex-col items-center gap-1 text-center">
                  {/* Logo */}
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      Y
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="flex flex-col gap-4">
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
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                  <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


