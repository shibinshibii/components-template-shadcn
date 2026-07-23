import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  AlertOctagon, 
  ShieldAlert, 
  Wrench, 
  WifiOff, 
  ServerCrash, 
  SearchX, 
  FileQuestion,
  type LucideIcon
} from 'lucide-react';
import { PageTitle, Muted } from '@/components/typography';
import { AppButton } from '@/components/ui/app-button';

export interface StateViewProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  iconClassName?: string;
}

export function StateView({ icon: Icon, title, description, actionLabel, onAction, className, iconClassName }: StateViewProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 min-h-[400px] w-full max-w-md mx-auto", className)}>
      <div className={cn("h-24 w-24 rounded-full flex items-center justify-center mb-6 bg-muted/50 text-muted-foreground", iconClassName)}>
        <Icon className="h-12 w-12" strokeWidth={1.5} />
      </div>
      <PageTitle className="mb-2 text-2xl">{title}</PageTitle>
      <Muted className="text-base mb-8 max-w-sm">{description}</Muted>
      {actionLabel && onAction && (
        <AppButton size="lg" onClick={onAction}>{actionLabel}</AppButton>
      )}
    </div>
  );
}

// Specialized States

export function SuccessState(props: Omit<StateViewProps, 'icon' | 'iconClassName'>) {
  return <StateView icon={CheckCircle2} iconClassName="bg-success/10 text-success" {...props} />;
}

export function ErrorState(props: Omit<StateViewProps, 'icon' | 'iconClassName'>) {
  return <StateView icon={AlertOctagon} iconClassName="bg-danger/10 text-danger" {...props} title={props.title || "Something went wrong"} />;
}

export function PermissionDenied(props: Partial<StateViewProps>) {
  return (
    <StateView 
      icon={ShieldAlert} 
      iconClassName="bg-warning/10 text-warning" 
      title={props.title || "Access Denied"}
      description={props.description || "You do not have the required permissions to view this page or perform this action. Contact your administrator if you believe this is an error."}
      {...props as any} 
    />
  );
}

export function Maintenance(props: Partial<StateViewProps>) {
  return (
    <StateView 
      icon={Wrench} 
      iconClassName="bg-primary/10 text-primary" 
      title={props.title || "Under Maintenance"}
      description={props.description || "We are currently performing scheduled maintenance to improve our systems. We'll be back shortly."}
      {...props as any} 
    />
  );
}

export function Offline(props: Partial<StateViewProps>) {
  return (
    <StateView 
      icon={WifiOff} 
      iconClassName="bg-muted text-muted-foreground" 
      title={props.title || "You are offline"}
      description={props.description || "It seems you've lost your internet connection. Please check your network and try again."}
      {...props as any} 
    />
  );
}

export function NetworkError(props: Partial<StateViewProps>) {
  return (
    <StateView 
      icon={ServerCrash} 
      iconClassName="bg-danger/10 text-danger" 
      title={props.title || "Network Error"}
      description={props.description || "We couldn't connect to our servers. This might be a temporary issue. Please try again later."}
      {...props as any} 
    />
  );
}

export function EmptyState(props: Partial<StateViewProps>) {
  return (
    <StateView 
      icon={SearchX} 
      iconClassName="bg-accent text-accent-foreground" 
      title={props.title || "No Results Found"} 
      description={props.description || "We couldn't find anything matching your query. Try adjusting your filters or search terms."}
      {...props as any} 
    />
  );
}

export function NotFound(props: Partial<StateViewProps>) {
  return (
    <StateView 
      icon={FileQuestion} 
      iconClassName="bg-muted text-muted-foreground" 
      title={props.title || "Page Not Found"}
      description={props.description || "The page you are looking for doesn't exist or has been moved."}
      {...props as any} 
    />
  );
}
