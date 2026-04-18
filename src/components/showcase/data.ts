import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Pill,
  MessageSquare,
  Receipt,
  Settings,
  HelpCircle,
  Search,
  Bell,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string | number;
};

export const primaryNav: NavItem[] = [
  { label: "Tableau de bord", icon: LayoutDashboard, href: "#", badge: undefined },
  { label: "Consultations", icon: Stethoscope, href: "#", badge: 3 },
  { label: "Patients", icon: Users, href: "#" },
  { label: "Agenda", icon: Calendar, href: "#" },
  { label: "Comptes rendus", icon: FileText, href: "#" },
  { label: "Ordonnances", icon: Pill, href: "#" },
  { label: "Messagerie", icon: MessageSquare, href: "#", badge: 12 },
  { label: "Facturation", icon: Receipt, href: "#" },
];

export const secondaryNav: NavItem[] = [
  { label: "Réglages", icon: Settings, href: "#" },
  { label: "Aide", icon: HelpCircle, href: "#" },
];

export { Search, Bell };
