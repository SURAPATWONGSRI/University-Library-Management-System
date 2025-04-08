"use client";
import { borrowBook } from "@/lib/actions/book";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast("error", {
        description: message,
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast("success", {
          description: "Book borrowed successfully",
        });
        router.push("/");
      }
    } catch (err) {
      toast("error", {
        description: "Error borrowing book",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <div>
      <Button
        className="mt-4 min-h-14 w-fit bg-primary text-dark-100 hover:bg-primary/90 max-md:w-full !important"
        onClick={handleBorrow}
        disabled={borrowing}
      >
        <BookOpen className="h-5 w-5 text-white dark:text-zinc-950" />
        <p className="text-white dark:text-zinc-950 text-xl">
          {borrowing ? "borrowing ..." : "Borrow Book"}
        </p>
      </Button>
    </div>
  );
};

export default BorrowBook;
