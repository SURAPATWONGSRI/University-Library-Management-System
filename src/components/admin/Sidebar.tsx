"use client";
import { adminSideBarLinks } from "@/constants";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const Sidebar = ({ session }: { session?: Session | null }) => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initials =
    mounted && session?.user?.name ? getInitials(session.user.name) : "";

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-base-100 border-r">
      <ScrollArea className="flex-grow px-5 pb-5 pt-10">
        <div className="flex flex-row items-center gap-2 border-b  pb-10 max-md:justify-center">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            width={37}
            height={37}
          />
          <h1 className="text-lg font-bold md:block text-blue-950 hidden">
            Admin Panel
          </h1>
        </div>
        <div className="mt-10 flex flex-col gap-2">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <Button
                  variant={isSelected ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <Image
                    src={link.img}
                    alt="icon"
                    width={20}
                    height={20}
                    className={isSelected ? "brightness-0 invert" : ""}
                  />
                  <span className="ml-2 md:inline hidden">{link.text}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
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
