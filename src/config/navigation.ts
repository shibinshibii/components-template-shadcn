import {
  LayoutDashboard,
  Type,
  MousePointerClick,
  CalendarDays,
  ToggleLeft,
  MousePointer2,
  CreditCard,
  AppWindow,
  TableProperties,
  MessageSquareWarning,
} from 'lucide-react';
import type { ElementType } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: ElementType;
  href?: string;
  badge?: string;
  permissions?: string[];
  children?: NavItem[];
}

export interface NavGroup {
  id: string;
  label?: string;
  items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
  {
    id: 'core',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    ]
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      { id: 'inputs', label: 'Inputs', icon: Type, href: '/showcase/inputs' },
      { id: 'selects', label: 'Selects', icon: MousePointerClick, href: '/showcase/selects' },
      { id: 'dates', label: 'Date Pickers', icon: CalendarDays, href: '/showcase/dates' },
      { id: 'controls', label: 'Controls', icon: ToggleLeft, href: '/showcase/controls' },
    ]
  },
  {
    id: 'ui',
    label: 'UI Elements',
    items: [
      { id: 'buttons', label: 'Buttons', icon: MousePointer2, href: '/showcase/buttons' },
      { id: 'cards', label: 'Cards', icon: CreditCard, href: '/showcase/cards' },
      { id: 'dialogs', label: 'Dialogs & Drawers', icon: AppWindow, href: '/showcase/dialogs' },
    ]
  },
  {
    id: 'data',
    label: 'Data Display',
    items: [
      { id: 'tables', label: 'Tables', icon: TableProperties, href: '/showcase/tables' },
      { id: 'feedback', label: 'Feedback & States', icon: MessageSquareWarning, href: '/showcase/feedback' },
    ]
  }
];

export const favoriteConfig: NavItem[] = [];
export const recentConfig: NavItem[] = [];
