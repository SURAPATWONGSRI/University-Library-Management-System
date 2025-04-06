import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Button
        variant="secondary"
        className="mb-10 w-fit text-xs font-medium"
        asChild
      >
        <Link href="/admin/books">
          <ArrowLeft />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default page;
