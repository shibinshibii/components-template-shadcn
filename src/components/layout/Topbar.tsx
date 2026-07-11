import { useEffect, useState } from 'react';
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
interface TopbarProps {
  openMobileSidebar: () => void;
}

export function Topbar({ openMobileSidebar }: TopbarProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={openMobileSidebar}
        className="lg:hidden p-1.5 -ml-1.5 rounded-md hover:bg-surface text-foreground"
        aria-label="Open Mobile Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Global Search */}
      <div className="hidden sm:flex flex-1 items-center gap-2 max-w-sm ml-2 md:ml-4 bg-surface border border-border rounded-md px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input 
          type="text"
          placeholder="Search everywhere..."
          className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground text-foreground"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button 
          onClick={toggleTheme}
          className="p-1.5 rounded-md border border-border bg-surface hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button 
          className="relative p-1.5 rounded-md border border-border bg-surface hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {/* Notification Badge indicator */}
          <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        {/* Profile Dropdown Trigger */}
        <button className="h-8 w-8 ml-1 rounded-md border border-border bg-surface flex items-center justify-center overflow-hidden shrink-0 hover:ring-2 hover:ring-ring transition-all focus:outline-none">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
