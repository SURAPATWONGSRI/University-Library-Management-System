"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import { Book } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
// Import shadcn navigation menu components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Sidebar = ({ session }: { session?: Session | null }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initials = useMemo(
    () =>
      mounted && session?.user?.name ? getInitials(session.user.name) : "",
    [mounted, session?.user?.name]
  );

  // Create static classes that won't change between server and client rendering
  const linkBaseClass =
    "w-full flex items-center rounded-md px-4 py-2 text-sm transition-colors";
  const linkSelectedClass =
    "bg-primary/10 text-primary rounded-md border-l-4 border-primary pl-3 font-medium";
  const linkDefaultClass = "hover:bg-muted";
  const iconBaseClass = "transition-colors";
  const iconSelectedClass = "text-primary";
  const iconDefaultClass = "text-muted-foreground";

  // Memoize the navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(() => {
    // Only render the navigation items when component is mounted
    if (!mounted) return [];

    return adminSideBarLinks.map((link) => {
      const isSelected =
        (link.route !== "/admin" &&
          pathname.includes(link.route) &&
          link.route.length > 1) ||
        pathname === link.route;
      const Icon = link.icon;

      return (
        <NavigationMenuItem key={link.route} className="w-full">
          <Link href={link.route} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                linkBaseClass,
                isSelected ? linkSelectedClass : linkDefaultClass
              )}
            >
              <div className="flex items-center py-1">
                <Icon
                  size={18}
                  className={cn(
                    iconBaseClass,
                    isSelected ? iconSelectedClass : iconDefaultClass
                  )}
                />
                <span
                  className={cn(
                    "ml-3 md:inline hidden",
                    isSelected ? "font-medium" : "font-light"
                  )}
                >
                  {link.text}
                </span>
              </div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      );
    });
  }, [pathname, mounted]);

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-base-100 border-r bg-muted/40">
      <div className="flex-grow">
        <div className="flex flex-row items-center gap-2 border-b p-5 pb-6 max-md:justify-center">
          <Book
            size={37}
            className="bg-primary text-white dark:text-zinc-950 p-2 rounded-md"
          />
          <h1 className="text-lg font-semibold md:block text-primary hidden">
            Admin Panel
          </h1>
        </div>

        <NavigationMenu className="mx-auto max-w-full mt-4">
          <NavigationMenuList className="flex flex-col items-start gap-2 px-2 w-full">
            {mounted ? navigationItems : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Separator className="my-2" />
      <div className="flex items-center gap-4 px-5 pb-5">
        <Avatar>
          <AvatarFallback className="text-muted-foreground bg-secondary text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:block flex-col">
          <p className="text-sm font-medium">
            {session?.user?.name || "No name provided"}
          </p>
          <p className="text-xs text-muted-foreground">
            {session?.user?.email || "No email provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default Sidebar;
