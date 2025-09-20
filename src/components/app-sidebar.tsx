"use client"

import * as React from "react"
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  IconSettings,
  IconMessageCircle,
  IconClock,
  IconHeart,
} from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
      navMain: [
        {
          title: "Dashboard",
          url: "/chatdash",
          icon: IconDashboard,
        },
        {
          title: "Chatbot",
          url: "/chatbot",
          icon: IconMessageCircle,
        },
        {
          title: "Reminders",
          url: "/reminder",
          icon: IconClock,
        },
        {
          title: "Personal Wellness",
          url: "/personalwellness",
          icon: IconHeart,
        },
      ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ 
  currentView, 
  setCurrentView, 
  ...props 
}: React.ComponentProps<typeof Sidebar> & {
  currentView?: string;
  setCurrentView?: (view: string) => void;
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <button onClick={() => setCurrentView?.('dashboard')}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">YouthWell</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentView={currentView} setCurrentView={setCurrentView} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
