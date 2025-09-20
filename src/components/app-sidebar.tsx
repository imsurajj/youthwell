"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@youthwell.com",
    avatar: "/avatars/default.jpg",
  });

  useEffect(() => {
    // Get user data from localStorage
    const getUserData = () => {
      const isLoggedIn = localStorage.getItem('youthwell-user-logged-in');
      const savedUser = localStorage.getItem('youthwell-user-data');
      
      if (isLoggedIn && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser({
            name: userData.name || "User",
            email: userData.email || "user@youthwell.com",
            avatar: userData.avatar || "/avatars/default.jpg",
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          // If there's an error parsing, show guest user
          setUser({
            name: "Guest User",
            email: "guest@youthwell.com",
            avatar: "/avatars/default.jpg",
          });
        }
      } else {
        // No user logged in, show guest
        setUser({
          name: "Guest User",
          email: "guest@youthwell.com",
          avatar: "/avatars/default.jpg",
        });
      }
    };

    getUserData();

    // Listen for storage changes to update user data in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'youthwell-user-data' || e.key === 'youthwell-user-logged-in') {
        getUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events for same-tab updates
    const handleUserDataChange = () => {
      getUserData();
    };

    window.addEventListener('userDataChanged', handleUserDataChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataChanged', handleUserDataChange);
    };
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <button onClick={() => setCurrentView?.('analytics')}>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
