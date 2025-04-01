import { cn } from "@/lib/utils";
import Link from "next/link";
import BookCover from "./BookCover";

import { Calendar } from "lucide-react"; // Import Calendar icon from lucide-react
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => (
  <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`/books/${id}`}
      className={cn(isLoanedBook && "w-full  flex flex-col items-center")}
    >
      <BookCover coverColor={color} coverImage={cover} variant="default" />
      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className="mt-2 line-clamp-1 text-base font-semibold text-primary xs:text-xl hover:underline ">
          {title}
        </p>
        <p className="mt-1 line-clamp-1 text-sm  text-mute-foreground xs:text-mute-foreground">
          {genre}
        </p>
      </div>
      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="flex flex-row items-center gap-1 max-xs:justify-center">
            <Calendar size={18} className="text-primary" />
            <p className="text-primary">11 days left to return</p>
          </div>
          <Button className="mt-3 min-h-12 w-full rounded-md border border-input bg-background text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
            Download Receipt
          </Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
