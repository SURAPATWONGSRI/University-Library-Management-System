import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";
// import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
// import Link from "next/link";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col-reverse text-base sm:flex-row">
      <section className="my-auto flex h-full min-h-screen flex-1 items-center px-5 py-8">
        <Card className="mx-auto max-w-lg w-full overflow-hidden p-3">
          <CardHeader className="p-3 flex flex-row items-center gap-2">
            <div className="flex flex-row gap-1 items-center">
              <BookOpen size={40} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary break-words">
                BookWise
              </h1>
            </div>
          </CardHeader>
          <CardContent className="p-3 overflow-x-auto">
            <div className="w-full break-words">{children}</div>
          </CardContent>
        </Card>
      </section>

      <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
        <Image
          src="/images/auth-illustration.png"
          alt="illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
