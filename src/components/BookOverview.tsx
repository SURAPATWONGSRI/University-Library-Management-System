import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
  return (
    <section className="flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-4xl font-medium sm:text-5xl md:text-6xl text-primary">
          {title}
        </h1>
        <div className="mt-7 flex flex-row flex-wrap gap-4 text-xl text-base-100">
          <p>
            By <span className="font-semibold text-primary ">{author}</span>
          </p>
          <p>
            Category{""}
            <span className="font-semibold text-primary"> {genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="Star" width={20} height={20} />
            <p>{rating}/5 </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 mt-1">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>

          <p>
            Avaliable Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="mt-2 text-justify text-xl font-light text-base-100">
          {description}
        </p>
        {user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>
      <div className="flex flex-1 relative justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40">
            <BookCover
              variant="hide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
