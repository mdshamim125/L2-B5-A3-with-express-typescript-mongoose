import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
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

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
