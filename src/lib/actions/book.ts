"use server";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (book.length === 0 || book[0].availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing" };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    // Execute the insert query and get the result
    const record = await db
      .insert(borrowRecords)
      .values({
        userId,
        bookId,
        borrowDate: new Date(),
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: record[0], // Return the actual record data
    };
  } catch (err) {
    console.error(err);

    return { success: false, error: "Error borrowing book" };
  }
};
