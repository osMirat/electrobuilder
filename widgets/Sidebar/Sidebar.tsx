import Link from "next/link";
import {
  FolderKanban,
  Building2,
  DoorOpen,
  Cable,
  Shield,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: FolderKanban, label: "Проекты", href: "/projects" },
  { icon: Building2, label: "Объекты", href: "/objects" },
  { icon: DoorOpen, label: "Помещения", href: "/rooms" },
  { icon: Cable, label: "Линии", href: "/circuits" },
  { icon: Shield, label: "Щиты", href: "/panels" },
  { icon: FileText, label: "Документы", href: "/documents" },
  { icon: Settings, label: "Настройки", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}