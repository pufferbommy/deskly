"use client"

import { NavMain } from "#/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "#/components/ui/sidebar"
import {
  MapIcon,
  BookmarkIcon,
  BriefcaseIcon,
} from "lucide-react"
import { Link } from "@tanstack/react-router"
import { APP_NAME } from "#/lib/config"

const data = {
  navMain: [
    {
      title: "Discover",
      url: "/",
      icon: <MapIcon />,
      isActive: true,
    },
    {
      title: "Saved Places",
      url: "/saved",
      icon: <BookmarkIcon />,
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
                <span className="font-semibold text-base">{APP_NAME}</span>
              </Link>
            } />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
