import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "#/components/ui/sidebar"
import { Link, useLocation } from "@tanstack/react-router"
import { ChevronRightIcon, PlusIcon } from "lucide-react"

import { Button } from "#/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog"
import { Input } from "#/components/ui/input"
import { Label } from "#/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group"
import { Textarea } from "#/components/ui/textarea"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const location = useLocation()

  const checkActive = (url: string) => {
    if (url === "/") return location.pathname === "/"
    return location.pathname.startsWith(url)
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Dialog>
          <SidebarMenuItem>
            <DialogTrigger render={
               <SidebarMenuButton variant="primary" tooltip="Add New Place">
                 <PlusIcon />
                 <span>New Place</span>
               </SidebarMenuButton>
            } />
          </SidebarMenuItem>
          
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a New Spot</DialogTitle>
              <DialogDescription>
                Help others by sharing a new work-friendly cafe or coworking space.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold">Place Name</Label>
                <Input id="name" placeholder="e.g. The Common Coffee" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location" className="font-semibold">Location or GMaps Link</Label>
                <Input id="location" placeholder="Paste Google Maps URL" />
              </div>
              
              {/* Feature Toggles */}
              <div className="grid gap-4">
                {/* Wi-Fi */}
                <div className="grid gap-2">
                  <Label className="font-semibold">Wi-Fi Quality</Label>
                  <ToggleGroup variant="outline" type="single" defaultValue="good" className="justify-start w-full" spacing={0}>
                    <ToggleGroupItem value="good" className="flex-1 text-xs"> Fast 🏎️ </ToggleGroupItem>
                    <ToggleGroupItem value="ok" className="flex-1 text-xs"> Stable 🚶 </ToggleGroupItem>
                    <ToggleGroupItem value="bad" className="flex-1 text-xs"> Bad 🐌 </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {/* Outlets */}
                <div className="grid gap-2">
                  <Label className="font-semibold">Power Outlets</Label>
                  <ToggleGroup variant="outline" type="single" defaultValue="yes" className="justify-start w-full" spacing={0}>
                    <ToggleGroupItem value="yes" className="flex-1 text-xs"> Many 🔋 </ToggleGroupItem>
                    <ToggleGroupItem value="few" className="flex-1 text-xs"> Few 🪫 </ToggleGroupItem>
                    <ToggleGroupItem value="no" className="flex-1 text-xs"> None 🛑 </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Noise */}
                <div className="grid gap-2">
                  <Label className="font-semibold">Noise Level</Label>
                  <ToggleGroup variant="outline" type="single" defaultValue="medium" className="justify-start w-full" spacing={0}>
                    <ToggleGroupItem value="quiet" className="flex-1 text-xs"> Quiet 🤫 </ToggleGroupItem>
                    <ToggleGroupItem value="medium" className="flex-1 text-xs"> Medium 💬 </ToggleGroupItem>
                    <ToggleGroupItem value="loud" className="flex-1 text-xs"> Loud 📢 </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes" className="font-semibold">Additional Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Great cold brew, gets busy at 2 PM..." className="resize-none h-20" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">Submit Spot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {items.map((item) => {
          const isActive = checkActive(item.url)

          if (!item.items || item.items.length === 0) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} tooltip={item.title} render={<Link to={item.url} />}>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={<SidebarMenuButton isActive={isActive} tooltip={item.title} />}
              >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton render={<Link to={subItem.url} />}>
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
