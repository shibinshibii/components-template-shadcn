import React from 'react';
import { AppCard, CardHeader, CardBody } from '@/components/ui/card';
import { CardTitle, Muted, Text } from '@/components/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppButton } from '@/components/ui/app-button';
import { cn } from '@/lib/utils';
import { Clock, Calendar as CalendarIcon, CheckCircle2, Circle, Bell } from 'lucide-react';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  user?: { name: string; avatar?: string };
}

export function RecentActivityWidget({ title = "Recent Activity", items, onAction }: { title?: string, items: ActivityItem[], onAction?: () => void }) {
  return (
    <AppCard className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {onAction && <AppButton variant="ghost" size="sm" onClick={onAction}>View All</AppButton>}
      </CardHeader>
      <CardBody className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[300px] w-full px-6">
          <div className="space-y-6 py-4">
            {items.length === 0 ? (
              <Muted className="text-center py-8">No recent activity.</Muted>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={item.user?.avatar} />
                    <AvatarFallback>{item.user?.name.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <Text className="text-sm font-medium leading-none">{item.title}</Text>
                    <Muted className="text-xs">{item.description}</Muted>
                    <div className="flex items-center text-[10px] text-muted-foreground mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.timestamp}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardBody>
    </AppCard>
  );
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  isNew?: boolean;
}

export function AnnouncementsWidget({ title = "Announcements", items, onAction }: { title?: string, items: AnnouncementItem[], onAction?: () => void }) {
  return (
    <AppCard className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {onAction && <AppButton variant="ghost" size="sm" onClick={onAction}>View All</AppButton>}
      </CardHeader>
      <CardBody className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[300px] w-full px-4">
          <div className="space-y-2 py-4">
            {items.length === 0 ? (
              <Muted className="text-center py-8">No announcements.</Muted>
            ) : (
              items.map((item) => (
                <div key={item.id} className="group flex items-start gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0", item.isNew ? "bg-primary" : "bg-border")} />
                  <div className="flex flex-col space-y-1 flex-1">
                    <Text className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">{item.title}</Text>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardBody>
    </AppCard>
  );
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export function TasksWidget({ title = "My Tasks", items, onToggle, onAction }: { title?: string, items: TaskItem[], onToggle?: (id: string) => void, onAction?: () => void }) {
  return (
    <AppCard className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {onAction && <AppButton variant="ghost" size="sm" onClick={onAction}>View All</AppButton>}
      </CardHeader>
      <CardBody className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[300px] w-full px-4">
          <div className="space-y-1 py-3">
            {items.length === 0 ? (
              <Muted className="text-center py-8">No pending tasks.</Muted>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-md p-3 hover:bg-muted/50 transition-colors">
                  <button onClick={() => onToggle?.(item.id)} className="shrink-0 text-muted-foreground hover:text-primary transition-colors focus:outline-none">
                    {item.completed ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <div className="flex flex-col flex-1 truncate">
                    <Text className={cn("text-sm font-medium truncate", item.completed && "line-through text-muted-foreground")}>{item.title}</Text>
                    <Muted className="text-xs">Due: {item.dueDate}</Muted>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardBody>
    </AppCard>
  );
}

export interface NotificationItem {
  id: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'danger';
}

const typeStyles = {
  info: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
};

export function NotificationsWidget({ title = "Notifications", items, onAction }: { title?: string, items: NotificationItem[], onAction?: () => void }) {
  return (
    <AppCard className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {onAction && <AppButton variant="ghost" size="sm" onClick={onAction}>View All</AppButton>}
      </CardHeader>
      <CardBody className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[300px] w-full px-4">
          <div className="space-y-2 py-4">
            {items.length === 0 ? (
              <Muted className="text-center py-8">No notifications.</Muted>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={cn("h-8 w-8 rounded-full shrink-0 flex items-center justify-center", typeStyles[item.type])}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Text className="text-sm font-medium leading-tight">{item.message}</Text>
                    <Muted className="text-[10px] uppercase tracking-wider">{item.time}</Muted>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardBody>
    </AppCard>
  );
}

export function UpcomingEventsWidget({ title = "Upcoming Events", items, onAction }: { title?: string, items: AnnouncementItem[], onAction?: () => void }) {
  // Aliasing announcements for structural consistency based on prompt
  return <AnnouncementsWidget title={title} items={items} onAction={onAction} />;
}
