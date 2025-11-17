import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UnlshLogo from "@/assets/unlsh-logo.svg";

export type SidebarNavItem = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
};

export type SidebarNavGroup = {
  label: string;
  items: SidebarNavItem[];
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  groups: SidebarNavGroup[];
  activeItemId: string;
  onItemSelect?: (itemId: string) => void;
}

export function AppSidebar({
  groups,
  activeItemId,
  onItemSelect,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar {...props} collapsible="offcanvas">
      <SidebarHeader className="px-4 py-5 bg-[#1b0508] text-white">
        <SidebarMenuButton>
          <div className="flex flex-col items-start gap-3">
            <img src={UnlshLogo} alt="UNLSH" className="h-8 w-auto" />
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-[#1b0508] text-white">
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="px-2">
            <SidebarGroupLabel className="text-xs uppercase tracking-[0.4em] text-white/60">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeItemId === item.id}
                      onClick={() => onItemSelect?.(item.id)}
                      className="flex-col items-start gap-1 border border-transparent text-left text-white hover:border-white/10 hover:bg-white/5 hover:text-white data-[active=true]:bg-white/15 data-[active=true]:text-white group-data-[collapsible=icon]:items-center"
                    >
                      <span className="text-sm font-semibold text-inherit">
                        {item.title}
                      </span>
                      {item.description ? (
                        <span className="text-xs text-white/60 group-data-[collapsible=icon]:hidden">
                          {item.description}
                        </span>
                      ) : null}
                      {item.badge ? (
                        <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-white/60 group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      ) : null}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
