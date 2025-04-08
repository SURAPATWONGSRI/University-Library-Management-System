import { ModeToggle } from "@/components/ui/mode-toggle";
import { Book } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Header = () => {
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
          <LogoutButton />
          {/* <Link href="/my-profile">
            <Avatar className="h-10 w-10 transition-all hover:scale-110">
              <AvatarFallback className="text-muted-foreground bg-secondary text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link> */}
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </header>
  );
};

export default Header;
