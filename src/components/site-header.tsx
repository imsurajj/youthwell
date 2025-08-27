"use client";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { ThemeToggle } from "@/components/ThemeToggle"

export function SiteHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error logging out:", error.message)
        return
      }
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
          <ThemeToggle />
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
