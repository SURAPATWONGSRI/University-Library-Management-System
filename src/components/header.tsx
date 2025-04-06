"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn, getInitials } from "@/lib/utils";
import { Book } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = ({ session }: { session?: Session | null }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Wait for component to be mounted before rendering user-specific content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only compute initials when mounted to ensure client/server consistency
  const initials =
    mounted && session?.user?.name ? getInitials(session.user.name) : "";

  return (
    <header className="my-8 flex justify-between items-center">
      <Link href="/" className="group">
        <div className="flex items-center justify-center">
          <Book
            className="w-8 h-8 text-foreground transition-transform group-hover:scale-105"
            strokeWidth={1.25}
            fill="none"
          />
        </div>
      </Link>
      <ul className="flex items-center gap-4">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-sm font-light capitalize px-3 py-1",
              pathname === "/library"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar className="h-10 w-10 transition-all hover:scale-110">
              <AvatarFallback className="text-muted-foreground bg-secondary text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </header>
  );
};

export default Header;
