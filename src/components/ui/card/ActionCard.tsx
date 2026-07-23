
import { AppCard, CardBody } from './AppCard';
import { Text, Muted } from '@/components/typography';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({ title, description, icon: Icon, onClick, className }: ActionCardProps) {
  return (
    <AppCard 
      className={cn(
        "cursor-pointer transition-colors hover:border-primary/40 hover:bg-accent/30 group", 
        className
      )}
      onClick={onClick}
    >
      <CardBody className="py-4 px-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="flex flex-col">
            <Text className="font-medium group-hover:text-primary transition-colors">{title}</Text>
            {description && <Muted className="text-xs">{description}</Muted>}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
      </CardBody>
    </AppCard>
  );
}
