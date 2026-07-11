import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { X, Home, Search, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Text, WidgetTitle, Muted, Tag } from '@/components/typography';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { navigationConfig, favoriteConfig, recentConfig, type NavItem } from '@/config/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse?: () => void;
}

export function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile, onToggleCollapse }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'exams': true, // Mock default open
  });
  
  // Mock current user permissions and active route
  const userPermissions = ['admin'];
  const activeHref = '/dashboard';

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter config based on search and permissions
  const filteredNav = useMemo(() => {
    const hasPermission = (item: NavItem) => {
      if (!item.permissions) return true;
      return item.permissions.some(p => userPermissions.includes(p));
    };

    const filterItems = (items: NavItem[]): NavItem[] => {
      return items.reduce((acc: NavItem[], item) => {
        if (!hasPermission(item)) return acc;
        
        const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
        
        let filteredChildren: NavItem[] | undefined;
        if (item.children) {
          filteredChildren = filterItems(item.children);
        }

        if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
          acc.push({
            ...item,
            children: filteredChildren && filteredChildren.length > 0 ? filteredChildren : item.children,
          });
        }
        
        return acc;
      }, []);
    };

    return navigationConfig.map(group => ({
      ...group,
      items: filterItems(group.items)
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  const showExtras = !isCollapsed || isMobileOpen;

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isExpanded = expandedItems[item.id];
    const isActive = activeHref === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    const linkContent = (
      <a
        href={hasChildren ? '#' : (item.href || '#')}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            toggleExpand(item.id);
          } else if (isMobileOpen) {
            onCloseMobile();
          }
        }}
        className={cn(
          "group flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
          !showExtras ? "justify-center px-0" : "justify-start"
        )}
        style={{ paddingLeft: showExtras && depth > 0 ? `${depth * 1.5 + 0.75}rem` : undefined }}
      >
        {Icon && (
          <Icon className={cn(
            "shrink-0",
            !showExtras ? "h-5 w-5" : "h-4 w-4",
            isActive ? "text-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
          )} />
        )}
        
        {showExtras && (
          <>
            <Text className={cn("flex-1 text-left font-medium text-[13px]", isActive && "font-semibold")}>
              {item.label}
            </Text>
            
            {item.badge && (
              <Tag className={isActive ? "bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px]" : "bg-sidebar-accent text-sidebar-foreground px-1.5 py-0.5 rounded text-[10px]"}>
                {item.badge}
              </Tag>
            )}

            {hasChildren && (
              <ChevronRight className={cn(
                "h-4 w-4 shrink-0 transition-transform text-sidebar-foreground/50",
                isExpanded && "rotate-90"
              )} />
            )}
          </>
        )}
      </a>
    );

    return (
      <div key={item.id} className="flex flex-col">
        {!showExtras ? (
          <Tooltip>
            <TooltipTrigger render={linkContent} />
            <TooltipContent side="right" sideOffset={10} className="z-50">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ) : (
          linkContent
        )}

        {/* Children Render */}
        {showExtras && hasChildren && isExpanded && (
          <div className="mt-1 flex flex-col space-y-1">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider delay={0}>
      <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out lg:static lg:translate-x-0 shrink-0",
        isCollapsed ? "lg:w-[64px]" : "lg:w-[240px]",
        isMobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full w-[240px]"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex h-14 shrink-0 items-center border-b border-sidebar-border",
        isCollapsed ? "justify-center" : "justify-between px-4"
      )}>
        <div className={cn(
          "flex items-center gap-3 overflow-hidden whitespace-nowrap",
          isCollapsed ? "hidden lg:hidden" : "flex"
        )}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          {showExtras && (
            <WidgetTitle className="text-sidebar-foreground text-[15px]">School ERP</WidgetTitle>
          )}
        </div>
        
        <button 
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 -mr-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <button 
          onClick={onToggleCollapse}
          className={cn(
            "hidden lg:flex p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors",
            !isCollapsed && "-mr-1.5"
          )}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
      </div>

      {/* Search Container */}
      {showExtras && (
        <div className="p-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-sidebar-foreground/50" />
            <input
              type="text"
              placeholder="Search menus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-sidebar-border bg-sidebar-accent/50 py-1.5 pl-9 pr-3 text-[13px] text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      )}

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto pb-4">
        
        {/* Favorites Section */}
        {showExtras && !searchQuery && favoriteConfig.length > 0 && (
          <div className="px-3 py-2">
            <Muted className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              Favorites
            </Muted>
            <div className="space-y-1">
              {favoriteConfig.map(item => renderNavItem(item))}
            </div>
          </div>
        )}

        {/* Recent Section */}
        {showExtras && !searchQuery && recentConfig.length > 0 && (
          <div className="px-3 py-2">
            <Muted className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              Recent
            </Muted>
            <div className="space-y-1">
              {recentConfig.map(item => renderNavItem(item))}
            </div>
          </div>
        )}

        {/* Main Navigation Groups */}
        <div className="px-3 space-y-6 mt-4">
          {filteredNav.map(group => (
            <div key={group.id}>
              {showExtras && group.label && (
                <Muted className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
                  {group.label}
                </Muted>
              )}
              <div className="space-y-1">
                {group.items.map(item => renderNavItem(item))}
              </div>
            </div>
          ))}
          
          {filteredNav.length === 0 && showExtras && (
            <div className="px-5 py-4 text-center">
              <Text className="text-sidebar-foreground/50">No results found.</Text>
            </div>
          )}
        </div>
      </div>

      {/* Footer Profile */}
      <div className="border-t border-sidebar-border p-4 shrink-0 bg-sidebar">
        <div className={cn(
          "flex items-center gap-3",
          !showExtras && "justify-center"
        )}>
          <div className="h-9 w-9 shrink-0 rounded-full border border-sidebar-border bg-sidebar-accent overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
              alt="Profile" 
              className="h-full w-full object-cover" 
            />
          </div>
          {showExtras && (
            <div className="flex flex-col items-start overflow-hidden whitespace-nowrap">
              <Text className="font-medium leading-tight text-[13px]">Admin User</Text>
              <Muted className="text-[10px]">admin@schoolerp.io</Muted>
            </div>
          )}
        </div>
      </div>
    </aside>
    </TooltipProvider>
  );
}
