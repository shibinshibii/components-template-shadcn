
import { AppCard, CardHeader, CardBody } from '@/components/ui/card';
import { CardTitle, Muted, Text } from '@/components/typography';
import { Calendar } from '@/components/ui/calendar'; 
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  time: string;
  status?: 'completed' | 'current' | 'upcoming';
}

export function TimelineWidget({ title = "Timeline", items }: { title?: string, items: TimelineEvent[] }) {
  return (
    <AppCard className="flex flex-col h-full">
      <CardHeader className="py-4 border-b-0 pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardBody className="py-4">
        <div className="relative border-l border-muted-foreground/20 ml-3 space-y-6 py-2">
          {items.map((item) => (
            <div key={item.id} className="relative pl-6">
              <span className={cn(
                "absolute -left-1.5 top-1.5 flex h-3 w-3 rounded-full ring-4 ring-card",
                item.status === 'completed' ? "bg-primary" :
                item.status === 'current' ? "bg-warning animate-pulse" : "bg-muted-foreground/30"
              )} />
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <Text className={cn("text-sm font-semibold", item.status === 'upcoming' && "text-muted-foreground")}>{item.title}</Text>
                  <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">{item.time}</span>
                </div>
                {item.description && <Muted className="text-xs">{item.description}</Muted>}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </AppCard>
  );
}

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  colorClass?: string;
}

export function QuickActionsWidget({ title = "Quick Actions", actions }: { title?: string, actions: QuickAction[] }) {
  return (
    <AppCard>
      <CardHeader className="py-4 border-b-0 pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardBody className="py-4 pt-2">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/50 hover:border-border transition-all group"
            >
              <div className={cn("p-3 rounded-full mb-1 transition-colors", action.colorClass || "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground")}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </CardBody>
    </AppCard>
  );
}

export function CalendarWidget({ title = "Calendar", date, onDateChange }: { title?: string, date?: Date, onDateChange?: (date?: Date) => void }) {
  return (
    <AppCard className="flex flex-col h-full">
      <CardHeader className="py-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardBody className="p-2 flex items-center justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border-0 w-full flex justify-center"
        />
      </CardBody>
    </AppCard>
  );
}
