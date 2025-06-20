import { model, Schema } from "mongoose";
import { IBorrow, IBorrowModel } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow, IBorrowModel>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "book reference is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity number must be positive at least 1."],
    },
    dueDate: { type: Date, required: [true, "Due date is required."] },
  },
  {
    timestamps: true,
  }
);

borrowSchema.pre("save", function(next){
    if(this.dueDate < new Date()){
        return next(new Error("Due date cannot be in the past."))
    }
    next();
})


borrowSchema.statics.borrowBook = async function (borrowData: IBorrow) {
  const book = await Book.findById(borrowData.book);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < borrowData.quantity) {
    throw new Error("Not enough copies available");
  }

  // Deduct quantity
  book.copies -= borrowData.quantity;

  // If no more copies, mark as unavailable
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save(); // Update book data

  // Create the borrow record
  const borrow = await this.create(borrowData);
  return borrow;
};

const Borrow = model<IBorrow, IBorrowModel>("Borrow", borrowSchema);
export default Borrow;

// const Borrow = model<IBorrow>("Borrow", borrowSchema);
// export default Borrow;
