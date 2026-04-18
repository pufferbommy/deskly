"use client"

import { NavMain } from "#/components/nav-main"
import { NavUser } from "#/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "#/components/ui/sidebar"
import {
  MapIcon,
  PlusCircleIcon,
  SlidersHorizontalIcon,
  BookmarkIcon,
  MessageSquareIcon,
  Settings2Icon,
  BriefcaseIcon,
} from "lucide-react"
import { Link } from "@tanstack/react-router"

const data = {
  user: {
    name: "Traveler",
    email: "traveler@deskly.app",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Discover",
      url: "/",
      icon: <MapIcon />,
      isActive: true,
      items: [
        {
          title: "Map View",
          url: "/",
        },
        {
          title: "List View",
          url: "/places",
        },
      ],
    },
    {
      title: "Filter Places",
      url: "/filter",
      icon: <SlidersHorizontalIcon />,
      items: [
        {
          title: "Wi-Fi Quality",
          url: "/filter?wifi=true",
        },
        {
          title: "Power Outlets",
          url: "/filter?outlets=true",
        },
        {
          title: "Noise Level",
          url: "/filter?noise=quiet",
        },
        {
          title: "Open Now",
          url: "/filter?open=true",
        },
      ],
    },
    {
      title: "My Places",
      url: "/saved",
      icon: <BookmarkIcon />,
      items: [
        {
          title: "Saved",
          url: "/saved",
        },
        {
          title: "Recently Viewed",
          url: "/history",
        },
      ],
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: <MessageSquareIcon />,
      items: [
        {
          title: "My Reviews",
          url: "/reviews/mine",
        },
        {
          title: "Top Rated",
          url: "/reviews/top",
        },
      ],
    },
    {
      title: "Add New Place",
      url: "/add",
      icon: <PlusCircleIcon />,
      items: [
        {
          title: "Submit a Place",
          url: "/add",
        },
        {
          title: "My Submissions",
          url: "/add/history",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Preferences",
          url: "/settings/preferences",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={
              <Link to="/">
                <BriefcaseIcon />
                <span className="font-semibold text-base">Deskly</span>
              </Link>
            } />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
