import * as React from 'react'
import { HeadContent, Scripts, createRootRoute, useLocation, Link } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { TooltipProvider } from "@/components/ui/tooltip"

import appCss from '../styles.css?url'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar'
import { AppSidebar } from '#/components/app-sidebar'
import { Separator } from '#/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '#/components/ui/breadcrumb'
import { APP_NAME } from '#/lib/config'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: APP_NAME
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4 self-center!"
                  />
                  <DynamicBreadcrumbs />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function DynamicBreadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathnames.length === 0 ? (
            <BreadcrumbPage>Discover</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<Link to="/" />}>
              Discover
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')

          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link to={to} />}>
                    {title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
