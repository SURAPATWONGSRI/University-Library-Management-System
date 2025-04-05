"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import { Book } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
// Import shadcn navigation menu components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Sidebar = ({ session }: { session?: Session | null }) => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initials =
    mounted && session?.user?.name ? getInitials(session.user.name) : "";

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-base-100 border-r bg-muted/40">
      <div className="flex-grow">
        <div className="flex flex-row items-center gap-2 border-b p-5 pb-6 max-md:justify-center">
          <Book size={37} className=" bg-primary text-white p-2 rounded-md" />
          <h1 className="text-lg font-semibold md:block text-primary hidden">
            Admin Panel
          </h1>
        </div>

        <NavigationMenu className="mx-auto max-w-full mt-4">
          <NavigationMenuList className="flex flex-col items-start gap-2 px-2 w-full">
            {adminSideBarLinks.map((link) => {
              const isSelected =
                (link.route !== "/admin" &&
                  pathname.includes(link.route) &&
                  link.route.length > 1) ||
                pathname === link.route;
              return (
                <NavigationMenuItem key={link.route} className="w-full">
                  <Link href={link.route} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent"
                      )}
                    >
                      <Image
                        src={link.img}
                        alt="icon"
                        width={20}
                        height={20}
                        className={isSelected ? "brightness-0 invert" : ""}
                      />
                      <span className="ml-2 md:inline hidden font-light">
                        {link.text}
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
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
        <div className="hidden md:block  flex-col">
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

export default Sidebar;
