"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { Book } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const header = () => {
  const pathname = usePathname();
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
          <ModeToggle />
        </li>
      </ul>
    </header>
  );
};
export default header;
