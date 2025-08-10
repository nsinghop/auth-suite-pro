import { Bell, Search, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="h-14 border-b flex items-center px-3 gap-3 bg-background sticky top-0 z-40">
      <SidebarTrigger aria-label="Toggle sidebar" />
      <div className="flex-1 flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 w-full max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
          <Input placeholder="Search across users, reports…" aria-label="Search" />
        </div>
      </div>
      <button className="relative p-2 rounded-md hover:bg-muted/50" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Open notifications</span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/50 focus:ring-2 focus:ring-ring">
          <Avatar>
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm">Admin</span>
          <ChevronDown className="h-4 w-4" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
