import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <section className="w-full rounded-2xl border-1 p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-xl">All Books</h2>
        <Button asChild>
          <Link href="/admin/books/new">+ Create a New Book</Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  );
};

export default page;
