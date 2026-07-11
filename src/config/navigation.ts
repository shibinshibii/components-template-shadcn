import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  DollarSign,
  Briefcase,
  Package,
  Bus,
  Home,
  FileEdit,
  Settings,
  LayoutDashboard
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
    id: 'academic',
    label: 'Academics',
    items: [
      { id: 'students', label: 'Students', icon: Users, href: '/students', badge: '1.2k' },
      { id: 'teachers', label: 'Teachers', icon: GraduationCap, href: '/teachers' },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck, href: '/attendance' },
      { 
        id: 'exams', 
        label: 'Exams', 
        icon: FileEdit, 
        children: [
          { id: 'exam-schedule', label: 'Schedule', href: '/exams/schedule' },
          { id: 'exam-results', label: 'Results', href: '/exams/results', badge: 'New' },
        ]
      },
    ]
  },
  {
    id: 'administration',
    label: 'Administration',
    items: [
      { id: 'hr', label: 'HR', icon: Briefcase, href: '/hr', permissions: ['admin'] },
      { id: 'finance', label: 'Finance', icon: DollarSign, href: '/finance', permissions: ['admin', 'accountant'] },
    ]
  },
  {
    id: 'facilities',
    label: 'Facilities',
    items: [
      { id: 'library', label: 'Library', icon: BookOpen, href: '/library' },
      { id: 'inventory', label: 'Inventory', icon: Package, href: '/inventory' },
      { id: 'transport', label: 'Transport', icon: Bus, href: '/transport' },
      { id: 'hostel', label: 'Hostel', icon: Home, href: '/hostel' },
    ]
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', permissions: ['admin'] },
    ]
  }
];

export const favoriteConfig: NavItem[] = [
  { id: 'fav-students', label: 'Students', icon: Users, href: '/students' },
  { id: 'fav-attendance', label: 'Attendance', icon: CalendarCheck, href: '/attendance' },
];

export const recentConfig: NavItem[] = [
  { id: 'recent-exams', label: 'Exam Results', icon: FileEdit, href: '/exams/results' },
];
