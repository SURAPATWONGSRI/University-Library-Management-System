import { auth } from "@/auth";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-dark-100 px-5 xs:px-10 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <Header session={session} />
        <div className="mt-8 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
